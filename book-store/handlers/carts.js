const dbPool = require("../mariadb");
const { StatusCodes } = require("http-status-codes");
const { body, param, validationResult } = require("express-validator");
const snakeToCamel = require("../utils/snakeToCamel");

exports.deleteCart = async (req, res, next) => {
  const cartId = parseInt(req.params.cartId);
  const userId = req.id;

  const sql = `DELETE FROM cartItems WHERE user_id = ? AND cartItems.id = ?`;
  const params = [userId, cartId];
  try {
    const [result] = await dbPool.execute(sql, params);
    if (!result.affectedRows) throw new Error(`삭제 실패 failed`);
    return res.status(StatusCodes.CREATED).json({ message: `장바구니 삭제 완료` });
  } catch (err) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
  }
};

exports.addCart = async (req, res, next) => {
  const bookId = parseInt(req.body.book_id);
  const quantity = parseInt(req.body.quantity);
  const userId = req.id;

  const sql = `INSERT INTO cartItems (book_id, quantity, user_id) VALUES (?, ?, ?)`;
  const params = [bookId, quantity, userId];
  try {
    const [result] = await dbPool.execute(sql, params);
    if (!result.affectedRows) throw new Error(`회원가입 실패 failed`);
    return res.status(StatusCodes.CREATED).json({ message: `장바구니 추가 완료` });
  } catch (err) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
  }
};

exports.getCarts = async (req, res, next) => {
  const userId = req.id;
  const selected = req.body.selected;

  let sql = `
    SELECT cartItems.id, book_id, title, summary, quantity, price FROM cartItems
    LEFT JOIN books
    ON books.id = cartItems.book_id
    WHERE cartItems.user_id = ?`;
  const params = [userId];

  if (selected) {
    sql += `
      AND cartItems.id IN (?)`;
    params.push(selected);
  }

  try {
    const [response] = await dbPool.query(sql, params);
    if (!response.length) return res.status(StatusCodes.NOT_FOUND).end();
    const camelResponse = snakeToCamel(response);
    return res.status(StatusCodes.OK).json(camelResponse);
  } catch (err) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
  }
};
