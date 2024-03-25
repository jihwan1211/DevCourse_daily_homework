const express = require("express");

const router = express();

router.get("/1", (req, res, next) => {
  res.send("<h1>one!</h1>");
});

router.get("/", (req, res, next) => {
  res.send("<h1>TEST Success</h1>");
});

module.exports = router;
