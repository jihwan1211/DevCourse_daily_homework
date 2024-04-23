const express = require("express");
const router = express.Router();
const handler = require("../handlers/carts");

router.delete("/:cartId", handler.deleteCart);
router.post("/", handler.addCart);
router.get("/", handler.getCarts);

exports.router = router;
