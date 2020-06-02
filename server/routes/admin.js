const express = require("express");
var jwtfile = require("../jwt/jwt.js");
// jwtfile.verifyToken
const router = express.Router();

const AdminController = require("../controllers/admin.js");

router.post("/signup", AdminController.Signup);
router.post("/signin", AdminController.Login);
router.post("/set_new_password", AdminController.SetNewPassword);
router.get("/get_stats", jwtfile.verifyToken, AdminController.GetStatistics);
router.get("/get_feedbacks", jwtfile.verifyToken, AdminController.GetFeedbacks);
router.get("/get_requests", jwtfile.verifyToken, AdminController.GetRequests);
router.get("/get_organizations", jwtfile.verifyToken, AdminController.GetOrganizations);
router.get("/get_recipients", jwtfile.verifyToken, AdminController.GetRecipients);
router.get("/get_certificates", jwtfile.verifyToken, AdminController.GetCertificates);
router.post("/approve_request", jwtfile.verifyToken, AdminController.ApproveOrganization);
// router.post("/reject_request",jwtfile.verifyToken, AdminController.RejectOrganization);
// router.post("/sendFeedbackReply", jwtfile.verifyToken,AdminController.SendFeedbackReply);

exports.routes = router;