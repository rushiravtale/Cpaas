const mongoose = require("mongoose");

const downloadSchema = mongoose.Schema({

    requested_data:Array,
    download_link: String,
    expires_on: Date,
    status: Boolean,    

});

module.exports = mongoose.model('downloadRequest',downloadSchema, "download_requests");