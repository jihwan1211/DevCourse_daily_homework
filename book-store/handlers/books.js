const dbPool = require("../mariadb");
const { StatusCodes } = require("http-status-codes");
const { body, param, validationResult } = require("express-validator");
const dotenv = require("dotenv");

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty) return res.status(StatusCodes.BAD_REQUEST).json({ message: errors.array() });
  next();
};

exports.getBook = [
  param("id").notEmpty().isString().withMessage("도서 아이디를 입력하세요"),
  validateRequest,
  async (req, res, next) => {
    const id = parseInt(req.params.bookId);
    const sql = `SELECT * FROM books WHERE books.id = ?`;
    const params = [id];
    try {
      const [response] = await dbPool.execute(sql, params);
      if (!response.length) return res.status(StatusCodes.NOT_FOUND).end();
      return res.status(StatusCodes.OK).json(response[0]);
    } catch (err) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message });
    }
  },
];

exports.checkHandler = (req, res, next) => {
  const category_id = req.query.category_id;
  if (category_id) {
    getBooksByCategory(req, res, next);
  } else {
    getBooks(req, res, next);
  }
};

const getBooksByCategory = async (req, res, next) => {
  const category_id = parseInt(req.query.category_id);
  const sql = `SELECT * FROM books WHERE category_id = ?`;
  const params = [category_id];
  try {
    const [response] = await dbPool.execute(sql, params);
    if (!response.length) return res.status(StatusCodes.NOT_FOUND).end();
    return res.status(StatusCodes.OK).json(response);
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
  }
};

const getBooks = async (req, res, next) => {
  const sql = `SELECT id, title, summary, author, price, pub_date FROM books`;
  try {
    const [response] = await dbPool.execute(sql);
    return res.status(StatusCodes.OK).json(response);
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
  }
};
