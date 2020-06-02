const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var OrganizationSchema = new Schema(
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
                  required: true
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
            phone: {
                  type: String,
                  default: null
            },
            phone_status: {
                  type: Boolean,
                  default: false
            },
            password: String,
            joining_date: {
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
            json_Canva: {
                  type: JSON,
                  default: null
            },
            profile_completed_status:
            {
                  type: Boolean,
                  default: false
            },
            creation_date: {
                  type: Date,
                  default: null
            },
            proof_document_path: {
                  type: String,
                  default: null
            },
            forgot_password_key: {
                  type: String,
                  required: true
            },
            courses: [
                  {
                        name:
                        {
                              type: String,
                              required: true
                        },
                        desc:
                        {
                              type: String,
                              required: true
                        },
                        duration: {
                              type: Number,
                              required: true
                        },
                  }
            ]
      }
);

module.exports = mongoose.model("Organization", OrganizationSchema);