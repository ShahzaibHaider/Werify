const RecipientModel = require("../models/recipient.js");
const jwt = require("jsonwebtoken");
var jwtfile = require("../jwt/jwt.js");
var fs = require('fs');
var mailer = require("../nodemailer/mailer.js");
const OrganizationModel = require("../models/organization.js");
const ChatModel = require("../models/chat.js");
const JobsModel = require("../models/job.js");
const ApplicationsModel = require("../models/application.js");
const HireRequestModel = require("../models/hireRequest.js");
const EmployedModel = require("../models/employed.js");
const AwardedCertificatesModel = require("../models/awardedCertificates.js");
const FeedbackModel = require("../models/feedback.js");
const bcrypt = require("bcryptjs");
var sharp = require("sharp");

exports.Signup = (req, res, next) => {
      const recipient = new RecipientModel(req.body);
      if (recipient.password.length < 8) {
            res.json({ "message": "Password Length Should be atleast 8" });
      } else {
            if (recipient.username.split(" ").length > 1) {
                  res.json({ "message": "Username Should not Contain Space" });
            } else {
                  RecipientModel.find({ username: recipient.username }, function (err, docs) {
                        if (docs.length > 0) {
                              res.send({ "message": "Username Already Exist" })
                        } else {
                              RecipientModel.find({ email: recipient.email }, function (err, docs) {
                                    if (docs.length > 0) {
                                          res.send({ "message": "Email Already Exist" });
                                    } else {
                                          recipient.password = bcrypt.hashSync(recipient.password, 10);
                                          recipient.forgot_password_key = new Date().getTime();
                                          recipient.save((err, data) => {
                                                if (!err) {
                                                      res.send({ "message": "success" });
                                                } else {
                                                      console.log(err);
                                                }
                                          });
                                    }
                              });
                        }
                  });
            }
      }
}




exports.Signin = (req, res, next) => {
      const recipient = new RecipientModel({
            username: req.body["username"],
            password: req.body["password"]
      });
      RecipientModel.find({ username: recipient.username }, function (err, docs) {
            if (docs.length > 0) {
                  bcrypt.compare(recipient.password, docs[0]["password"]).then(isEqual => {
                        if (isEqual == true) {
                              jwt.sign({ username: recipient.username }, jwtfile.secretkey, (err, token) => {
                                    res.send({
                                          "message": "Success",
                                          "token": token
                                    });
                              })
                        } else {
                              res.send({ "message": "Wrong Password" })
                        }
                  });
            } else {
                  res.send({ "message": "Wrong Username" });
            }
      });
}



exports.View = (req, res, next) => {
      const recipient = new RecipientModel({
            username: req.query["username"]
      });
      jwt.verify(req.token, jwtfile.secretkey, (err, data) => {
            if (err) {
                  res.json({
                        "message": "You are logged Out",
                        "err": err
                  });
            } else {
                  RecipientModel.find({ username: recipient.username }, function (err, docs) {
                        if (docs.length > 0) {
                              res.json(docs);
                        } else {
                              res.send({ "message": "Failure" });
                        }
                  });
            }
      })
}





exports.View2 = (req, res, next) => {
      RecipientModel.find({ username: req.body["username"] }, function (err, docs) {
            if (docs.length > 0) {
                  res.json(docs);
            } else {
                  res.send({ "message": "Failure" });
            }
      });
}



exports.Update = (req, res, next) => {
      const recipient = new RecipientModel(JSON.parse(req.body["rec"]));
      recipient.img_path = req.filename;
      recipient.profile_completed_status = true;
      recipient.approved = false;
      recipient.blocked = false;
      jwt.verify(req.token, jwtfile.secretkey, (err, data) => {
            if (err) {
                  res.json({
                        "message": "You are logged Out",
                        "err": err
                  });
            } else {
                  if (recipient.img_path) {
                        RecipientModel.find({ username: recipient.username }, function (err, docs) {
                              if (docs.length > 0) {
                                    if (docs[0]["img_path"] == null) {
                                          path = "assets/" + recipient.img_path;
                                          path_resized = "assets/resized_" + recipient.img_path;
                                          sharp(path).resize(225, 225).toFile(path_resized, function (err) {
                                                if (!err) {
                                                      fs.renameSync(path_resized, path);
                                                } else {
                                                      console.log(err);
                                                }
                                          });
                                    } else {
                                          path = "assets/" + docs[0]["img_path"];
                                          fs.unlinkSync(path);
                                          path = "assets/" + recipient.img_path;
                                          path_resized = "assets/resized_" + recipient.img_path;
                                          sharp(path).resize(225, 225).toFile(path_resized, function (err) {
                                                if (!err) {
                                                      fs.renameSync(path_resized, path);
                                                } else {
                                                      console.log(err);
                                                }
                                          });
                                    }
                              } else {
                                    res.send({ "message": "failure" });
                              }
                        });
                        RecipientModel.findOneAndUpdate({ username: recipient.username },
                              { $set: { first_name: recipient.first_name, last_name: recipient.last_name, email_status: recipient.email_status, phone: recipient.phone, phone_status: recipient.phone_status, country: recipient.country, province: recipient.province, city: recipient.city, district: recipient.district, address: recipient.address, img_path: recipient.img_path, approved: recipient.approved, profile_completed_status: recipient.profile_completed_status, cnic: recipient.cnic, field: recipient.field, dob: recipient.dob, employed: recipient.employed, email: recipient.email, cnic: recipient.cnic } },
                              { useFindAndModify: false }, function (err, docs) {
                                    if (docs) {
                                          res.send({ "message": "success" });
                                    } else {
                                          res.send({ "message": "failure" });
                                    }
                              });
                  } else {
                        RecipientModel.findOneAndUpdate({ username: recipient.username },
                              { $set: { first_name: recipient.first_name, last_name: recipient.last_name, email_status: recipient.email_status, phone: recipient.phone, phone_status: recipient.phone_status, country: recipient.country, province: recipient.province, city: recipient.city, district: recipient.district, address: recipient.address, approved: recipient.approved, profile_completed_status: recipient.profile_completed_status, cnic: recipient.cnic, field: recipient.field, dob: recipient.dob, employed: recipient.employed, password: recipient.password, email: recipient.email, cnic: recipient.cnic } },
                              { useFindAndModify: false }, function (err, docs) {
                                    if (docs) {
                                          res.send({ "message": "success" });
                                    } else {
                                          res.send({ "message": "failure" });
                                    }
                              });
                  }
            }
      })
}


exports.viewEmployers = (req, res, next) => {
      jwt.verify(req.token, jwtfile.secretkey, (err, data) => {
            if (err) {
                  res.json({
                        "message": "You are logged Out",
                        "err": err
                  });
            } else {
                  OrganizationModel.find({ profile_completed_status: true }, (err, docs) => {
                        if (docs) {
                              res.json({ "docs": docs, "message": "success" });
                        } else {
                              res.status(404).json({ "message": "failure" })
                        }
                  })
            }
      })
}




exports.getRecipientCertificates = (req, res, next) => {
      const recipient = new RecipientModel({
            username: req.query["username"]
      });
      jwt.verify(req.token, jwtfile.secretkey, (err, data) => {
            if (err) {
                  res.json({
                        "message": "You are logged Out",
                        "err": err
                  });
            } else {
                  AwardedCertificatesModel.find({ reciever: recipient.username }, (err, docs) => {
                        if (docs) {
                              res.json({ "docs": docs, "message": "success" })
                        } else {
                              res.status(404).json({ "message": "failure" })
                        }
                  })
            }

      })
}





exports.getRecipientCertificates2 = (req, res, next) => {
      AwardedCertificatesModel.find({ reciever: req.body["username"] }, (err, docs) => {
            if (docs) {
                  res.json({ "docs": docs, "message": "success" })
            } else {
                  res.status(404).json({ "message": "failure" })
            }
      });
}














exports.getCertificate = (req, res, next) => {
      const recipient = new RecipientModel({
            username: req.query["username"]
      });
      jwt.verify(req.token, jwtfile.secretkey, (err, data) => {
            if (err) {
                  res.json({
                        "message": "You are logged Out",
                        "err": err
                  });
            } else {
                  AwardedCertificatesModel.find({ reciever: recipient.username, certificate_no: req.body["certificate_number"] }, (err, docs) => {
                        if (docs) {
                              res.json({ "docs": docs, "message": "success" })
                        } else {
                              res.status(404).json({ "message": "failure" })
                        }
                  })
            }

      })
}







exports.changePassword = (req, res, next) => {
      const recipient = new RecipientModel({
            username: req.query["username"]
      });
      jwt.verify(req.token, jwtfile.secretkey, (err, data) => {
            if (err) {
                  res.json({
                        "message": "You are logged Out",
                        "err": err
                  });
            } else {
                  RecipientModel.find({ username: recipient.username }, (err, docs) => {
                        if (docs) {
                              old_password = req.body['old_password'];
                              new_password = req.body["new_password"];
                              bcrypt.compare(old_password, docs[0]["password"]).then(isEqual => {
                                    if (isEqual == true) {
                                          RecipientModel.findOneAndUpdate({ username: recipient.username },
                                                { $set: { password: bcrypt.hashSync(new_password, 10) } },
                                                { useFindAndModify: false }, function (err, docs) {
                                                      if (docs) {
                                                            res.send({ "message": "success" });
                                                      } else {
                                                            res.send({ "message": "failure", "err": err });
                                                      }
                                                });
                                    } else {
                                          res.send({ "message": "Old Password Not Matched" })
                                    }
                              });
                        } else {
                              res.json({ 'message': "failure" });
                        }
                  })
            }
      })
}




exports.Feedback = (req, res, next) => {
      const recipient = new RecipientModel({
            username: req.query["username"]
      });
      jwt.verify(req.token, jwtfile.secretkey, (err, data) => {
            if (err) {
                  res.json({
                        "message": "You are logged Out",
                        "err": err
                  });
            } else {
                  const feedback = new FeedbackModel(req.body);
                  feedback.provider = recipient.username;
                  feedback.date = new Date();
                  feedback.save((err, docs) => {
                        if (docs) {
                              res.send({ "message": "success" })
                        } else {
                              res.send({ "message": "failure", "Error": err })
                        }
                  })
            }
      })
}


exports.GetJobs = (req, res, next) => {
      const recipient = new RecipientModel({
            username: req.query["username"]
      });
      jwt.verify(req.token, jwtfile.secretkey, (err, data) => {
            if (err) {
                  res.json({
                        "message": "You are logged Out",
                        "err": err
                  });
            } else {
                  JobsModel.find({ retract_job: false }, (err, docs) => {
                        if (docs) {
                              res.json({ "docs": docs });
                        } else {
                              res.json({ "message": "failure" });
                        }
                  })
            }
      })
}

exports.GetJob = (req, res, next) => {
      const recipient = new RecipientModel({
            username: req.query["username"]
      });
      jwt.verify(req.token, jwtfile.secretkey, (err, data) => {
            if (err) {
                  res.json({
                        "message": "You are logged Out",
                        "err": err
                  });
            } else {
                  JobsModel.findById(req.body["job_id"], (err, docs) => {
                        if (docs) {
                              res.json({ "message": "success", "docs": docs });
                        } else {
                              res.json({ "message": "failure" });
                        }
                  })
            }
      })
}





exports.GetOrganizationDetail = (req, res, next) => {
      const recipient = new RecipientModel({
            username: req.query["username"]
      });
      jwt.verify(req.token, jwtfile.secretkey, (err, data) => {
            if (err) {
                  res.json({
                        "message": "You are logged Out",
                        "err": err
                  });
            } else {
                  OrganizationModel.find({ username: req.body["username"] }, (err, docs) => {
                        if (docs) {
                              res.json({ "message": "success", "docs": docs });
                        } else {
                              res.json({ "message": "failure" });
                        }
                  })
            }
      })
}



exports.ApplicationOnJob = (req, res, next) => {
      const recipient = new RecipientModel({
            username: req.query["username"]
      });
      const application = new ApplicationsModel(req.body);
      application.date = "" + new Date();
      application.recipient = recipient.username;
      application.proposal = "This is my Proposal";
      application.application_status = "Pending";
      jwt.verify(req.token, jwtfile.secretkey, (err, data) => {
            if (err) {
                  res.json({
                        "message": "You are logged Out",
                        "err": err
                  });
            } else {
                  ApplicationsModel.find({ recipient: application.recipient, job: application.job }, (err, docs) => {
                        if (docs.length > 0) {
                              res.json({ "message": "Application Already Submitted" })
                        } else {
                              JobsModel.findById(application.job, (err, docs) => {
                                    if (docs) {
                                          application.job_title = docs["title"];
                                          application.save((err, docs) => {
                                                if (docs) {
                                                      res.send({ "message": "success" });
                                                } else {
                                                      res.send({ "message": "failure" });
                                                }
                                          });
                                    } else {
                                          res.json({ "message": "failure" })
                                    }
                              })
                        }
                  })
            }
      })
}




exports.ApplicationOfRecipient = (req, res, next) => {
      const recipient = new RecipientModel({
            username: req.query["username"]
      });
      jwt.verify(req.token, jwtfile.secretkey, (err, data) => {
            if (err) {
                  res.json({
                        "message": "You are logged Out",
                        "err": err
                  });
            } else {
                  ApplicationsModel.find({ recipient: recipient.username }, (err, docs) => {
                        if (docs) {
                              res.send({ "message": "success", "docs": docs });
                        } else {
                              res.send({ "message": "failure", "error": err });
                        }
                  });
            }
      })
}




exports.DeleteApplication = (req, res, next) => {
      const recipient = new RecipientModel({
            username: req.query["username"]
      });
      jwt.verify(req.token, jwtfile.secretkey, (err, data) => {
            if (err) {
                  res.json({
                        "message": "You are logged Out",
                        "err": err
                  });
            } else {
                  ApplicationsModel.deleteOne({ recipient: req.body["username"], job: req.body["job_id"] }, (err, docs) => {
                        if (docs) {
                              ApplicationsModel.find({ recipient: req.body["username"] }, (err, docs) => {
                                    if (docs) {
                                          res.json({ "message": "success", "docs": docs })
                                    } else {
                                          res.json({ "message": "failure" });
                                    }
                              })
                        } else {
                              res.send({ "message": "failure", "error": err });
                        }
                  });
            }
      })
}






exports.getChats = (req, res, next) => {
      const recipient = new RecipientModel({
            username: req.query["username"]
      });
      jwt.verify(req.token, jwtfile.secretkey, (err, data) => {
            if (err) {
                  res.json({
                        "message": "You are logged Out",
                        "err": err
                  });
            } else {
                  ChatModel.find({ recipient: recipient.username }, (err, docs) => {
                        if (docs) {
                              res.json({ "message": "success", "docs": docs });
                        } else {
                              res.json({ "message": "failure" });
                        }
                  })
            }
      })
}

exports.getHireRequests = (req, res, next) => {
      const recipient = new RecipientModel({
            username: req.query["username"]
      });
      jwt.verify(req.token, jwtfile.secretkey, (err, data) => {
            if (err) {
                  res.json({
                        "message": "You are logged Out",
                        "err": err
                  });
            } else {
                  HireRequestModel.find({ to: recipient.username, status: null }, (err, docs) => {
                        if (docs) {
                              res.json({ "message": "success", "docs": docs });
                        } else {
                              res.json({ "message": "failure" });
                        }
                  })
            }
      })
}


exports.acceptOffer = (req, res, next) => {
      const recipient = new RecipientModel({
            username: req.query["username"]
      });
      let id = req.body["id"];
      jwt.verify(req.token, jwtfile.secretkey, (err, data) => {
            if (err) {
                  res.json({
                        "message": "You are logged Out",
                        "err": err
                  });
            } else {
                  const employee = new EmployedModel({
                        hireRequestID: id,
                        username: recipient.username,
                        org: req.body["org"],
                        date: Date.now()
                  })
                  employee.save((err, docs) => {
                        if (docs) {
                              HireRequestModel.findByIdAndUpdate(id, { $set: { status: true } },
                                    { useFindAndModify: false }, function (err, docs) {
                                          if (docs) {
                                                RecipientModel.findOneAndUpdate({ username: recipient.username },
                                                      { $set: { employed: "yes" } },
                                                      { useFindAndModify: false }, function (err, docs) {
                                                            if (docs) {
                                                                  res.send({ "message": "success" });
                                                            } else {
                                                                  res.send({ "message": "failure" });
                                                            }
                                                      });
                                          } else {
                                                res.send({ "message": "failure" });
                                          }
                                    });
                        } else {
                              res.send({ "message": "failure" });
                        }
                  })

            }
      })
}

exports.rejectOffer = (req, res, next) => {
      const recipient = new RecipientModel({
            username: req.query["username"]
      });
      let id = req.body["id"];
      jwt.verify(req.token, jwtfile.secretkey, (err, data) => {
            if (err) {
                  res.json({
                        "message": "You are logged Out",
                        "err": err
                  });
            } else {
                  HireRequestModel.findByIdAndUpdate(id, { $set: { status: false } },
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



exports.getChatByID = (req, res, next) => {
      const recipient = new RecipientModel({
            username: req.query["username"]
      });
      jwt.verify(req.token, jwtfile.secretkey, (err, data) => {
            if (err) {
                  res.json({
                        "message": "You are logged Out",
                        "err": err
                  });
            } else {
                  ChatModel.findById(req.body["id"], (err, docs) => {
                        if (docs) {
                              res.json({ "message": "success", "docs": docs });
                        } else {
                              res.json({ "message": "failure" });
                        }
                  })
            }
      })
}