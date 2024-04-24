const dbPool = require("../mariadb");
const { StatusCodes } = require("http-status-codes");
const { body, param, validationResult } = require("express-validator");
const snakeToCamel = require("../utils/snakeToCamel");

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(StatusCodes.BAD_REQUEST).json({ message: errors.array() });
  next();
};

exports.getBook = [
  param("bookId").notEmpty().isString().withMessage("도서 아이디를 입력하세요"),
  validateRequest,
  async (req, res, next) => {
    const bookId = parseInt(req.params.bookId);
    const userId = req.id;
    console.log(userId);
    let sql = ``;
    const params = [bookId];
    if (!userId) {
      sql = `
      SELECT *, 
      (SELECT count(*) FROM likes WHERE book_id = books.id) AS likes
      FROM books 
      LEFT JOIN category
      ON books.category_id = category.category_id
      WHERE books.id = ?
      `;
    } else {
      sql = `
      SELECT *, 
      (SELECT count(*) FROM likes WHERE book_id = books.id) AS likes, 
      (SELECT EXISTS (SELECT * FROM likes WHERE user_id = ? AND book_id = ?)) AS liked
      FROM books 
      LEFT JOIN category
      ON books.category_id = category.category_id
      WHERE books.id = ?
      `;
      params.unshift(userId);
      params.push(bookId);
    }
    try {
      const [response] = await dbPool.execute(sql, params);
      if (!response.length) return res.status(StatusCodes.NOT_FOUND).end();
      const camelCaseResult = snakeToCamel(response);

      return res.status(StatusCodes.OK).json(camelCaseResult[0]);
    } catch (err) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
    }
  },
];

exports.checkHandler = async (req, res, next) => {
  const category_id = req.query.category_id;
  let isNew = req.query.new;
  if (isNew) isNew = JSON.parse(req.query.new);
  const limit = parseInt(req.query.limit);
  const page = parseInt(req.query.page);

  let sql = `SELECT SQL_CALC_FOUND_ROWS *, (SELECT count(*) FROM likes WHERE book_id = books.id) AS likes FROM books`;
  let params = [];

  if (category_id && isNew) {
    sql += `
      WHERE category_id = ?
      AND pub_date 
      BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()
    `;
    params.push(parseInt(category_id));
  } else if (category_id && !isNew) {
    sql += ` WHERE category_id = ?`;
    params.push(parseInt(category_id));
  } else if (!category_id && isNew) {
    sql += `
      WHERE pub_date 
      BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()
    `;
  }

  sql += ` LIMIT ?, ?`;
  params.push((page - 1) * limit, limit);
  try {
    const [response] = await dbPool.execute(sql, params);
    if (!response.length) return res.status(StatusCodes.NOT_FOUND).end();

    const camelCaseResult = snakeToCamel(response);
    const [booksCnt] = await dbPool.execute(`SELECT found_rows()`);

    return res.status(StatusCodes.OK).json({ books: camelCaseResult, pagination: { totalBooksCnt: booksCnt[0]["found_rows()"], currentPage: page } });
  } catch (err) {
    return res.status(StatusCodes.BAD_REQUEST).end();
  }
};
