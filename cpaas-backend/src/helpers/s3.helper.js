const AWS = require("aws-sdk");
const sendResponse = require("../utils/sendResponse");
const file_master = require("../schemas/file_master.schema");
const download_request = require("../schemas/download_request.schema");
const archiver = require("archiver");
const fs = require("fs");
const { PassThrough } = require("stream");
const stream = require("stream");
const path = require("path");
const { resolve } = require("path");
const { Console } = require("console");

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3({});
responseJSON = {};

exports.AWS = AWS;

exports.uploadToS3 = async (req, res) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: req.body.key,
    Expires: parseInt(process.env.LINK_EXPIRY_TIME),
  };
  const url = await s3.getSignedUrlPromise("putObject", params).catch((err) => {
    console.log(err);

    return sendResponse({ rid: "e-s3-8" }, res);
  });

  responseJSON["rid"] = "s-s3-8";
  responseJSON["data"] = url;
  return sendResponse(responseJSON, res);
};
exports.uploadOnepartPreSigned = async (
  req,
  multiUploadArray,
  uploadcount,
  uploadid
) => {
  if (uploadcount >= parseInt(req.body.parts) + 1) {
    console.log(multiUploadArray);
    return multiUploadArray;
  }

  const blobparams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: req.body.key,
    PartNumber: uploadcount,
    UploadId: uploadid,
    Expires: parseInt(process.env.LINK_EXPIRY_TIME),
  };

  let uploadedPart = await s3
    .getSignedUrlPromise("uploadPart", blobparams)
    .catch((err) => {
      console.log(err);
    });

  let uploadPartInfo = {
    PartNumber: uploadcount,
    url: uploadedPart,
  };
  multiUploadArray.push(uploadPartInfo);

  return this.uploadOnepartPreSigned(
    req,
    multiUploadArray,
    uploadcount + 1,
    uploadid
  );
};

exports.multiuploadToS3PreSigned = async (req, res) => {
  const chunkcount = req.body.parts;

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: req.body.key,
  };

  try {
    const multiPartupload = await s3
      .createMultipartUpload(params)
      .promise()
      .catch((err) => {
        console.log(err);
      });
    const uploadid = multiPartupload.UploadId;
    console.log("upload id = " + uploadid);
    let multiUploadArray = [];
    let generatedUrls = [];
    generatedUrls = await this.uploadOnepartPreSigned(
      req,
      multiUploadArray,
      1,
      uploadid
    );

    responseJSON["rid"] = "s-s3-8";
    responseJSON["data"] = { uploadId: uploadid, preSignedUrls: generatedUrls};
    return sendResponse(responseJSON, res);
  } catch (err) {
    console.log(err);
    return sendResponse({ rid: "e-s3-8" }, res);
  }
};

exports.uploadOnepart = async (
  req,
  multiUploadArray,
  uploadcount,
  chunksize,
  chunkcount,
  uploadid,
  fileContent
) => {
  if (uploadcount >= chunkcount + 1) {
    const params2 = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: req.body.key,
      UploadId: uploadid,
      MultipartUpload: {
        Parts: multiUploadArray,
      },
    };

    let completeMultipartUpload = await s3
      .completeMultipartUpload(params2)
      .promise()
      .catch((err) => {
        console.log(err);
      });

    console.log(multiUploadArray);
    return true;
  }

  let start = (uploadcount - 1) * chunksize;
  let end = uploadcount * chunksize;

  let fileblob =
    uploadcount < chunkcount
      ? fileContent.slice(start, end)
      : fileContent.slice(start);

  const blobparams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: req.body.key,
    PartNumber: uploadcount,
    UploadId: uploadid,
    Body: fileblob,
  };

  let Etag;

  let uploadedPart = await s3
    .uploadPart(blobparams, (err, data) => {
      if (err) return sendResponse({ rid: "e-s3-8" }, res);
      console.log("uploaded part " + uploadcount + " successfully!");

      Etag = data.ETag;
      console.log(Etag);
    })
    .promise()
    .catch((err) => {
      console.log(err);
    });

  let uploadPartDetails = {
    ETag: Etag,
    PartNumber: uploadcount,
  };
  multiUploadArray.push(uploadPartDetails);

  return this.uploadOnepart(
    req,
    multiUploadArray,
    uploadcount + 1,
    chunksize,
    chunkcount,
    uploadid,
    fileContent
  );
};

exports.multiuploadToS3 = async (req, res) => {
  const fileContent = fs.readFileSync(req.body.file_id);
  const { size } = fs.statSync(req.body.file_id);
  const chunksize = process.env.CHUNK_SIZE;
  const chunkcount = Math.floor(size / chunksize) + 1;

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: req.body.key,
    ContentType: req.body.file_type,
  };

  try {
    const multiPartupload = await s3
      .createMultipartUpload(params)
      .promise()
      .catch((err) => {
        console.log(err);
      });
    const uploadid = multiPartupload.UploadId;
    let multiUploadArray = [];
    let completeMultipartUpload;
    if (
      await uploadOnepart(
        req,
        multiUploadArray,
        req.body.part,
        chunksize,
        chunkcount,
        uploadid,
        fileContent
      )
    ) {
      responseJSON["rid"] = "s-s3-6";
      responseJSON["data"] = url;
      return sendResponse(responseJSON, res);
    }
  } catch (err) {
    return sendResponse({ rid: "e-s3-8" }, res);
  }
};

const getDownloadedFile = async (req, res) => {
  try {
    const filename = req.body.filename;
    //    let fileobj  = await s3.getObject({Bucket:AWS_BUCKET_NAME, Key: filename}).promise();
    let fileobj = await s3
      .getObject({ Bucket: AWS_BUCKET_NAME, Key: filename })
      .createReadStream();
    fileobj.pipe(res);
    // sendResponse({rid:"s101",data:fileobj.Body},res);
  } catch (err) {
    sendResponse({ rid: "e-s3-6" }, res);
  }
};

const uploadFromStream = async (pass, fileName) => {
  const s3params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileName + ".zip",
    Body: pass,
    ContentType: "application/zip",
  };

  let uploadobj = await s3.upload(s3params).promise();
};

exports.downloadAndZip = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    let s3patharray = [];
    for (let ind = 0; ind < req.body.requested_data.length; ind++) {
      let requestedFileId = req.body.requested_data[ind].split(".")[0];
      await file_master.findOne({ _id: requestedFileId }).then((task) => {
        if (!task || !task.s3Path) {
          return sendResponse({ rid: "e-s3-9" }, res);
        }
        s3patharray.push(task.s3_path);
      }).catch((err)=>{return sendResponse({ rid: "e-s3-9" }, res);});
    }
    console.log(s3patharray);
    const archive = archiver("zip", {
      zlib: { level: 8 }, // Sets the compression level.
    });
    req.body.requested_data.map((thisFile, index) => {
      let fileObj = s3
        .getObject({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: thisFile,
        })
        .createReadStream();

      console.log("the path isssss: " + s3patharray[index]);
      archive.append(fileObj, {
        name: s3patharray[index] + req.body.requested_data[index],
      });
    });

    const uploadStream = new stream.PassThrough();
    archive.finalize();

    archive.pipe(uploadStream);
    archive.on("warning", function (err) {
      if (err.code === "ENOENT") {
        console.log(err);
      } else {
        console.log(err);
        reject(err);
        throw err;
      }
    });
    archive.on("error", function (err) {
      console.log(err);
      reject(err);
      throw err;
    });
    archive.on("end", function () {
      console.log("archive end");
    });
    uploadFromStream(uploadStream, req.body.request_id);
    resolve(req.body.request_id);
  });
};

exports.uploadZip = (req, res, fileName, filebody) => {
  console.log(filebody);
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileName + ".zip",
    Body: filebody,
    ContentType: "application/zip",
  };
  s3.upload(params, (err, data) => {
    if (err) {
      return 0;
    }
    return 1;
  });
};

exports.getDownloadUrl = async (filename, res) => {
  try {
    const url = await s3.getSignedUrlPromise("getObject", {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: filename,
      Expires: parseInt(process.env.LINK_EXPIRY_TIME),
    });

    return url;
  } catch (err) {
    console.log(err);
    return sendResponse({ rid: "e-s3-11" }, res);
  }
};
