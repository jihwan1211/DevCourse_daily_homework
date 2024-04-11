const dbPool = require("../mariadb");
const { StatusCodes } = require("http-status-codes");

exports.getCategory = async (req, res, next) => {
  const sql = `SELECT * FROM category`;
  try {
    const [response] = await dbPool.execute(sql);
    if (!response.length) throw new Error("server error");
    return res.status(StatusCodes.OK).json(response);
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};
