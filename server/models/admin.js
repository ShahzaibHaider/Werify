const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var AdminSchema = new Schema({
      id: Schema.ObjectId,
      username:
      {
            type: String,
            required: true
      },
      password:
      {
            type: String,
            required: true
      },
});

module.exports = mongoose.model("Admin", AdminSchema);