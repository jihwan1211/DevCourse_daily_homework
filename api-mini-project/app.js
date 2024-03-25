const express = require("express");

const app = express();

const adminRoutes = require("./Routes/adminRoutes");
const youtuberRoutes = require("./Routes/youtuberRoutes");
const fruitsRoutes = require("./Routes/fruitsRoutes");

app.listen("8888");

// 왜 json으로 설정을 해줘야하나? req로 날아오는 body값을 json으로 읽을 수 있음
app.use(express.json());

app.use("/youtubers", youtuberRoutes.router);
app.use("/fruits", fruitsRoutes.router);
app.use("/", adminRoutes.router);
