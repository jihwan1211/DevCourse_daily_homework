const express = require("express");
const router = express.Router();
const handler = require("../handlers/category");

router.get("/", handler.getCategory);

exports.router = router;
