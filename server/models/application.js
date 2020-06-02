const mongoose = require("mongoose");

var Schema = mongoose.Schema;
var ApplicationSchema = new Schema({
      id: Schema.ObjectId,
      proposal:
      {
            type: String,
            required: true
      },
      date:
      {
            type: Date,
            default: Date.now
      },
      job_title:
      {
            type: String,
            required: true
      },
      application_status:
      {
            type: String,
            required: true
      },
      job:
      {
            type: Schema.Types.ObjectId,
            ref: "Job"
      },
      recipient:
      {
            type: String,
            required: true
      },
});

module.exports = mongoose.model("Application", ApplicationSchema);