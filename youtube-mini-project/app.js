const express = require("express");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

const membersRoutes = require("./Routes/members");
const channelsRoutes = require("./Routes/channels");

app.listen(process.env.PORT);

app.use(express.json());

app.use("/members", membersRoutes.router);
app.use("/channels", channelsRoutes.router);
