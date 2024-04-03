let jwt = require("jsonwebtoken");
let dotenv = require("dotenv");
dotenv.config();
// 서명 = 토큰 발행
let token = jwt.sign({ foo: "bar" }, process.env.PRIVATE_KEY);
console.log(token);

// 토큰 검증
// verify a token symmetric
let decoded = jwt.verify(token, process.env.PRIVATE_KEY, function (err, decoded) {
  console.log(decoded.foo); // bar
  console.log(decoded);
});
