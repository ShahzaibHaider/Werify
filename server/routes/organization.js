const express = require("express");
const multer = require('multer');
var jwtfile = require("../jwt/jwt.js");

const OrganizationController = require("../controllers/organization.js");
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
});
var upload = multer({ storage: storage });




router.post("/signup", OrganizationController.Signup);
router.post("/signin", OrganizationController.Signin);
router.get("/view", jwtfile.verifyToken, OrganizationController.View);
router.post("/view", OrganizationController.View2);
router.post("/update", jwtfile.verifyToken, upload.single('file'), OrganizationController.Update)
router.post("/add_course", jwtfile.verifyToken, upload.single('file'), OrganizationController.AddCourse)
router.post("/save_design", jwtfile.verifyToken, OrganizationController.SaveDesign);
router.post("/issue_certificate", jwtfile.verifyToken, OrganizationController.IssueCertificate);
router.get("/awarded_certificates", jwtfile.verifyToken, OrganizationController.AwardedCertificates);
router.post("/update_courses", jwtfile.verifyToken, OrganizationController.UpdateCourses);
router.post("/delete_course", jwtfile.verifyToken, OrganizationController.DeleteCourse);
router.get("/getRecipients", jwtfile.verifyToken, OrganizationController.getRecipients);
router.post("/change_password", jwtfile.verifyToken, OrganizationController.changePassword);
router.post("/feedback", jwtfile.verifyToken, OrganizationController.Feedback);
router.post("/post_job", jwtfile.verifyToken, OrganizationController.PostJob);
router.get("/get_organization_jobs", jwtfile.verifyToken, OrganizationController.GetOrganizationJob);
router.post("/get_organization_jobs", OrganizationController.GetOrganizationJob2);
router.post("/get_job", jwtfile.verifyToken, OrganizationController.GetJob);
router.post("/retract_job", jwtfile.verifyToken, OrganizationController.RetractJob);
router.post("/unretract_job", jwtfile.verifyToken, OrganizationController.UnRetractJob);
router.post("/update_job", jwtfile.verifyToken, OrganizationController.UpdateJob);
router.post("/applications_on_job", jwtfile.verifyToken, OrganizationController.ApplicationsOnJob);
router.post("/reject_application", jwtfile.verifyToken, OrganizationController.RejectApplication);
router.post("/get_certificate_counter", jwtfile.verifyToken, OrganizationController.GetCertificateCounter);
router.post("/createChat", jwtfile.verifyToken, OrganizationController.CreateChat);
router.get("/getChats", jwtfile.verifyToken, OrganizationController.getChats);
router.post("/sendHireRequest", jwtfile.verifyToken, OrganizationController.SendHireRequest);
router.get("/getHireRequests", jwtfile.verifyToken, OrganizationController.GetHireRequests);
router.get("/getEmployees", jwtfile.verifyToken, OrganizationController.getEmployees);
router.post("/getChat", jwtfile.verifyToken, OrganizationController.getChatByID);
exports.routes = router;