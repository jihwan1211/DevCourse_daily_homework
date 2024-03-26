const express = require("express");
const router = express.Router();

const membersHandlers = require("../Controllers/members");

router.post("/login", membersHandlers.postLogin);
router.post("/join", membersHandlers.postJoin);
router.get("/users", membersHandlers.getUser);
router.delete("/users", membersHandlers.deleteUser);

exports.router = router;
