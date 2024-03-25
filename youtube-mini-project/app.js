const express = require("express");

const app = express();

const membersRoutes = require("./Routes/membersRoutes");
const channelsRoutes = require("./Routes/channelsRoutes");

app.listen(8888);

app.use(express.json());

app.use("/members", membersRoutes.router);
app.use("/channels", channelsRoutes.router);
