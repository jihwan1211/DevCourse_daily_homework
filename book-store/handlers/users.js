const dbPool = require("../mariadb");
const { StatusCodes } = require("http-status-codes");
const { body, param, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const crypto = require("crypto");

dotenv.config();

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(StatusCodes.BAD_REQUEST).json({ message: errors.array() });
  next();
};

const makeCrypPwd = (password) => {
  const salt = crypto.randomBytes(64).toString("base64");
  const hasedPwd = crypto.pbkdf2Sync(password, salt, 10000, 10, "sha512").toString("base64");
  return { hasedPwd, salt };
};
exports.join = [
  body("email").notEmpty().isEmail().withMessage("이메일 혹은 비밀번호를 입력하세요"),
  body("password").notEmpty().isString().withMessage("이메일 혹은 비밀번호를 입력하세요"),
  validateRequest,
  async (req, res, next) => {
    const { email, password } = req.body;
    const { salt, hasedPwd } = makeCrypPwd(password);
    const sql = `INSERT INTO users (email, password, salt) VALUES (?, ?, ?)`;
    const params = [email, hasedPwd, salt];
    try {
      const [response] = await dbPool.execute(sql, params);
      if (response.affectedRows) return res.status(StatusCodes.CREATED).json({ message: `${email}님, 환영합니다.` });
      else throw new Error(`회원가입 실패 failed`);
    } catch (err) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
    }
  },
];

function createToken(response) {
  const token = jwt.sign({ email: response.email }, process.env.PRIVATE_KEY, { expiresIn: "5m", issuer: "kimchi" });
  return token;
}

const checkPwdMatched = (userPassword, inputPassword, salt) => {
  const hasedPwd = crypto.pbkdf2Sync(inputPassword, salt, 10000, 10, "sha512").toString("base64");
  return userPassword === hasedPwd;
};

exports.login = [
  body("email").notEmpty().isEmail().withMessage("이메일 혹은 비밀번호를 입력하세요"),
  body("password").notEmpty().isString().withMessage("이메일 혹은 비밀번호를 입력하세요"),
  validateRequest,
  async (req, res, next) => {
    const { email, password } = req.body;

    const sql = `SELECT * FROM users WHERE email = ?`;
    const params = [email];
    try {
      const [response] = await dbPool.execute(sql, params);
      const user = response[0];

      if (!response.length || !checkPwdMatched(user.password, password, user.salt)) throw new Error("이메일 혹은 비밀번호 틀림 ㅋ");

      const token = createToken(user);
      res.cookie("token", token, {
        httpOnly: true,
      });
      return res.status(StatusCodes.OK).json({ message: `${response[0].email}님 환영` });
    } catch (err) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: err.message });
    }
  },
];

exports.passwordResetRequest = [
  body("email").notEmpty().isEmail().withMessage("이메일"),
  validateRequest,
  async (req, res, next) => {
    const { email } = req.body;

    const sql = `SELECT * FROM users WHERE email = ?`;
    const params = [email];
    try {
      const [response] = await dbPool.execute(sql, params);
      if (!response.length) throw new Error("없는 유저");
      return res.status(StatusCodes.OK).json({ message: `${response[0].email}님 비밀번호를 초기화 하실것이군요`, email: email });
    } catch (err) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: err.message });
    }
  },
];

exports.passwordReset = [
  body("email").notEmpty().isEmail().withMessage("이메일을 입력하세요"),
  body("password").notEmpty().isString().withMessage("새로운 비밀번호를 입력하세요"),
  body("passwordCheck").notEmpty().isString().withMessage("새로운 비밀번호를 입력하세요"),
  validateRequest,
  async (req, res, next) => {
    const { password, passwordCheck, email } = req.body;

    if (password !== passwordCheck) return res.status(StatusCodes.BAD_REQUEST).json({ message: "수정하려는 비밀번호가 일치하지 않습니다." });
    // salt도 새로 초기화 -> user select가 필요 없음
    const { hasedPwd, salt } = makeCrypPwd(password);
    const sql = `UPDATE users SET password = ?, salt = ? WHERE email = ?`;
    const params = [hasedPwd, salt, email];
    try {
      const [response] = await dbPool.execute(sql, params);
      console.log(response);
      if (!response.affectedRows) throw new Error("서버 에러");
      return res.status(StatusCodes.OK).json({ message: `${email}님 비밀번호 변경 완료` });
    } catch (err) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message });
    }
  },
];
