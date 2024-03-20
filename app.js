const express = require("express");

const app = express();

const adminRoutes = require("./adminRoutes");

app.listen("8888");

// 왜 json으로 설정을 해줘야하나? req로 날아오는 body값을 json으로 읽을 수 있음
app.use(express.json());

app.use("/", adminRoutes.router);
