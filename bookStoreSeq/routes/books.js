const express = require("express");
const router = express.Router();
const handler = require("../handlers/books");

router.get("/:bookId", handler.getBook);
router.get("/", handler.checkHandler);
// router.get("/", handler.getBooksByCategory);
// router.get("/", handler.getBooks);

exports.router = router;
