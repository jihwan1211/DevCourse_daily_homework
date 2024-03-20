const express = require("express");

const router = express.Router();

const adminHandlers = require("./adminHandlers");

router.get("/", adminHandlers.getAdmin);
router.post("/", adminHandlers.postAdmin);

router.get("/youtubers/:id", adminHandlers.getYoutuber);
router.get("/youtubers", adminHandlers.getYoutubers);
router.post("/youtubers", adminHandlers.postYoutuber);

exports.router = router;
