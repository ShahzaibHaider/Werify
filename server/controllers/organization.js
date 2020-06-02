const OrganizationModel = require("../models/organization.js");
const CertificateModel = require("../models/awardedCertificates.js");
const RecipientModel = require("../models/recipient.js");
const HireRequestModel = require("../models/hireRequest.js");
const ChatModel = require("../models/chat.js");
const jwt = require("jsonwebtoken");
var jwtfile = require("../jwt/jwt.js");
var fs = require('fs');
const ApplicationsModel = require("../models/application.js");
const FeedbackModel = require("../models/feedback.js");
const EmployeeModel = require("../models/employed.js");
var mailer = require("../nodemailer/mailer.js");
const JobsModel = require("../models/job.js");
const bcrypt = require("bcryptjs");
var sharp = require("sharp");

exports.Signup = (req, res, next) => {
      const organization = new OrganizationModel(req.body);
      if (organization.password.length < 8) {
            res.json({ "message": "Password Length Should be atleast 8" });
      } else {
            if (organization.username.split(" ").length > 1) {
                  res.json({ "message": "Username Should not Contain Space" });
            } else {
                  OrganizationModel.find({ username: organization.username }, function (err, docs) {
                        if (docs.length > 0) {
                              res.send({ "message": "Organization Name Already Exist" })
                        } else {
                              OrganizationModel.find({ email: organization.email }, function (err, docs) {
                                    if (docs.length > 0) {
                                          res.send({ "message": "Email Already Exist" });
                                    } else {
                                          organization.password = bcrypt.hashSync(organization.password, 10);
                                          organization.forgot_password_key = new Date().getTime();
                                          organization.save((err, data) => {
                                                if (!err) {
                                                      res.send({ "message": "success" });
                                                } else {
                                                      console.log(err);
                                                      res.send(err);
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
      const organization = new OrganizationModel({
            username: req.body["username"],
            password: req.body["password"]
      });
      OrganizationModel.find({ username: organization.username }, function (err, docs) {
            if (docs.length > 0) {
                  bcrypt.compare(organization.password, docs[0]["password"]).then(isEqual => {
                        if (isEqual == true) {
                              jwt.sign({ username: organization.username }, jwtfile.secretkey, (err, token) => {
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
                  console.log(docs);
                  res.send({ "User": "No User Exists" });
            }
      });
}



exports.View = (req, res, next) => {
      const organization = new OrganizationModel({
            username: req.query["username"]
      });
      jwt.verify(req.token, jwtfile.secretkey, (err, data) => {
            if (err) {
                  res.json({
                        "message": "You are logged Out",
                        "err": err
                  });
            } else {
                  OrganizationModel.find({ username: organization.username }, function (err, docs) {
                        if (docs.length > 0) {
                              res.json(docs);
                        } else {
                              res.status(404).json({ "message": "Failure" });
                        }
                  });
            }
      })
}


exports.View2 = (req, res, next) => {
      OrganizationModel.find({ username: req.body["username"] }, function (err, docs) {
            if (docs.length > 0) {
                  res.json(docs);
            } else {
                  res.status(404).json({ "message": "Failure" });
            }
      });

}












exports.Update = (req, res, next) => {
      const organization = new OrganizationModel(JSON.parse(req.body["org"]));
      organization.img_path = req.filename;
      organization.profile_completed_status = true;
      organization.approved = false;
      organization.blocked = false;
      jwt.verify(req.token, jwtfile.secretkey, (err, data) => {
            if (err) {
                  res.json({
                        "message": "You are logged Out",
                        "err": err
                  });
            } else {
                  if (organization.img_path) {
                        OrganizationModel.find({ username: organization.username }, function (err, docs) {
                              if (docs.length > 0) {
                                    if (docs[0]["img_path"] == null) {
                                          path = "assets/" + organization.img_path;
                                          path_resized = "assets/resized_" + organization.img_path;
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
                                          path = "assets/" + organization.img_path;
                                          path_resized = "assets/resized_" + organization.img_path;
                                          sharp(path).resize(225, 225).toFile(path_resized, function (err) {
                                                if (!err) {
                                                      fs.renameSync(path_resized, path);
                                                } else {
                                                      console.log(err);
                                                }
                                          });
                                    }
                              } else {
                                    res.send({ "message": "Failure" });
                              }
                        });
                        OrganizationModel.findOneAndUpdate({ username: organization.username },
                              { $set: { first_name: organization.first_name, last_name: organization.last_name, email_status: organization.email_status, phone: organization.phone, phone_status: organization.phone_status, country: organization.country, province: organization.province, city: organization.city, district: organization.district, address: organization.address, img_path: organization.img_path, approved: organization.approved, profile_completed_status: organization.profile_completed_status, creation_date: organization.creation_date, email: organization.email } },
                              { useFindAndModify: false }, function (err, docs) {
                                    if (docs) {
                                          res.send({ "message": "success" });
                                    } else {
                                          res.send({ "message": "failure" });
                                    }
                              });
                  } else {
                        OrganizationModel.findOneAndUpdate({ username: recipient.username },
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






exports.AddCourse = (req, res, next) => {
      const organization = new OrganizationModel(JSON.parse(req.body["org"]));
      const newcourse = JSON.parse(req.body["course"]);
      jwt.verify(req.token, jwtfile.secretkey, (err, data) => {
            if (err) {
                  res.json({
                        "message": "You are logged Out",
                        "err": err
                  });
            } else {
                  OrganizationModel.find({ username: organization.username }, (err, docs) => {
                        if (docs) {
                              var courses = docs[0]["courses"];
                              flag = true;
                              courses.forEach(course => {
                                    if (newcourse.name == course.name) {
                                          flag = false;
                                    }
                              });
                              if (flag) {
                                    OrganizationModel.findOneAndUpdate({ username: organization.username },
                                          { $set: { courses: organization.courses } },
                                          { useFindAndModify: false }, function (err, docs) {
                                                if (docs) {
                                                      res.send({ "message": "success" });
                                                } else {
                                                      res.send({ "message": "failure" });
                                                }
                                          });
                              } else {
                                    res.json({ "message": "Course Name Already Exists" });
                              }
                        } else {
                              res.send({ "message": "failure" });
                        }
                  })

            }
      })
}


exports.SaveDesign = (req, res, next) => {
      const organization = new OrganizationModel(req.body);
      organization.json_Canva = JSON.stringify(organization.json_Canva);
      jwt.verify(req.token, jwtfile.secretkey, (err, data) => {
            if (err) {
                  res.json({
                        "message": "You are logged Out",
                        "err": err
                  });
            } else {
                  OrganizationModel.findOneAndUpdate(
                        { username: organization.username },
                        { $set: { json_Canva: organization.json_Canva } },
                        { useFindAndModify: false },
                        function (err, docs) {
                              if (docs) {
                                    res.send({ "message": "success" });
                              } else {
                                    res.send({ "message": err });
                              }
                        }
                  )
            }
      })
}


























exports.IssueCertificate = (req, res, next) => {
      const certificate = new CertificateModel(req.body);
      jwt.verify(req.token, jwtfile.secretkey, (err, data) => {
            if (err) {
                  res.json({
                        "message": "You are logged Out",
                        "err": err
                  });
            } else {
                  RecipientModel.find({ username: certificate.reciever }, (err, docs) => {
                        if (docs.length == 1) {
                              if (docs[0]["profile_completed_status"] == true) {
                                    if (certificate.reciever_cnic == docs[0]["cnic"]) {
                                          CertificateModel.find({ reciever: certificate.reciever, course: certificate.course, sender: certificate.sender }, (err, docs) => {
                                                if (docs.length > 0) {
                                                      res.json({ "message": "Course Already Issued to Recipient by This Organization" })
                                                } else {
                                                      CertificateModel.find({}, (err, docs) => {
                                                            if (docs) {
                                                                  // var certificate_number = docs.length + 1;
                                                                  // certificate.certificate_no = "Certificate-" + certificate_number;
                                                                  certificate.save((err, docs) => {
                                                                        if (docs) {
                                                                              res.json({ "message": "success", "certificate": certificate });
                                                                        } else {
                                                                              res.json({ "message": err });
                                                                        }
                                                                  });
                                                            }
                                                      });
                                                }
                                          });
                                    } else {
                                          res.json({ "message": "CNIC not Matched" });
                                    }
                              } else {
                                    res.json({ "message": "Recipient Profile Not Completed Yet" });
                              }
                        } else {
                              res.json({ "message": "Username Does not Exist" });
                        }

                  })

            }
      })
}






exports.AwardedCertificates = (req, res, next) => {
      const organization = new OrganizationModel({
            username: req.query["username"]
      });
      jwt.verify(req.token, jwtfile.secretkey, (err, data) => {
            if (err) {
                  res.json({
                        "message": "You are logged Out",
                        "err": err
                  });
            } else {
                  CertificateModel.find({ sender: organization.username }, function (err, docs) {
                        if (docs) {
                              res.json(docs);
                        } else {
                              res.status(404).json({ "message": "Failure" });
                        }
                  });
            }
      })
}





exports.UpdateCourses = (req, res, next) => {
      const organization = new OrganizationModel({
            username: req.query["username"]
      });
      new_courses = req.body;
      jwt.verify(req.token, jwtfile.secretkey, (err, data) => {
            if (err) {
                  res.json({
                        "message": "You are logged Out",
                        "err": err
                  });
            } else {
                  OrganizationModel.findOneAndUpdate({ username: organization.username },
                        { $set: { courses: new_courses } },
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





exports.DeleteCourse = (req, res, next) => {
      const organization = new OrganizationModel({
            username: req.query["username"]
      });
      course_name = req.body["course_name"];
      jwt.verify(req.token, jwtfile.secretkey, (err, data) => {
            if (err) {
                  res.json({
                        "message": "You are logged Out",
                        "err": err
                  });
            } else {
                  OrganizationModel.find({ username: organization.username }, function (err, docs) {
                        if (docs) {
                              new_courses = docs[0]["courses"];
                              for (var i = 0; i < new_courses.length; i++) {
                                    if (new_courses[i]["name"] == course_name) {
                                          new_courses.remove(new_courses[i]);
                                          break;
                                    }
                              }
                              OrganizationModel.findOneAndUpdate({ username: organization.username },
                                    { $set: { courses: new_courses } },
                                    { useFindAndModify: false }, function (err, docs) {
                                          if (docs) {
                                                res.send({ "message": "success" });
                                          } else {
                                                res.send({ "message": "failure", "err": err });
                                          }
                                    });
                        } else {
                              res.send({ "message": "failure" });
                        }
                  })

            }
      })
}












exports.getRecipients = (req, res, next) => {
      const organization = new OrganizationModel({
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
                              res.json({ "docs": docs, "message": "success" });
                        } else {
                              res.json({ 'message': "failure" });
                        }
                  })
            }
      })
}







exports.changePassword = (req, res, next) => {
      const organization = new OrganizationModel({
            username: req.query["username"]
      });
      jwt.verify(req.token, jwtfile.secretkey, (err, data) => {
            if (err) {
                  res.json({
                        "message": "You are logged Out",
                        "err": err
                  });
            } else {
                  OrganizationModel.find({ username: organization.username }, (err, docs) => {
                        if (docs) {
                              old_password = req.body['old_password'];
                              new_password = req.body["new_password"];
                              bcrypt.compare(old_password, docs[0]["password"]).then(isEqual => {
                                    if (isEqual == true) {
                                          OrganizationModel.findOneAndUpdate({ username: organization.username },
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
      const organization = new OrganizationModel({
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
                  feedback.provider = organization.username;
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




exports.PostJob = (req, res, next) => {
      const organization = new OrganizationModel({
            username: req.query["username"]
      });
      const job = new JobsModel(req.body);
      jwt.verify(req.token, jwtfile.secretkey, (err, data) => {
            if (err) {
                  res.json({
                        "message": "You are logged Out",
                        "err": err
                  });
            } else {
                  job.user = organization.username;
                  job.date = "" + new Date();
                  job.retract_job = false;
                  job.save((err, docs) => {
                        if (docs) {
                              res.json({ "message": "success" });
                        } else {
                              res.json({ "message": "failure" });
                        }
                  })
            }
      })
}







exports.GetOrganizationJob = (req, res, next) => {
      const organization = new OrganizationModel({
            username: req.query["username"]
      });
      jwt.verify(req.token, jwtfile.secretkey, (err, data) => {
            if (err) {
                  res.json({
                        "message": "You are logged Out",
                        "err": err
                  });
            } else {
                  JobsModel.find({ user: organization.username }, (err, docs) => {
                        if (docs) {
                              res.json({ "message": "success", "docs": docs });
                        } else {
                              res.json({ "message": "failure" });
                        }
                  })
            }
      })
}



exports.GetOrganizationJob2 = (req, res, next) => {
      JobsModel.find({ user: req.body["username"] }, (err, docs) => {
            if (docs) {
                  res.json({ "message": "success", "docs": docs });
            } else {
                  res.json({ "message": "failure" });
            }
      })

}




exports.GetJob = (req, res, next) => {
      const organization = new OrganizationModel({
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
                              res.json({ "message": "faliure" });
                        }
                  })
            }
      })
}

exports.RetractJob = (req, res, next) => {
      const organization = new OrganizationModel({
            username: req.query["username"]
      });
      jwt.verify(req.token, jwtfile.secretkey, (err, data) => {
            if (err) {
                  res.json({
                        "message": "You are logged Out",
                        "err": err
                  });
            } else {
                  JobsModel.findByIdAndUpdate(req.body["job_id"], { $set: { retract_job: true } },
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

exports.UnRetractJob = (req, res, next) => {
      const organization = new OrganizationModel({
            username: req.query["username"]
      });
      jwt.verify(req.token, jwtfile.secretkey, (err, data) => {
            if (err) {
                  res.json({
                        "message": "You are logged Out",
                        "err": err
                  });
            } else {
                  JobsModel.findByIdAndUpdate(req.body["job_id"], { $set: { retract_job: false } },
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


exports.UpdateJob = (req, res, next) => {
      const organization = new OrganizationModel({
            username: req.query["username"]
      });
      const job = new JobsModel(req.body);
      jwt.verify(req.token, jwtfile.secretkey, (err, data) => {
            if (err) {
                  res.json({
                        "message": "You are logged Out",
                        "err": err
                  });
            } else {
                  JobsModel.findByIdAndUpdate(job._id, { $set: { title: job.title, designation: job.designation, salary: job.salary, vacancies: job.vacancies, description: job.description, field: job.field, location: job.location, job_type: job.job_type } },
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




exports.ApplicationsOnJob = (req, res, next) => {
      const organization = new OrganizationModel({
            username: req.query["username"]
      });
      var application_count;
      jwt.verify(req.token, jwtfile.secretkey, (err, data) => {
            if (err) {
                  res.json({
                        "message": "You are logged Out",
                        "err": err
                  });
            } else {
                  ApplicationsModel.find({ job: req.body["job_id"] }, (err, docs) => {
                        if (docs) {
                              application_count = docs.length;
                              ApplicationsModel.find({ job: req.body["job_id"] }, (err, docs) => {
                                    if (docs) {
                                          res.json({ "message": "success", "docs": docs, "application_count": application_count })
                                    } else {
                                          res.json({ "message": "failure" });
                                    }
                              });
                        } else {
                              res.json({ "message": "failure" });
                        }
                  });
            }
      })
}




exports.RejectApplication = (req, res, next) => {
      const organization = new OrganizationModel({
            username: req.query["username"]
      });
      jwt.verify(req.token, jwtfile.secretkey, (err, data) => {
            if (err) {
                  res.json({
                        "message": "You are logged Out",
                        "err": err
                  });
            } else {
                  ApplicationsModel.findOneAndUpdate({ recipient: req.body["username"], job: req.body["job_id"] }, { $set: { application_status: "Rejected" } },
                        { useFindAndModify: false }, (err, docs) => {
                              if (docs) {
                                    ApplicationsModel.find({ job: req.body["job_id"] }, (err, docs) => {
                                          if (docs) {
                                                res.json({ "message": "success", "docs": docs });
                                          } else {
                                                res.json({ "message": "failure" });
                                          }
                                    })
                              } else {
                                    res.json({ "message": "failure" })
                              }
                        });
            }
      });
}





exports.GetCertificateCounter = (req, res, next) => {
      jwt.verify(req.token, jwtfile.secretkey, (err, data) => {
            if (err) {
                  res.json({
                        "message": "You are logged Out",
                        "err": err
                  });
            } else {
                  RecipientModel.find({ username: req.body["username"], cnic: req.body["cnic"] }, (err, docs) => {
                        if (docs.length > 0) {
                              CertificateModel.find({}, (err, docs) => {
                                    if (docs) {
                                          var certificate_number = docs.length + 1;
                                          certificate_number = "Certificate-" + certificate_number;
                                          res.json({ "docs": certificate_number, "message": "success" });
                                    } else {
                                          res.json({ 'message': "failure" });
                                    }
                              });
                        } else {
                              res.json({ "message": "failure", "mes": "Wrong Recipient username or CNIC" });
                        }
                  })
            }
      })
}




exports.CreateChat = (req, res, next) => {
      jwt.verify(req.token, jwtfile.secretkey, (err, data) => {
            if (err) {
                  res.json({
                        "message": "You are logged Out",
                        "err": err
                  });
            } else {
                  const chat = new ChatModel(req.body["chat"]);
                  RecipientModel.find({ username: chat.recipient }, (err, docs) => {
                        if (docs) {
                              chat.rec_img_path = docs[0]['img_path'];
                              OrganizationModel.find({ username: chat.organization }, (err, docs) => {
                                    if (docs) {
                                          chat.org_img_path = docs[0]['img_path'];
                                          ChatModel.find({ recipient: chat.recipient, organization: chat.organization }, (err, docs) => {
                                                if (docs.length > 0) {
                                                      res.send({ "message": "fail", "detail": "present", "id": docs[0]["_id"] });
                                                } else {
                                                      chat.save((err, data) => {
                                                            if (!err) {
                                                                  ChatModel.find({ recipient: chat.recipient, organization: chat.organization }, (err, docs) => {
                                                                        if (docs) {
                                                                              res.send({ "message": "success", "id": docs[0]["_id"] });
                                                                        } else {
                                                                              res.send(err);
                                                                        }
                                                                  })
                                                            } else {
                                                                  res.send(err);
                                                            }
                                                      });
                                                }
                                          })
                                    } else {
                                          res.send({ "message": err });
                                    }
                              })
                        } else {
                              res.send({ "message": err });
                        }
                  })
            }
      })
}

exports.getChats = (req, res, next) => {
      const organization = new OrganizationModel({
            username: req.query["username"]
      });
      jwt.verify(req.token, jwtfile.secretkey, (err, data) => {
            if (err) {
                  res.json({
                        "message": "You are logged Out",
                        "err": err
                  });
            } else {
                  ChatModel.find({ organization: organization.username }, (err, docs) => {
                        if (docs) {
                              res.json({ "message": "success", "docs": docs });
                        } else {
                              res.json({ "message": "failure" });
                        }
                  })
            }
      })
}



exports.SendHireRequest = (req, res, next) => {
      const organization = new OrganizationModel({
            username: req.query["username"]
      });
      const hireRequest = new HireRequestModel(req.body["hireRequest"]);
      hireRequest.date = Date.now();
      jwt.verify(req.token, jwtfile.secretkey, (err, data) => {
            if (err) {
                  res.json({
                        "message": "You are logged Out",
                        "err": err
                  });
            } else {
                  HireRequestModel.find({ to: hireRequest.to, from: hireRequest.from }, (err, docs) => {
                        if (docs.length > 0) {
                              res.send({ "message": "present" })
                        }
                        else {
                              hireRequest.save((err, docs) => {
                                    if (docs) {
                                          res.send({ "message": "success" });
                                    } else {
                                          res.send({ "message": "failure", "err": err });
                                    }
                              });
                        }
                  })
            }
      })
}

exports.GetHireRequests = (req, res, next) => {
      const organization = new OrganizationModel({
            username: req.query["username"]
      });
      jwt.verify(req.token, jwtfile.secretkey, (err, data) => {
            if (err) {
                  res.json({
                        "message": "You are logged Out",
                        "err": err
                  });
            } else {
                  HireRequestModel.find({ from: organization.username }, (err, docs) => {
                        if (docs) {
                              res.json({ "message": "success", "docs": docs });
                        } else {
                              res.json({ "message": "failure" });
                        }
                  })
            }
      })
}




exports.getEmployees = (req, res, next) => {
      const organization = new OrganizationModel({
            username: req.query["username"]
      });
      jwt.verify(req.token, jwtfile.secretkey, (err, data) => {
            if (err) {
                  res.json({
                        "message": "You are logged Out",
                        "err": err
                  });
            } else {
                  EmployeeModel.find({ org: organization.username }, (err, docs) => {
                        if (docs) {
                              res.json({ "message": "success", "docs": docs });
                        } else {
                              res.json({ "message": "failure" });
                        }
                  })
            }
      })
}



exports.getChatByID = (req, res, next) => {
      const organization = new OrganizationModel({
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