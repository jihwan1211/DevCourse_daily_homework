const express = require("express");
const router = express.Router();
const handler = require("../handlers/users");

router.post("/join", handler.postJoin);
router.post("/login", handler.postLogin);

// password reset
router.post("/reset", handler.postReset);
router.put("/reset", handler.putReset);

exports.router = router;
