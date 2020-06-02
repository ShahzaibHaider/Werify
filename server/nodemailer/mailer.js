const mailer = require("nodemailer");
var jwtfile = require("../jwt/jwt.js");

const OrganizationModel = require("../models/organization.js");
const RecipientModel = require("../models/recipient.js");
const FeedbackModel = require("../models/feedback.js");

exports.SendEmail = (req, res, next) => {
      const transporter = mailer.createTransport({
            service: 'gmail',
            auth: {
                  user: "muhammad.talha.test.0011@gmail.com",
                  pass: "waqas1122334455"
            }
      });
      token = Math.floor(Math.random() * 6) + 1;
      var token = Math.floor(1000 + Math.random() * 9000);
      let body = {
            from: "muhammad.talha.test.0011@gmail.com",
            to: req.body["email"],
            subject: "Werify.com",
            html: `<h3>Token For Verification</h3>   <p>This is the Token For Verification ${token}</p>`
      }
      transporter.sendMail(body, (err, result) => {
            if (err) {
                  res.json({ "message": err })
            } else {
                  res.json({ "message": "success", "token": token })
            }
      });
}





exports.SendLinkOnEmail = (req, res, next) => {


      const transporter = mailer.createTransport({
            service: 'gmail',
            auth: {
                  user: "muhammad.talha.test.0011@gmail.com",
                  pass: "waqas1122334455"
            }
      });


      if (req.body["user_type"] == "rec") {
            RecipientModel.find({ email: req.body["email"] }, (err, docs) => {
                  if (docs.length > 0) {
                        var value = "http://localhost:4200/rec/" + docs[0]["forgot_password_key"] + "/" + docs[0]["username"];
                        let body = {
                              from: "muhammad.talha.test.0011@gmail.com",
                              to: req.body["email"],
                              subject: "Werify.com",
                              html: `<h3>Link to Change Password</h3>   <p>This is the Link For Change Password <a href="${value}">Click here</a> </p>`
                        }
                        transporter.sendMail(body, (err, result) => {
                              if (err) {
                                    res.json({ "message": err })
                              } else {
                                    res.json({ "message": "success" })
                              }
                        });
                  } else {
                        res.json({ "message": "No Such Email Exist" });
                  }
            });
      } else {
            OrganizationModel.find({ email: req.body["email"] }, (err, docs) => {
                  if (docs.length > 0) {
                        var value = "http://localhost:4200/org/" + docs[0]["forgot_password_key"] + "/" + docs[0]["username"];
                        let body = {
                              from: "muhammad.talha.test.0011@gmail.com",
                              to: req.body["email"],
                              subject: "Werify.com",
                              html: `<h3>Token For Verification</h3>   <p>This is the Link For Change <a href="${value}">Click here</a> </p>`
                        }
                        transporter.sendMail(body, (err, result) => {
                              if (err) {
                                    res.json({ "message": err })
                              } else {
                                    res.json({ "message": "success" })
                              }
                        });
                  } else {
                        res.json({ "message": "No Such Email Exist" });
                  }
            });
      }
}






































exports.Reply = (req, res, next) => {
      const transporter = mailer.createTransport({
            service: 'gmail',
            auth: {
                  user: "muhammad.talha.test.0011@gmail.com",
                  pass: "waqas1122334455"
            }
      });

      const feedback = new FeedbackModel(req.body["feedback"]);
      let email = "";
      if (feedback.user_type == "Recipient") {
            RecipientModel.find({ username: feedback.provider }, { email: 1 }, (err, docs) => {
                  if (docs) {
                        email = docs[0]["email"];
                        let body = {
                              from: "muhammad.talha.test.0011@gmail.com",
                              to: email,
                              subject: "Reply From Your Feedback - Werify",
                              html: `<h3>Feeback Reply</h3>   <p>Thanks you for your feedback we are working on it thanks</p>`
                        }
                        transporter.sendMail(body, (err, result) => {
                              if (err) {
                                    res.json({ "message": err })
                              } else {
                                    FeedbackModel.findByIdAndUpdate(feedback["_id"],
                                          { $set: { replied: true } },
                                          { useFindAndModify: false }, function (err, docs) {
                                                if (docs) {
                                                      res.json({ "message": "success" })
                                                } else {
                                                      res.send({ "message": "failure" });
                                                }
                                          });
                              }
                        });
                  } else {
                        console.log(err);
                  }
            })
      } else {
            OrganizationModel.find({ username: feedback.provider }, { email: 1 }, (err, docs) => {
                  if (docs) {
                        email = docs[0]["email"];
                        let body = {
                              from: "muhammad.talha.test.0011@gmail.com",
                              to: email,
                              subject: "Reply From Your Feedback - Werify",
                              html: `<h3>Feeback Reply</h3>   <p>Thanks you for your feedback we are working on it thanks</p>`
                        }
                        transporter.sendMail(body, (err, result) => {
                              if (err) {
                                    res.json({ "message": err })
                              } else {
                                    FeedbackModel.findByIdAndUpdate(feedback["_id"],
                                          { $set: { replied: true } },
                                          { useFindAndModify: false }, function (err, docs) {
                                                if (docs) {
                                                      res.json({ "message": "success" })
                                                } else {
                                                      res.send({ "message": "failure" });
                                                }
                                          });
                              }
                        });
                  } else {
                        console.log(err);
                  }
            })
      }
}


