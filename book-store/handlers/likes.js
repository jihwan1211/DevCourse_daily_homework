const dbPool = require("../mariadb");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const { body, param, validationResult } = require("express-validator");
const dotenv = require("dotenv");
const jwtUtils = require("../jwt-utils");
dotenv.config();

const validateJWT = (req) => {
  const JWT = req.headers["authorization"];

  console.log("jwt : ", JWT);
  const decodedJWT = jwt.decode(JWT, process.env.PRIVATE_KEY);
  console.log("decode : ", decodedJWT);
  return decodedJWT;
};

exports.addLike = [
  async (req, res, next) => {
    const book_id = parseInt(req.params.bookId);
    // const auth = validateJWT(req);
    const user_id = req.id;
    console.log("user_id : ", user_id);
    const sql = `INSERT INTO likes (user_id, book_id) VALUES (?, ?)`;
    const params = [user_id, book_id];
    try {
      const [result] = await dbPool.execute(sql, params);
      if (!result.affectedRows) throw new Error(`회원가입 실패 failed`);
      return res.status(StatusCodes.CREATED).json({ message: `${user_id}가 ${book_id}를 좋아합니다.` });
    } catch (err) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
    }
  },
];
exports.deleteLike = async (req, res, next) => {
  const book_id = parseInt(req.params.bookId);
  const userId = req.id;

  const sql = `DELETE FROM likes WHERE user_id = ? AND book_id = ?`;
  const params = [userId, book_id];
  try {
    const [result] = await dbPool.execute(sql, params);
    if (!result.affectedRows) throw new Error(`좋아요 삭제 실패`);
    return res.status(StatusCodes.OK).json({ message: `${userId}가 ${book_id}를 좋아요를 취소합니다.` });
  } catch (err) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
  }
};
