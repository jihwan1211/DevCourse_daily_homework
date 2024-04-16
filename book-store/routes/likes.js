const express = require("express");
const router = express.Router();
const handler = require("../handlers/likes");

router.post("/:bookId", handler.addLike);
router.delete("/:bookId", handler.deleteLike);

exports.router = router;
