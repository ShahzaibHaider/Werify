const mongoose = require("mongoose");

var Schema = mongoose.Schema;
var JobSchema = new Schema({
      id: Schema.ObjectId,
      title:
      {
            type: String,
            required: true
      },
      designation:
      {
            type: String,
            required: true
      },
      salary:
      {
            type: Number,
            required: true
      },
      vacancies:
      {
            type: Number,
            required: true
      },
      description:
      {
            type: String,
            required: true
      },
      field:
      {
            type: String,
            required: true
      },
      date:
      {
            type: Date,
            required: true
      },
      retract_job:
      {
            type: Boolean,
            default: false
      },
      location: {
            type: String,
            required: true
      },
      job_type:
      {
            type: String,
            required: true
      },
      user:
      {
            type: String,
            required: true
      }
});

module.exports = mongoose.model("Job", JobSchema);