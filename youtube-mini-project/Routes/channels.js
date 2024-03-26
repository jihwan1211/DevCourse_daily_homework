const express = require("express");
const router = express.Router();

const channelsHandlers = require("../Controllers/channels");

router.get("/:id", channelsHandlers.getChannel);
router.put("/:id", channelsHandlers.putChannel);
router.delete("/:id", channelsHandlers.deleteChannel);
router.get("/", channelsHandlers.getChannels);
router.post("/", channelsHandlers.postChannel);

exports.router = router;
