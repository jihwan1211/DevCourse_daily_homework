const dbPool = require("../mariadb");
const { StatusCodes } = require("http-status-codes");

const insertDelivery = async (delivery) => {
  const sql = `INSERT INTO delivery (user_address, username, contact) VALUES (?, ?, ?)`;
  const params = Object.values(delivery);
  try {
    const [result] = await dbPool.execute(sql, params);
    if (!result.affectedRows) throw new Error(`배송 테이블 추가 실패 failed`);
    return result.insertId;
  } catch (err) {}
};

const insertOrder = async ({ userId, deliveryId, items, totalPrice, totalQuantity }) => {
  const sql = `INSERT INTO orders (user_id, delivery_id, book_title, total_price, total_quantity)
    VALUES (?,?,?,?,?)`;
  console.log(deliveryId);
  try {
    const [response] = await dbPool.execute(`SELECT title FROM books WHERE books.id = ?`, [items[0].book_id]);
    const { title: bookTitle } = response[0];

    const params = [userId, deliveryId, bookTitle, totalPrice, totalQuantity];
    const [result] = await dbPool.execute(sql, params);
    if (!result.affectedRows) throw new Error(`배송 테이블 추가 실패 failed`);
    return result.insertId;
  } catch (err) {}
};

const insertOrderedBook = async ({ orderId, items }) => {
  console.log(orderId);
  const sql = `INSERT INTO orderedBook (order_id, book_id, quantity) VALUES ?`;
  const params = [];
  items.forEach((item) => {
    params.push([orderId, item.book_id, item.quantity]);
  });
  console.log(params);
  try {
    const [result] = await dbPool.query(sql, [params]);
    if (!result.affectedRows) throw new Error(`배송 테이블 추가 실패 failed`);
  } catch (err) {}
};

exports.postOrder = async (req, res, next) => {
  const { items, delivery, totalPrice, totalQuantity, userId } = req.body;

  try {
    const deliveryId = await insertDelivery(delivery);
    const orderId = await insertOrder({ items, deliveryId, userId, totalPrice, totalQuantity });
    await insertOrderedBook({ orderId, items });
  } catch (err) {}
};
exports.getOrderList = (req, res, next) => {};
exports.getOrderInfo = (req, res, next) => {};
