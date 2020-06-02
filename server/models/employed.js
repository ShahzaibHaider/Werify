const mongoose = require("mongoose");

var Schema = mongoose.Schema;
var EmployedSchema = new Schema({
      id: Schema.ObjectId,
      hirerequest: {
            type: Schema.Types.ObjectId,
            ref: "HireRequest"
      },
      username: {
            type: String,
            required: true
      },
      org: {
            type: String,
            required: true
      },
      date:
      {
            type: Date,
            default: Date.now
      }
});

module.exports = mongoose.model("Employed", EmployedSchema);