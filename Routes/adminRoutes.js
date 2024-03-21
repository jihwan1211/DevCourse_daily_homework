const express = require("express");

const router = express.Router();

const adminHandlers = require("../Controllers/adminHandlers");

router.get("/", adminHandlers.getAdmin);
router.post("/", adminHandlers.postAdmin);

exports.router = router;
