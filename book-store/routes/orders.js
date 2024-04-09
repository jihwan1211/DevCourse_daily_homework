const express = require("express");
const router = express.Router();
const handler = require("../handlers/orders");

router.post("/", handler.postOrder);
router.get("/", handler.getOrderList);
router.get("/:orderId", handler.getOrderInfo);

exports.router = router;
