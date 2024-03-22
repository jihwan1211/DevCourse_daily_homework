const express = require("express");
const router = express.Router();

const membersHandlers = require("../Controllers/membersHandlers");

router.post("/login", membersHandlers.postLogin);
router.post("/join", membersHandlers.postJoin);
router.get("/users/:id", membersHandlers.getUser);
router.delete("/users/:id", membersHandlers.deleteUser);

exports.router = router;
