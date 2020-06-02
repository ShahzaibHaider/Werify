const AdminModel = require("../models/admin.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var jwtfile = require("../jwt/jwt.js");
const RecipientModel = require("../models/recipient.js");
const OrganizationModel = require("../models/organization.js");

const FeedbackModel = require("../models/feedback.js");
const CertificateModel = require("../models/awardedCertificates.js");
const JobModel = require("../models/job.js");


exports.Signup = (req, res, next) => {
      const admin = new AdminModel(req.body);
      AdminModel.find({ username: admin.username }, (err, docs) => {
            if (docs) {
                  if (docs.length > 0) {
                        res.json({ "message": "Username Already Exist" });
                  } else {
                        admin.password = bcrypt.hashSync(admin.password, 10);
                        admin.save((err, docs) => {
                              if (docs) {
                                    res.json({ "message": "success" });
                              } else {
                                    res.json({ "message": "failure" });
                              }
                        });
                  }
            }
      })
}


exports.Login = (req, res, next) => {
      const admin = new AdminModel(req.body);
      AdminModel.find({ username: admin.username }, (err, docs) => {
            if (docs.length > 0) {
                  bcrypt.compare(admin.password, docs[0]["password"]).then(isEqual => {
                        if (isEqual == true) {
                              console.log()
                              jwt.sign({ username: admin.username }, jwtfile.secretkey, (err, token) => {
                                    res.send({
                                          "message": "success",
                                          "token": token
                                    });
                              })
                        } else {
                              res.send({ "message": "Wrong Password" })
                        }
                  });
            } else {
                  res.json({ "message": "Wrong Credientials" });
            }

      })
}




exports.SetNewPassword = (req, res, next) => {
      var username = req.body["username"];
      var forgot_password_key = req.body["time_value"];
      var user_type = req.body["user_type"];
      var new_password = req.body["new_password"];
      if (new_password.length >= 8) {
            if (user_type == "rec") {
                  RecipientModel.find({ username: username, forgot_password_key: forgot_password_key }, (err, docs) => {
                        if (docs.length > 0) {
                              new_forgot_password_key = new Date().getTime();
                              new_password = bcrypt.hashSync(new_password, 10);
                              RecipientModel.findOneAndUpdate({ username: username },
                                    { $set: { password: new_password, forgot_password_key: new_forgot_password_key } },
                                    { useFindAndModify: false }, function (err, docs) {
                                          if (docs) {
                                                res.send({ "message": "success" });
                                          } else {
                                                res.send({ "message": "failure" });
                                          }
                                    });
                        } else {
                              res.json({ "message": "You are Not Authorized" })
                        }
                  });
            } else if (user_type == "org") {
                  OrganizationModel.find({ username: username, forgot_password_key: forgot_password_key }, (err, docs) => {
                        if (docs.length > 0) {
                              new_forgot_password_key = new Date().getTime();
                              new_password = bcrypt.hashSync(new_password, 10);
                              OrganizationModel.findOneAndUpdate({ username: username },
                                    { $set: { password: new_password, forgot_password_key: new_forgot_password_key } },
                                    { useFindAndModify: false }, function (err, docs) {
                                          if (docs) {
                                                res.send({ "message": "success" });
                                          } else {
                                                res.send({ "message": "failure" });
                                          }
                                    });
                        } else {
                              res.json({ "message": "You are Not Authorized" })
                        }
                  });
            } else {
                  res.json({ "message": "You are Not Authorized" })
            }
      } else {
            res.json({ "message": "Password Should be 8 Character Long" });
      }
}





exports.GetFeedbacks = (req, res, next) => {
      const admin = new AdminModel({
            username: req.query["username"]
      });
      jwt.verify(req.token, jwtfile.secretkey, (err, data) => {
            if (err) {
                  res.json({
                        "message": "You are logged Out",
                        "err": err
                  });
            } else {
                  FeedbackModel.find({}, (err, docs) => {
                        if (docs) {
                              res.json({ "message": "success", "docs": docs })
                        } else {
                              res.json({ "message": "failure" });
                        }
                  })
            }
      })
}




exports.GetCertificates = (req, res, next) => {
      const admin = new AdminModel({
            username: req.query["username"]
      });
      jwt.verify(req.token, jwtfile.secretkey, (err, data) => {
            if (err) {
                  res.json({
                        "message": "You are logged Out",
                        "err": err
                  });
            } else {
                  CertificateModel.find({}, (err, docs) => {
                        if (docs) {
                              res.json({ "message": "success", "docs": docs })
                        } else {
                              res.json({ "message": "failure" });
                        }
                  })
            }
      })
}



exports.ApproveOrganization = (req, res, next) => {
      const admin = new AdminModel({
            username: req.query["username"]
      });
      jwt.verify(req.token, jwtfile.secretkey, (err, data) => {
            if (err) {
                  res.json({
                        "message": "You are logged Out",
                        "err": err
                  });
            } else {
                  OrganizationModel.findOneAndUpdate({ username: req.body["username"] },
                        { $set: { approved: true } },
                        { useFindAndModify: false }, function (err, docs) {
                              if (docs) {
                                    res.send({ "message": "success" });
                              } else {
                                    res.send({ "message": "failure" });
                              }
                        });
            }
      })
}




exports.GetOrganizations = (req, res, next) => {
      const admin = new AdminModel({
            username: req.query["username"]
      });
      jwt.verify(req.token, jwtfile.secretkey, (err, data) => {
            if (err) {
                  res.json({
                        "message": "You are logged Out",
                        "err": err
                  });
            } else {
                  OrganizationModel.find({ profile_completed_status: true }, (err, docs) => {
                        if (docs) {
                              res.json({ "message": "success", "docs": docs });
                        } else {
                              res.json({ "message": "failure" });
                        }
                  })
            }
      })
};

exports.GetRecipients = (req, res, next) => {
      const admin = new AdminModel({
            username: req.query["username"]
      });
      jwt.verify(req.token, jwtfile.secretkey, (err, data) => {
            if (err) {
                  res.json({
                        "message": "You are logged Out",
                        "err": err
                  });
            } else {
                  RecipientModel.find({ profile_completed_status: true }, (err, docs) => {
                        if (docs) {
                              res.json({ "message": "success", "docs": docs });
                        } else {
                              res.json({ "message": "failure" });
                        }
                  })
            }
      })
};






exports.GetRequests = (req, res, next) => {
      const admin = new AdminModel({
            username: req.query["username"]
      });
      jwt.verify(req.token, jwtfile.secretkey, (err, data) => {
            if (err) {
                  res.json({
                        "message": "You are logged Out",
                        "err": err
                  });
            } else {
                  OrganizationModel.find({ approved: false }, (err, docs) => {
                        if (docs) {
                              res.json({ "message": "success", "docs": docs });
                        } else {
                              res.json({ "message": "failure" });
                        }
                  })
            }
      })
};





exports.GetStatistics = (req, res, next) => {
      const admin = new AdminModel({
            username: req.query["username"]
      });
      jwt.verify(req.token, jwtfile.secretkey, (err, data) => {
            if (err) {
                  res.json({
                        "message": "You are logged Out",
                        "err": err
                  });
            } else {
                  OrganizationModel.find({}, (err, docs) => {
                        if (docs) {
                              var organization_count = docs.length;
                              RecipientModel.find({}, (err, docs) => {
                                    if (docs) {
                                          var recipient_count = docs.length;
                                          JobModel.find({}, (err, docs) => {
                                                if (docs) {
                                                      var job_count = docs.length;
                                                      CertificateModel.find({}, (err, docs) => {
                                                            if (docs) {
                                                                  var certificate_count = docs.length;
                                                                  res.json({ "message": "success", "rec": recipient_count, "cert": certificate_count, "job": job_count, "org": organization_count, });
                                                            } else {
                                                                  res.json({ "message": "failure" });
                                                            }
                                                      })
                                                } else {
                                                      res.json({ "message": "failure" });
                                                }
                                          })
                                    } else {
                                          res.json({ "message": "failure" });
                                    }
                              })
                        } else {
                              res.json({ "message": "failure" });
                        }
                  })
            }
      })
};