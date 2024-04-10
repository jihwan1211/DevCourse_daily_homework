const express = require("express");
const dotenv = require("dotenv");

const usersRoutes = require("./routes/users");
const booksRoutes = require("./routes/books");
const likesRoutes = require("./routes/likes");
const cartsRoutes = require("./routes/carts");
const ordersRoutes = require("./routes/orders");

const app = express();
dotenv.config();

app.listen(process.env.PORT_NUM);
app.use(express.json());
app.use("/users", usersRoutes.router);
app.use("/books", booksRoutes.router);
app.use("/likes", likesRoutes.router);
app.use("/carts", cartsRoutes.router);
app.use("/orders", ordersRoutes.router);
