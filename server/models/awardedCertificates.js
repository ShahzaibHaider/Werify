const mongoose = require("mongoose");

var Schema = mongoose.Schema;
var AwardedCertificateSchema = new Schema({
      id: Schema.ObjectId,
      certificate_no:
      {
            type: String,
            required: true
      },
      sender:
      {
            type: String,
            required: true
      },
      reciever:
      {
            type: String,
            required: true
      },
      certificate_block_number:
      {
            type: String,
            default: null
      },
      reciever_cnic:
      {
            type: String,
            required: true
      },
      course:
      {
            type: String,
            required: true
      },
      issue_date:
      {
            type: Date,
            default: Date.now
      },
      design:
      {
            type: JSON,
            required: true
      }
});

module.exports = mongoose.model("Certificate", AwardedCertificateSchema);