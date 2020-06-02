const express = require("express");
const multer = require('multer');
var jwtfile = require("../jwt/jwt.js");

const recipientController = require("../controllers/recipient.js");
const router = express.Router();

var storage = multer.diskStorage({
      destination: function (req, file, cb) {
            cb(null, 'assets')
      },
      filename: function (req, file, cb) {
            var filename = Date.now() + '-' + file.originalname;
            req.filename = filename;
            cb(null, filename);
      }
})
var upload = multer({ storage: storage });


router.post("/signup", recipientController.Signup);
router.post("/signin", recipientController.Signin);
router.get("/view", jwtfile.verifyToken, recipientController.View)
router.post("/view", recipientController.View2);
router.post("/update", jwtfile.verifyToken, upload.single('file'), recipientController.Update);
router.get("/viewEmployers", jwtfile.verifyToken, recipientController.viewEmployers);
router.get("/getRecipientCertificates", jwtfile.verifyToken, recipientController.getRecipientCertificates);
router.post("/getRecipientCertificates", recipientController.getRecipientCertificates2);
router.post("/get_certificate", jwtfile.verifyToken, recipientController.getCertificate);
router.post("/change_password", jwtfile.verifyToken, recipientController.changePassword);
router.post("/feedback", jwtfile.verifyToken, recipientController.Feedback);
router.get("/jobs", jwtfile.verifyToken, recipientController.GetJobs);
router.post("/get_job", jwtfile.verifyToken, recipientController.GetJob);
router.post("/get_org", jwtfile.verifyToken, recipientController.GetOrganizationDetail);
router.post("/application_on_job", jwtfile.verifyToken, recipientController.ApplicationOnJob);
router.get("/applications_by_recipient", jwtfile.verifyToken, recipientController.ApplicationOfRecipient);
router.post("/delete_application", jwtfile.verifyToken, recipientController.DeleteApplication);
router.get("/getChats", jwtfile.verifyToken, recipientController.getChats);
router.get("/getHireRequests", jwtfile.verifyToken, recipientController.getHireRequests);
router.post("/acceptOffer", jwtfile.verifyToken, recipientController.acceptOffer);
router.post("/rejectOffer", jwtfile.verifyToken, recipientController.rejectOffer);
router.post("/getChat", jwtfile.verifyToken, recipientController.getChatByID);


exports.routes = router;