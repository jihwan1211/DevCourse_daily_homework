const express = require("express");

const router = express.Router();

const fruitsHandler = require("../Controllers/fruitsHandlers");

router.get("/", fruitsHandler.getFruits);
router.get("/:id", fruitsHandler.getFruit);

exports.router = router;
