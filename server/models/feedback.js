const mongoose = require("mongoose");

var Schema = mongoose.Schema;
var FeedbackSchema = new Schema({
      id: Schema.ObjectId,
      provider:
      {
            type: String,
            required: true
      },
      category:
      {
            type: String,
            required: true
      },
      desc:
      {
            type: String,
            required: true
      },
      user_type:
      {
            type: String,
            required: true
      },
      date:
      {
            type: Date,
            default: Date.now
      },
      replied:
      {
            type: Boolean,
            default: false
      }

});

module.exports = mongoose.model("Feedback", FeedbackSchema);