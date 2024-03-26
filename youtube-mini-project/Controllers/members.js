let db = new Map();

// {
//     "userId" : "kim",
//     "password" : "123",
//     "name" : "ㅂㅁㅅ"
// }

function findMemberByUserId(inputUserId) {
  for (let [key, value] of db) {
    if (value.userId === inputUserId) {
      return true;
    }
  }
  return false;
}

function findMaxId() {
  let maxId = 0;
  for (let [key, value] of db) {
    if (maxId < key) maxId = key;
  }
  return maxId + 1;
}

function validatePasswordMatch(userId, inputPassword) {
  const matchedMember = db.get(userId);
  if (matchedMember.password === inputPassword) return true;
  return false;
}

exports.postLogin = (req, res, next) => {
  const { userId, password } = req.body;

  if (!findMemberByUserId(userId)) {
    return res.status(404).json({ message: "아이디 존재하지 않아용" });
  }

  if (validatePasswordMatch(userId, password)) {
    return res.status(200).json({ message: "login 완료" });
  } else {
    return res.status(404).json({ message: "비밀번호 틀림요" });
  }
};

exports.postJoin = (req, res, next) => {
  const { userId, password, name } = req.body;

  if (!userId || !password || !name) res.status(400).json({ message: "not enough information" });
  else {
    db.set(userId, req.body);
    res.status(201).json({ message: `${name}님 환영합니다.` });
  }
};

exports.getUser = (req, res, next) => {
  // const id = parseInt(req.params.id);
  const { userId } = req.body;
  console.log(userId);
  const user = db.get(userId);
  if (!user) {
    res.status(404).json({ message: `no matched user for userId ${userId}` });
  } else {
    res.status(200).json({
      userId: user.userId,
      name: user.name,
    });
  }
};

exports.deleteUser = (req, res, next) => {
  const { userId } = req.body;

  const user = db.get(userId);
  if (!user) {
    res.status(404).json({ message: `no matched user for userId ${id}` });
  } else {
    db.delete(userId);
    res.status(200).json({
      message: `${user.name}님 담에 봐용`,
    });
  }
};
