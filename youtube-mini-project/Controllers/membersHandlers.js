let db = new Map();

// {
//     "userId" : "kim",
//     "password" : "123",
//     "name" : "ㅂㅁㅅ"
// }

function findMemberKey(inputUserId) {
  let memberKey = 0;
  for (let [key, value] of db) {
    if (value.userId === inputUserId) {
      memberKey = key;
      break;
    }
  }
  return memberKey;
}

function validatePasswordMatch(memberKey, inputPassword) {
  const matchedMember = db.get(memberKey);
  if (matchedMember.password === inputPassword) return true;
  return false;
}

exports.postLogin = (req, res, next) => {
  const body = req.body;

  let memberKey = findMemberKey(body.userId);

  if (!memberKey) {
    return res.status(404).json({ message: "아이디 존재하지 않아용" });
  }

  if (validatePasswordMatch(memberKey, body.password)) {
    return res.status(200).json({ message: "login 완료" });
  } else {
    return res.status(404).json({ message: "비밀번호 틀림요" });
  }
};

function findMaxId() {
  let maxId = 0;
  for (let [key, value] of db) {
    if (maxId < key) maxId = key;
  }
  return maxId + 1;
}
exports.postJoin = (req, res, next) => {
  const body = req.body;

  if (!body.userId || !body.password || !body.name) res.status(400).json({ message: "not enough information" });
  else {
    db.set(findMaxId(), body);
    res.status(201).json({ message: `${body.name}님 환영합니다.` });
  }
};

exports.getUser = (req, res, next) => {
  const id = parseInt(req.params.id);

  const user = db.get(id);
  if (!user) {
    res.status(404).json({ message: `no matched user for userId ${id}` });
  } else {
    res.status(200).json({
      id: user.userId,
      name: user.name,
    });
  }
};

exports.deleteUser = (req, res, next) => {
  const id = parseInt(req.params.id);

  const user = db.get(id);
  if (!user) {
    res.status(404).json({ message: `no matched user for userId ${id}` });
  } else {
    db.delete(id);
    res.status(200).json({
      message: `${user.name}님 담에 봐용`,
    });
  }
};
