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

const insertOrder = async ({ userId, deliveryId, cartItems, totalPrice, totalQuantity }) => {
  const sql = `INSERT INTO orders (user_id, delivery_id, book_title, total_price, total_quantity)
    VALUES (?,?,?,?,?)`;
  console.log(deliveryId);
  try {
    const [orderBookInfo] = await dbPool.query(`SELECT book_id, quantity FROM cartItems WHERE cartItems.id IN (?)`, [cartItems]);

    const [response] = await dbPool.execute(`SELECT title FROM books WHERE books.id = ?`, [orderBookInfo[0].book_id]);
    const { title: bookTitle } = response[0];
    console.log(bookTitle);
    const params = [userId, deliveryId, bookTitle, totalPrice, totalQuantity];
    const [result] = await dbPool.execute(sql, params);
    if (!result.affectedRows) throw new Error(`배송 테이블 추가 실패 failed`);
    return { orderId: result.insertId, orderBookInfo: orderBookInfo };
  } catch (err) {}
};

const insertOrderedBook = async ({ orderId, orderBookInfo, res }) => {
  console.log(orderId);
  const sql = `INSERT INTO orderedBook (order_id, book_id, quantity) VALUES ?`;
  const params = [];
  orderBookInfo.forEach((item) => {
    params.push([orderId, item.book_id, item.quantity]);
  });
  console.log("params : ", params);
  try {
    const [result] = await dbPool.query(sql, [params]);
    if (!result.affectedRows) throw new Error(`배송 테이블 추가 실패 failed`);
  } catch (err) {}
};

const deleteCartItem = async (cartItemIds) => {
  const sql = `DELETE FROM cartItems WHERE cartItems.id IN (?)`;
  try {
    const [result] = await dbPool.query(sql, [cartItemIds]);
    if (!result.affectedRows) throw new Error(`장바구니 아이템 삭제 오류`);
    return res.status(StatusCodes.OK).json({ message: "끝!" });
  } catch (err) {}
};

exports.postOrder = async (req, res, next) => {
  const { cartItems, delivery, totalPrice, totalQuantity, userId } = req.body;

  try {
    const deliveryId = await insertDelivery(delivery);
    const { orderId, orderBookInfo } = await insertOrder({ cartItems, deliveryId, userId, totalPrice, totalQuantity });
    await insertOrderedBook({ orderId, orderBookInfo, res });
    await deleteCartItem(cartItems);
  } catch (err) {}
};
exports.getOrderList = async (req, res, next) => {
  const { userId } = req.body;
  const sql = `SELECT orders.id, created_at, book_title, total_quantity, total_price, username, user_address, contact FROM orders
  LEFT JOIN delivery
  ON orders.delivery_id = delivery.id
  WHERE orders.user_id = ?`;
  try {
    const [result] = await dbPool.execute(sql, [userId]);

    if (!result.length) throw new Error(`장바구니 아이템 삭제 오류`);
    return res.status(StatusCodes.OK).json(result);
  } catch (err) {}
};

exports.getOrderInfo = async (req, res, next) => {
  const { orderId } = req.params;

  const sql = `SELECT books.id, title, author, price, quantity FROM orderedBook
  LEFT JOIN books
  ON orderedBook.book_id = books.id
  WHERE orderedBook.order_id = ?`;
  try {
    const [result] = await dbPool.execute(sql, [orderId]);
    if (!result.length) throw new Error(`장바구니 아이템 삭제 오류`);
    return res.status(StatusCodes.OK).json(result);
  } catch (err) {}
};
