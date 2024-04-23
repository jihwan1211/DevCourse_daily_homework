const express = require("express");
const router = express.Router();
const handler = require("../handlers/books");
const authJWT = require("../authJWT");
const checkTokens = require("../checkTokens");

router.get("/:bookId", checkTokens, authJWT, handler.getBook);
router.get("/", handler.checkHandler);

exports.router = router;
