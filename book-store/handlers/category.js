const dbPool = require("../mariadb");
const { StatusCodes } = require("http-status-codes");
const snakeToCamel = require("../utils/snakeToCamel");

exports.getCategory = async (req, res, next) => {
  const sql = `SELECT * FROM category`;
  try {
    const [response] = await dbPool.execute(sql);
    if (!response.length) throw new Error("server error");
    const camelResponse = snakeToCamel(response);
    return res.status(StatusCodes.OK).json(camelResponse);
  } catch (err) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
  }
};
