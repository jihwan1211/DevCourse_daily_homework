const map = new Map();

let youtuber1 = {
  title: "kim",
  subscribers: "234",
  videoNum: "12",
};

let youtuber2 = {
  title: "lee",
  subscribers: "2313123",
  videoNum: "1212",
};

let youtuber3 = {
  title: "park",
  subscribers: "1234",
  videoNum: "11231232",
};

map.set(1, youtuber1);
map.set(2, youtuber2);
map.set(3, youtuber3);

exports.getAdmin = (req, res, next) => {
  res.send("hello express!");
};

exports.postAdmin = (req, res, next) => {
  const body = req.body;
  const { message } = req.body;
  console.log(body);
  console.log(message);

  res.json(req.body);
};

exports.getYoutubers = (req, res, next) => {
  //   console.log(map);
  const obj = {};
  const arr = [];
  for (const [key, value] of map) {
    obj[key] = value;
    arr.push({ key, value });
  }
  // res.json(obj);
  res.send(arr);
};

exports.getYoutuber = (req, res, next) => {
  const id = parseInt(req.params.id);
  const youtuber = map.get(id);
  if (youtuber) {
    res.json(youtuber);
  } else {
    res.json({ message: "error, no youtuber" });
  }
};

exports.postYoutuber = (req, res, next) => {
  const body = req.body;
  function findMaxId() {
    let maxId = 0;
    for (let [key, value] of map) {
      if (maxId < key) maxId = key;
    }
    return maxId + 1;
  }
  map.set(findMaxId(), body);

  // 이거 완료 메시지는 어찌 보내야할까?
  res.json({
    message: `${body.title}님, 유튜버 생활을 응원합니다! request complete!`,
  });
};
