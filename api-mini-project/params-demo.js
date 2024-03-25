const express = require("express");

const app = express();

// /products/ 뒤에 오는 값을 n이라는 변수에 담아줘
app.get("/products/:n", (req, res, next) => {
  const book = {
    title: "nodejs",
    price: 20000,
    num: n,
    description: "soooooooooo good!",
  };
  res.json(book);
});

app.listen("8888");
