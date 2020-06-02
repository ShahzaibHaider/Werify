const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var RecipientSchema = new Schema(
      {
            id: Schema.ObjectId,
            first_name: {
                  type: String,
                  default: null
            },
            last_name: {
                  type: String,
                  default: null
            },
            username:
            {
                  type: String,
                  unique: true,
                  default: null
            },
            email: {
                  type: String,
                  unique: true,
                  required: true
            },
            email_status: {
                  type: Boolean,
                  default: false
            },
            phone:
            {
                  type: String,
                  default: null
            },
            phone_status: {
                  type: Boolean,
                  default: false
            },
            password: String,
            joining_date:
            {
                  type: Date,
                  default: Date.now
            },
            country: {
                  type: String,
                  default: null
            },
            province: {
                  type: String,
                  default: null
            },
            city: {
                  type: String,
                  default: null
            },
            district: {
                  type: String,
                  default: null
            },
            address: {
                  type: String,
                  default: null
            },
            img_path: {
                  type: String,
                  default: null
            },
            approved:
            {
                  type: Boolean,
                  default: false
            },
            blocked:
            {
                  type: Boolean,
                  default: true
            },
            profile_completed_status:
            {
                  type: Boolean,
                  default: false
            },
            cnic:
            {
                  type: String,
                  default: null
            },
            field: {
                  type: String,
                  default: null
            },
            dob:
            {
                  type: Date,
                  min: '1900-01-01',
                  max: '2000-01-01',
                  default: null
            },
            employed: {
                  type: String,
                  default: null
            },
            forgot_password_key: {
                  type: String,
                  required: true
            }
      }
);

module.exports = mongoose.model("Recipient", RecipientSchema);