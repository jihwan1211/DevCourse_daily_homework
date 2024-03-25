let channelDB = new Map();

function findMaxId() {
  let maxId = 0;
  for (let [key, value] of channelDB) {
    if (maxId < key) maxId = key;
  }
  return maxId + 1;
}

function checkDupChannelTitle(channelTitle) {
  for (let [key, value] of channelDB) {
    if (value.channelTitle === channelTitle) return true;
  }
  return false;
}

function findChannelbyId(channelId) {
  for (let [key, values] of channelDB) {
    if (key === channelId) {
      return true;
    }
  }
  return false;
}

exports.getChannel = (req, res, next) => {
  const id = parseInt(req.params.id);

  if (!findChannelbyId(id)) return res.status(404).json({ message: `no matched channel for ${id}` });

  res.status(200).json(channelDB.get(id));
};

exports.putChannel = (req, res, next) => {
  const body = req.body;
  const { newChannelTitle } = req.body;
  const id = parseInt(req.params.id);

  if (!findChannelbyId(id)) return res.status(400).json({ message: "plz enter right channel id" });

  const channel = channelDB.get(id);

  let errMessage = "";
  if (newChannelTitle === "") errMessage = "plz enter channel title";

  if (newChannelTitle === channel.channelTitle) errMessage = "채널 이름이 바뀌지 않았습니다.";
  else if (checkDupChannelTitle(newChannelTitle)) errMessage = "중복된 채널 이름입니다.";

  if (errMessage !== "") return res.status(400).json({ message: `${errMessage}` });

  const prevChannelTitle = channel.channelTitle;
  channel.channelTitle = body.newChannelTitle;
  channelDB.set(id, channel);
  res.status(200).json({ message: `${prevChannelTitle} to ${newChannelTitle} changed completed` });
};

exports.deleteChannel = (req, res, next) => {
  const id = parseInt(req.params.id);

  if (!findChannelbyId(id)) return res.status(404).json({ message: `no match for id ${id}` });

  const channel = channelDB.get(id);
  channelDB.delete(id);
  res.status(200).json({ message: `Good bye ${channel.channelTitle}` });
};

exports.getChannels = (req, res, next) => {
  const arr = [];

  if (!channelDB.size) return res.status(404).json({ message: "저장된 데이터가 없습니다." });

  channelDB.forEach((ele, key) => {
    arr.push(ele);
  });

  res.status(200).json(arr);
};

exports.postChannel = (req, res, next) => {
  const body = req.body;
  const { channelTitle } = req.body;

  let errMessage = "";

  if (channelTitle === "") errMessage = "plz enter channel title";
  if (checkDupChannelTitle(channelTitle)) errMessage = "중복된 채널 이름입니다.";

  if (errMessage !== "") return res.status(400).json({ message: `${errMessage}` });

  channelDB.set(findMaxId(), body);
  res.status(201).json({ message: `welcome to youtube ${body.channelTitle}!` });
};
