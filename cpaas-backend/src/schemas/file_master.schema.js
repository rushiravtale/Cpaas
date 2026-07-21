const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const fileMasterSchema = mongoose.Schema({

    file_name: String,
    file_size: Number,
    is_archive: Boolean,
    archived_on: Date,
    s3_path: String,

});

fileMasterSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('fileMaster',fileMasterSchema,"file_master");