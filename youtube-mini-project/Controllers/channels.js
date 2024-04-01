const dbPool = require("../mariadb");

exports.getChannel = async (req, res, next) => {
  const id = parseInt(req.params.id);

  try {
    const [response] = await dbPool.query("SELECT * FROM channels WHERE id = ?", [id]);

    if (response.length) return res.status(200).json(response);
    else throw new Error(`request failed, no matched channel for id ${id}`);
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
};

exports.putChannel = async (req, res, next) => {
  const { name } = req.body;
  const id = parseInt(req.params.id);

  try {
    const [channel] = await dbPool.query("SELECT * FROM channels WHERE id = ?", [id]);
    const prevChannelTitle = channel[0].name;

    const result = await dbPool.query(`UPDATE channels SET name = ? WHERE id = ?`, [name, id]);
    if (result[0].affectedRows > 0) return res.status(200).json({ message: `${prevChannelTitle} to ${name} changed completed` });
    else throw new Error("request failed");
  } catch (err) {
    res.status(404).json({ message: err.message });
  }

  /*
  if (checkDupChannelTitle(newChannelTitle)) errMessage = "중복된 채널 이름입니다.";
  */
};

exports.deleteChannel = async (req, res, next) => {
  // 채널 아이디
  const id = parseInt(req.params.id);

  try {
    const [channel] = await dbPool.query("SELECT * FROM channels WHERE id = ?", [id]);
    if (!channel.length) return res.status(404).json({ message: `no channel for id ${id}` });

    const [result] = await dbPool.query(`DELETE FROM channels WHERE id = ?`, [id]);

    if (result.affectedRows) return res.status(200).json({ message: `Good Bye! ${channel[0].name}` });
    else throw new Error("request failed");
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

exports.getChannels = async (req, res, next) => {
  const { user_id } = req.body;

  if (user_id === "" || !user_id) return res.status(400).json({ message: "userId가 없는뎅 로그인하고 오세용" });

  try {
    const [response] = await dbPool.query(`SELECT * FROM channels WHERE user_id = ?`, [user_id]);
    if (response.length) return res.status(200).json(response);
    else throw new Error("request failed");
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

exports.postChannel = async (req, res, next) => {
  const { name, user_id } = req.body;

  try {
    const [userInfo] = await dbPool.query("SELECT * FROM users WHERE id = ?", [user_id]);
    if (!userInfo.length) return res.status(404).json({ message: `no user for id ${user_id}` });

    const [result] = await dbPool.query("INSERT INTO channels (name, user_id) VALUES (?, ?)", [name, user_id]);
    if (result.affectedRows) return res.status(200).json({ message: `${userInfo[0].name}님, welcome to youtube ${name}!` });
    else throw new Error("request failed");
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
