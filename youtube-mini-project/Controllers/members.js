const dbPool = require("../mariadb");
const { body, param, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ error: errors.array() });
  // 유효성 검사가 통과된다면 다음 미들웨어 실행
  next();
};

// 에러 코드 분기처리 수정 필요

// 로그인
exports.postLogin = [
  body("email").notEmpty().isEmail().withMessage("이메일을 입력하세요"),
  body("pwd").notEmpty().isString().withMessage("비밀번호를 입력하세요"),
  validateRequest,
  async (req, res, next) => {
    const { email, pwd } = req.body;

    try {
      const [response] = await dbPool.query("SELECT * FROM users WHERE email = ? AND pwd = ?", [email, pwd]);
      if (response.length === 0) throw new Error(`no matched user for email ${email}`);
      const token = jwt.sign({ email: response.email, name: response.name }, process.env.PRIVATE_KEY);

      // 원래는 쿠키가 맞음 일단 바뀌는지 확인하기 위해서
      res.cookie();
      return res.status(200).json({ response: response, token: token });
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  },
];

// 회원가입
exports.postJoin = [
  body("email").notEmpty().isEmail().withMessage("이메일을 입력하세요"),
  body("pwd").notEmpty().isString().withMessage("비밀번호를 입력하세요"),
  body("name").notEmpty().isString().withMessage("성함을 입력하세요"),
  body("contact").notEmpty().isString().withMessage("연락처를 입력하세요"),
  validateRequest,
  async (req, res, next) => {
    const { email, name, pwd, contact } = req.body;

    try {
      const [result] = await dbPool.query("INSERT INTO users (email, name, pwd, contact) VALUES (?, ?, ?, ?)", [email, name, pwd, contact]);

      if (result.affectedRows > 0) return res.status(201).json({ message: `${name}님 환영합니다.` });
      else throw new Error("회원가입에 실패하였습니다. 재시도 해주세요.");
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
];

// 회원조회
exports.getUser = [
  body("email").notEmpty().isEmail().withMessage("이메일을 입력하세요"),
  validateRequest,
  async (req, res, next) => {
    const { email } = req.body;

    try {
      const [response] = await dbPool.query("SELECT * FROM users WHERE email = ?", [email]);

      if (response.length === 0) throw new Error(`no matched user for userId ${email}`);
      return res.status(200).json(response);
    } catch (err) {
      console.log(err);
      res.status(404).json({ message: err.message });
    }
  },
];

// 회원탈퇴
exports.deleteUser = [
  body("email").notEmpty().isEmail().withMessage("이메일을 입력하세요"),
  validateRequest,
  async (req, res, next) => {
    const { email } = req.body;

    try {
      const [result] = await dbPool.query("DELETE FROM users WHERE email = ? ", [email]);

      if (result.affectedRows > 0) return res.status(200).json({ message: `${user.name}님 담에 봐용` });
      else throw new Error("회원 탈퇴에 실패하였습니다. 재시도 해주세요.");
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  },
];
