exports.getAdmin = (req, res, next) => {
  res.send("hello express!");
};

exports.postAdmin = (req, res, next) => {
  const body = req.body;
  const { message } = req.body;
  console.log(body);
  console.log(message);

  res.json(req.body);
};
