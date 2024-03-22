let db = new Map();

// {
//     "userId" : "kim",
//     "password" : "123",
//     "name" : "ㅂㅁㅅ"
// }

exports.postLogin = (req, res, next) => {};

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
