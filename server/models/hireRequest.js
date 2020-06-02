const mongoose = require("mongoose");

var Schema = mongoose.Schema;
var HireRequestSchema = new Schema({
      id: Schema.ObjectId,
      from:
      {
            type: String,
            default: null
      },
      to:
      {
            type: String,
            default: null
      },
      date:
      {
            type: Date,
            default: Date.now
      },
      salary:
      {
            type: String,
            default: null
      },
      status:
      {
            type: Boolean,
            default: null
      },
      job_title:
      {
            type: String,
            default: null
      },
});

module.exports = mongoose.model("HireRequest", HireRequestSchema);