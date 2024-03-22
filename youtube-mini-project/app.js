const express = require("express");

const app = express();

const membersRoutes = require("./Routes/membersRoutes");

app.listen(8888);

app.use(express.json());

app.use("/members", membersRoutes.router);
