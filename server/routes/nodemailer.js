const express = require("express");

const router = express.Router();

const mailer = require("../nodemailer/mailer.js");

router.post("/verify_email", mailer.SendEmail);
router.post("/forgot_password", mailer.SendLinkOnEmail);
router.post("/reply", mailer.Reply);

exports.routes = router;