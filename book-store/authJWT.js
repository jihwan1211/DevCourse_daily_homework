const jwtUtills = require("./jwt-utils");
const jwt = require("jsonwebtoken");

const authJWT = async (req, res, next) => {
  if (!req.headers.authorization || !req.headers.refresh) return res.status(400).json({ message: "no token" });

  const accessToken = req.headers["authorization"];
  const result = jwtUtills.verify(req); // token을 검증합니다.
  console.log("token이 만료되면?", result);
  if (result.ok) {
    // token이 검증되었으면 req에 값을 세팅하고, 다음 콜백함수로 갑니다.
    // 이 부분은 손 봐야지
    req.id = result.id;
    next();
  } else {
    // 검증에 실패하거나 토큰이 만료되었다면 클라이언트에게 메세지를 담아서 응답합니다.
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
    next();
  }
};

module.exports = authJWT;
