const dotenv = require("dotenv");
dotenv.config({ path: ".env" });
const AWS = require("aws-sdk");
const sendResponse = require("../utils/sendResponse");
const s3Helper = require("../helpers/s3.helper");
const fs = require("fs");
const s3 = new s3Helper.AWS.S3({});
const file_master = require("../schemas/file_master.schema");
const download_request = require("../schemas/download_request.schema");
var responseJSON = {};

exports.addToCollection = (req, res) => {
  const entryData = {
    file_name: req.body.file_name,
    file_size: req.body.file_size,
    is_archive: false,
    s3_path: req.body.s3_path,
  };

  if (req.body.file_name == "") return sendResponse({ rid: "e-s3-2" }, res);

  const formEntry = new file_master(entryData);

  formEntry
    .save()
    .then((formEntry) => {
      console.log("Added succesfully");
      responseJSON["rid"] = "s-s3-1";
      responseJSON["data"] = formEntry;
      return sendResponse(responseJSON, res);
    })
    .catch((err) => {
      console.log(`Error: ${err}`);
      return sendResponse({ rid: "e-s3-3" }, res);
    });
};

exports.archiveEntry = (req, res) => {
  const fileId = req.body.file_id;
  try {
    if (req.body.file_id == "") return sendResponse({ rid: "e-s3-1" }, res);

    file_master.findOne({ _id: fileId }).then((result) => {
      result.is_archive = true;
      result.archived_on = new Date().toISOString().slice(0, 10);

      result
        .save()
        .then((result) => {
          file_master.findByIdAndUpdate(result._id).then(() => {
            responseJSON["rid"] = "s-s3-2";
            responseJSON["data"] = result;
            return sendResponse(responseJSON, res);
          });
        })
        .catch((err) => console.log(`Error : ${err}`));
    });
  } catch (err) {
    return sendResponse({ rid: "e-s3-4" }, res);
  }
};
exports.listMasterFiles = (req, res) => {
  const pageNumber = req.query.page;
  const limit = req.query.limit;

  file_master
    .paginate({}, { page: pageNumber, limit: limit })
    .then(async (response) => {
      console.log(JSON.stringify(response));
      responseJSON["rid"] = "s-s3-3";
      responseJSON["data"] = response;
      return sendResponse(responseJSON, res);
    })
    .catch((err) => {
      return sendResponse({ rid: "e-s3-5" }, res);
    });
};

exports.getInfo = async (req, res) => {
  // console.log("decoded req is -----"+req.decoded);
  try {
    const fileInfo = await file_master.findOne({ _id: req.body.file_id });
    if (!fileInfo) return sendResponse({ rid: "e-s3-6" }, res);

    responseJSON["rid"] = "s-s3-4";
    responseJSON["data"] = fileInfo;
    return sendResponse(responseJSON, res);
  } catch (err) {
    console.log(err);
    return sendResponse({ rid: "e-s3-5" }, res);
  }
};

exports.uploadFile = async (req, res) => {
  console.log(req.headers.type);
  if (req.headers.type == "singlepart") {
    return s3Helper.uploadToS3(req, res);
  } else if (req.headers.type == "multipart") {
    return s3Helper.multiuploadToS3PreSigned(req, res);
  } else return sendResponse({ rid: "e-s3-7" }, res);
};

exports.listFiles = async (req, res) => {
  let r = await s3
    .listObjectsV2({ Bucket: process.env.AWS_BUCKET_NAME })
    .promise();
  let list = r.Contents.map((item) => item.Key);

  responseJSON["rid"] = "s-s3-5";
  responseJSON["data"] = list;
  return sendResponse(responseJSON, res);
};

exports.downloadFile = async (req, res) => {
  const url = await s3.getSignedUrlPromise("getObject", {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: req.body.file_id,
    Expires: parseInt(process.env.LINK_EXPIRY_TIME),
  });
  responseJSON["rid"] = "s-s3-7";
  responseJSON["data"] = url;
  return sendResponse(responseJSON, res);
};
//To test insertion in the download requests collection
exports.addRequest = (req, res) => {
  const requestEntry = {
    requested_data: req.body.requested_data,
    status: 0,
  };

  const ta = new download_request(requestEntry);
  ta.save()
    .then((ta) => {
      console.log("Added succesfully");
      responseJSON["rid"] = "s-s3-10";
      responseJSON["data"] = requestEntry;
      return sendResponse(responseJSON, res);
    })
    .catch((err) => {
      return sendResponse({ rid: "e-s3-3" }, res);
    });
};
exports.completeMultiUpload = async (req, res) => {
  const params2 = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: req.body.key,
    UploadId: req.body.uploadid,
    MultipartUpload: {
      Parts: req.uploadInfoArray,
    },
  };
  let completeMultipartUpload = await s3
    .completeMultipartUpload(params2)
    .promise()
    .catch((err) => {
      return sendResponse({ rid: "e-s3-8" }, res);
      console.log(err);
    });
    responseJSON["rid"] = "s-s3-6";
    responseJSON["data"] = null;
    return sendResponse(responseJSON, res);
};
exports.abortMultiUpload = async (req, res) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: req.body.key,
    UploadId: req.body.uploadid,
  };
  try {
    const abortUpload = await s3.abortMultipartUpload(params).promise();
    responseJSON["rid"] = "s-s3-12";
    responseJSON["data"] = null;
    return sendResponse(responseJSON, res);
  } catch (err) {
    console.log(err);
  }
};
exports.deleteFile = async (req, res) => {
  const filename = req.body.key;
  await s3
    .deleteObject({ Bucket: process.env.AWS_BUCKET_NAME, Key: filename })
    .promise();

  responseJSON["rid"] = "s-s3-9";
  responseJSON["data"] = null;
  return sendResponse(responseJSON, res);
};
exports.multiDownloadFiles = async (req, res) => {
  let returnBody = req.body.request_id;
  await s3Helper
    .downloadAndZip(req, res)
    .then((fileName) => {
      returnBody = fileName;
    })
    .catch((err) => {
      return sendResponse({ rid: "e-s3-9" }, res);
    });

  //   if (s3Helper.uploadZip(req, res, returnBody.request_id, multiStream)) {
  const file_handle = returnBody + ".zip";
  const url = await s3Helper.getDownloadUrl(file_handle, res);
  console.log(url);

  try {
    const request_obj = await download_request
      .findOne({ _id: req.body.request_id })
      .then((task) => {
        console.log(task);
        if (!task) return sendResponse({ rid: "e-s3-9" }, res);
        task.status = 1;
        task.download_link = url;
        const today = new Date();
        let urlExpires = new Date();
        urlExpires.setDate(
          today.getDate() + parseInt(process.env.LINK_EXPIRY_DAYS)
        );
        task.expires_on = urlExpires;
        responseJSON["rid"] = "s-s3-11";
        responseJSON["data"] = task;
        task.save().then((task) => {
          download_request
            .findByIdAndUpdate(task._id, sendResponse(responseJSON, res))
            .catch((err) => console.log(`Error : ${err}`));
        });
      });
  } catch (err) {
    return sendResponse({ rid: "e-s3-12" }, res);
  }
};
exports.queuePending = async (req, res) => {
  try {
    download_request.findOne({ status: 0 }).then((task) => {
      if (!task) {
        return sendResponse({ rid: "e-s3-13" }, res);
      }
      req.body.request_id = task._id;
      req.body.requested_data = task.requested_data;

      this.multiDownloadFiles(req, res);
    });
  } catch (err) {
    return sendResponse({ rid: "e-s3-10" }, res);
  }
};

exports.fetchRequests = async (req, res) => {
  download_request
  .find()
  .then((r) => {
    // let list = r.Contents.map((item) => item.Key);

    responseJSON["rid"] = "s-s3-14";
    responseJSON["data"] = r;
    return sendResponse(responseJSON, res);
  })
  .catch((err) => {
    console.log(err);
    return sendResponse({ rid: "e-s3-15" }, res);
  });

};

exports.deleteRequests = async (req, res) => {
  try {
    let p = await download_request.findByIdAndDelete(req.body.request_id);
    responseJSON["rid"] = "s-s3-13";
    responseJSON["data"] = null;
    return sendResponse(responseJSON, res);
  } catch (err) {
    console.log(err);
    return sendResponse({ rid: "e-s3-14" }, res);
  }
};
