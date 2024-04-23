const checkTokens = (req, res, next) => {
  if (!req.headers.authorization || !req.headers.refresh) req.skipAuthJWT = true;
  else req.skipAuthJWT = false;
  next();
};

module.exports = checkTokens;
