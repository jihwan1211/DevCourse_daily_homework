const jwt = require("jsonwebtoken");
const redisClient = require("./redis");
const dotenv = require("dotenv");
const { promisify } = require("util");
dotenv.config();

exports.signIn = ({ id, email }) => {
  console.log("sign in 시도");
  const token = jwt.sign({ id: id, email: email }, process.env.PRIVATE_KEY, { expiresIn: "30m", issuer: "kimchi" });
  return token;
};

exports.verify = (req) => {
  const token = req.headers["authorization"];
  try {
    const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
    return {
      ...decoded,
      ok: true,
    };
  } catch (err) {
    return {
      ok: false,
      message: err.message,
    };
  }
};

exports.refresh = (user) => {
  const token = jwt.sign({}, process.env.PRIVATE_KEY, { expiresIn: "14d", issuer: "kimchi" });
  return token;
};

exports.refreshVerify = async (token, userId) => {
  /* redis 모듈은 기본적으로 promise를 반환하지 않으므로,
       promisify를 이용하여 promise를 반환하게 해줍니다.*/
  const getAsync = promisify(redisClient.get).bind(redisClient);

  try {
    const data = await getAsync(userId); // refresh token 가져오기
    if (token === data) {
      try {
        jwt.verify(token, process.env.PRIVATE_KEY);
        return true;
      } catch (err) {
        return false;
      }
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
};
