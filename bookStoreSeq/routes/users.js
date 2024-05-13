const express = require("express");
const router = express.Router();
const handler = require("../handlers/users");

router.post("/join", handler.join);
router.post("/login", handler.login);

// password reset
router.post("/reset", handler.passwordResetRequest);
router.put("/reset", handler.passwordReset);

exports.router = router;
