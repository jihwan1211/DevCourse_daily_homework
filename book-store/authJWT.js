const jwtUtills = require("./jwt-utils");
const jwt = require("jsonwebtoken");

const authJWT = async (req, res, next) => {
  if (req.skipAuthJWT) return next();
  if (!req.headers.authorization || !req.headers.refresh) return res.status(400).json({ message: "no token" });

  const accessToken = req.headers["authorization"];
  const result = jwtUtills.verify(req); // token 검증

  if (result.ok) {
    req.id = result.id;
    return next();
  } else {
    // 검증 실패 시 1. refresh token 확인
    const refreshToken = req.headers.refresh;

    const decodedAccessToken = jwt.decode(accessToken, process.env.PRIVATE_KEY);

    const isValidRefreshToken = await jwtUtills.refreshVerify(refreshToken, decodedAccessToken.id);

    // refresh token 만료? -> 다시 로그인
    if (!isValidRefreshToken) return res.status(400).json({ message: "다시 로그인하세요" });

    const newAccessToken = jwtUtills.signIn({ id: decodedAccessToken.id, email: decodedAccessToken.email });
    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
    });
    req.id = decodedAccessToken.id;
    return next();
  }
};

module.exports = authJWT;
