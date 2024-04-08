const dbPool = require("../mariadb");
const { body, param, validationResult } = require("express-validator");

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ error: errors.array() });
  // 유효성 검사가 통과된다면 다음 미들웨어 실행
  next();
};

exports.getChannel = [
  param("id").notEmpty().withMessage("채널 id 입력"),
  validateRequest,
  async (req, res, next) => {
    const id = parseInt(req.params.id);

    const sql = "SELECT * FROM channels WHERE id = ?";
    const params = [id];
    try {
      const [response] = await dbPool.execute(sql, params);

      if (response.length) return res.status(200).json(response);
      else throw new Error(`request failed, no matched channel for id ${id}`);
    } catch (err) {
      return res.status(404).json({ message: err.message });
    }
  },
];

exports.putChannel = [
  body("name").notEmpty().isString().withMessage("채널 이름은 필수 입력 값입니다."),
  param("id").notEmpty().withMessage("채널 id 입력"),
  validateRequest,
  async (req, res, next) => {
    const { name } = req.body;
    const id = parseInt(req.params.id);

    try {
      const [channel] = await dbPool.execute("SELECT * FROM channels WHERE id = ?", [id]);
      const prevChannelTitle = channel[0].name;

      const [result] = await dbPool.execute(`UPDATE channels SET name = ? WHERE id = ?`, [name, id]);
      if (result.affectedRows > 0) return res.status(200).json({ message: `${prevChannelTitle} to ${name} changed completed` });
      else throw new Error("request failed");
    } catch (err) {
      res.status(404).json({ message: err.message });
    }

    /*
  if (checkDupChannelTitle(newChannelTitle)) errMessage = "중복된 채널 이름입니다.";
  */
  },
];

exports.deleteChannel = [
  param("id").notEmpty().withMessage("채널 id 입력"),
  validateRequest,
  async (req, res, next) => {
    // 채널 아이디
    const id = parseInt(req.params.id);

    try {
      const [channel] = await dbPool.execute("SELECT * FROM channels WHERE id = ?", [id]);
      if (!channel.length) return res.status(404).json({ message: `no channel for id ${id}` });

      const [result] = await dbPool.execute(`DELETE FROM channels WHERE id = ?`, [id]);

      if (result.affectedRows) return res.status(200).json({ message: `Good Bye! ${channel[0].name}` });
      else throw new Error("request failed");
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  },
];

exports.getChannels = [
  body("user_id").notEmpty().isInt().withMessage("user_id는 숫자로 입력해야합니다."),
  validateRequest,
  async (req, res, next) => {
    const { user_id } = req.body;

    const sql = `SELECT * FROM channels WHERE user_id = ?`;
    const params = [user_id];
    try {
      const [response] = await dbPool.execute(sql, params);

      if (response.length) return res.status(200).json(response);
      else throw new Error("request failed");
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  },
];

exports.postChannel = [
  body("user_id").notEmpty().isInt().withMessage("user_id는 숫자여야합니다."),
  body("name").notEmpty().isString().withMessage("채널 이름은 필수 입력값입니다."),
  validateRequest,
  async (req, res, next) => {
    const { name, user_id } = req.body;

    try {
      const [userInfo] = await dbPool.execute("SELECT * FROM users WHERE id = ?", [user_id]);
      if (!userInfo.length) throw new Error(`no user for id ${user_id}`);

      const [result] = await dbPool.execute("INSERT INTO channels (name, user_id) VALUES (?, ?)", [name, user_id]);
      if (result.affectedRows) return res.status(200).json({ message: `님, welcome to youtube ${name}!` });
      else throw new Error("request failed");
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  },
];
