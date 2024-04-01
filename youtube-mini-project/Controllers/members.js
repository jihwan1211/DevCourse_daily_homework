const dbPool = require("../mariadb");

// 에러 코드 분기처리 수정 필요

// 로그인
exports.postLogin = async (req, res, next) => {
  const { email, pwd } = req.body;

  if (!email || !pwd) return res.status(400).json({ message: "not enough information" });

  try {
    const response = await dbPool.query("SELECT * FROM users WHERE email = ? AND pwd = ?", [email, pwd]);
    if (response[0].length === 0) throw new Error(`no matched user for email ${email}`);
    return res.status(200).json(response[0]);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// 회원가입
exports.postJoin = async (req, res, next) => {
  const { email, name, pwd, contact } = req.body;

  if (!email || !pwd || !name || !contact) return res.status(400).json({ message: "not enough information" });
  try {
    const result = await dbPool.query("INSERT INTO users (email, name, pwd, contact) VALUES (?, ?, ?, ?)", [email, name, pwd, contact]);

    if (result[0].affectedRows > 0) return res.status(201).json({ message: `${name}님 환영합니다.` });
    else throw new Error("회원가입에 실패하였습니다. 재시도 해주세요.");
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// 회원조회
exports.getUser = async (req, res, next) => {
  const { email } = req.body;

  try {
    const response = await dbPool.query("SELECT * FROM users WHERE email = ?", [email]);

    if (response[0].length === 0) throw new Error(`no matched user for userId ${email}`);
    return res.status(200).json(response[0]);
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: err.message });
  }
};

// 회원탈퇴
exports.deleteUser = async (req, res, next) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: "not enough information" });

  try {
    const result = await dbPool.query("DELETE FROM users WHERE email = ? ", [email]);

    if (result[0].affectedRows > 0) return res.status(200).json({ message: `${user.name}님 담에 봐용` });
    else throw new Error("회원 탈퇴에 실패하였습니다. 재시도 해주세요.");
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
