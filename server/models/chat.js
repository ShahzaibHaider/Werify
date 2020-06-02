const mongoose = require("mongoose");

var Schema = mongoose.Schema;
var ChatSchema = new Schema({
      id: Schema.ObjectId,
      organization:
      {
            type: String,
            required: true
      },
      recipient:
      {
            type: String,
            required: true
      },
      org_img_path: {
            type: String,
            required: true
      },
      rec_img_path: {
            type: String,
            required: true
      },
      messages: [
            {
                  date:
                  {
                        type: Date,
                        default: Date.now
                  },
                  type: String,
                  file_path: String,
                  message_text: String,
                  user: String
            }
      ],
      rec_archieved_status:
      {
            type: Boolean,
            default: false
      },
      org_archieved_status:
      {
            type: Boolean,
            default: false
      },
      rec_pinned_status:
      {
            type: Boolean,
            default: false
      },
      org_pinned_status:
      {
            type: Boolean,
            default: false
      },
      rec_delete_status:
      {
            type: Boolean,
            default: false
      },
      org_delete_status:
      {
            type: Boolean,
            default: false
      }
});

module.exports = mongoose.model("chat", ChatSchema);