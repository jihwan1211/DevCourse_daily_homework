exports.postJoin = (req, res, next) => {
  res.status(200).json({ message: "postJoin!" });
};
exports.postLogin = (req, res, next) => {
  res.status(200).json({ message: "postLogin" });
};
exports.postReset = (req, res, next) => {
  res.status(200).json({ message: "postReset!" });
};
exports.putReset = (req, res, next) => {
  res.status(200).json({ message: "putReset!" });
};
