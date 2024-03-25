const express = require("express");

const router = express.Router();

const youtuberHandlers = require("../Controllers/youtuberHandlers");

router.get("/:id", youtuberHandlers.getYoutuber);
router.delete("/:id", youtuberHandlers.deleteYoutuber);
router.put("/:id", youtuberHandlers.putYoutuber);

router.get("/", youtuberHandlers.getYoutubers);
router.post("/", youtuberHandlers.postYoutuber);
router.delete("/", youtuberHandlers.deleteYoutubers);

exports.router = router;
