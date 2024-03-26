const express = require("express");

const app = express();

const membersRoutes = require("./Routes/members");
const channelsRoutes = require("./Routes/channels");

app.listen(8888);

app.use(express.json());

app.use("/members", membersRoutes.router);
app.use("/channels", channelsRoutes.router);
