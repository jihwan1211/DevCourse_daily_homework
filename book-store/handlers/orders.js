const dbPool = require("../mariadb");
const { StatusCodes } = require("http-status-codes");
const snakeToCamel = require("../utils/snakeToCamel");

const insertDelivery = async (delivery) => {
  const sql = `INSERT INTO delivery (user_address, username, contact) VALUES (?, ?, ?)`;
  const params = Object.values(delivery);
  try {
    const [result] = await dbPool.execute(sql, params);
    if (!result.affectedRows) throw new Error(`배송 테이블 추가 실패 failed`);
    return result.insertId;
  } catch (err) {}
};

const insertOrder = async ({ userId, deliveryId, cartItems, totalPrice, totalQuantity }) => {
  const sql = `INSERT INTO orders (user_id, delivery_id, book_title, total_price, total_quantity)
    VALUES (?,?,?,?,?)`;

  try {
    const [orderBookInfo] = await dbPool.query(`SELECT book_id, quantity FROM cartItems WHERE cartItems.id IN (?)`, [cartItems]);

    const [response] = await dbPool.execute(`SELECT title FROM books WHERE books.id = ?`, [orderBookInfo[0].book_id]);
    const { title: bookTitle } = response[0];

    const params = [userId, deliveryId, bookTitle, totalPrice, totalQuantity];
    const [result] = await dbPool.execute(sql, params);
    if (!result.affectedRows) throw new Error(`배송 테이블 추가 실패 failed`);
    return { orderId: result.insertId, orderBookInfo: orderBookInfo };
  } catch (err) {
    throw err;
  }
};

const insertOrderedBook = async ({ orderId, orderBookInfo }) => {
  const sql = `INSERT INTO orderedBook (order_id, book_id, quantity) VALUES ?`;
  const params = [];
  orderBookInfo.forEach((item) => {
    params.push([orderId, item.book_id, item.quantity]);
  });

  try {
    const [result] = await dbPool.query(sql, [params]);
    if (!result.affectedRows) throw new Error(`배송 테이블 추가 실패`);
  } catch (err) {
    throw err;
  }
};

const deleteCartItem = async ({ cartItems, res }) => {
  const sql = `DELETE FROM cartItems WHERE cartItems.id IN (?)`;
  try {
    const [result] = await dbPool.query(sql, [cartItems]);
    if (!result.affectedRows) throw new Error(`장바구니 아이템 삭제 오류`);
    return res.status(StatusCodes.OK).json({ message: "끝!" });
  } catch (err) {
    throw err;
  }
};

exports.postOrder = async (req, res, next) => {
  const { cartItems, delivery, totalPrice, totalQuantity } = req.body;
  const userId = req.id;

  try {
    const deliveryId = await insertDelivery(delivery);
    const { orderId, orderBookInfo } = await insertOrder({ cartItems, deliveryId, userId, totalPrice, totalQuantity });
    await insertOrderedBook({ orderId, orderBookInfo });
    await deleteCartItem({ cartItems, res });
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

exports.getOrderList = async (req, res, next) => {
  const userId = req.id;
  const sql = `SELECT orders.id, created_at, book_title, total_quantity, total_price, username, user_address, contact FROM orders
  LEFT JOIN delivery
  ON orders.delivery_id = delivery.id
  WHERE orders.user_id = ?`;
  try {
    const [response] = await dbPool.execute(sql, [userId]);

    if (!response.length) throw new Error(`주문 내역 조회 실패`);
    const camelResponse = snakeToCamel(response);
    return res.status(StatusCodes.OK).json(camelResponse);
  } catch (err) {}
};

exports.getOrderInfo = async (req, res, next) => {
  const { orderId } = req.params;

  const sql = `SELECT books.id, title, author, price, quantity FROM orderedBook
  LEFT JOIN books
  ON orderedBook.book_id = books.id
  WHERE orderedBook.order_id = ?`;
  try {
    const [response] = await dbPool.execute(sql, [orderId]);
    if (!response.length) throw new Error(`주문 상세내역 조회 실패`);
    return res.status(StatusCodes.OK).json(response);
  } catch (err) {}
};
