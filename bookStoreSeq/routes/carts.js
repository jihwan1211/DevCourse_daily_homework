const express = require("express");
const router = express.Router();
const handler = require("../handlers/carts");

router.get("/selected", handler.getSelectedCart);
router.delete("/:bookId", handler.deleteCart);
router.post("/", handler.postAddCart);
router.get("/", handler.getCarts);

exports.router = router;
