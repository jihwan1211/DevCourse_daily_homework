const arr = [
  { id: 1, name: "apple" },
  { id: 2, name: "orange" },
  { id: 3, name: "strawberry" },
  { id: 4, name: "blueberry" },
];

exports.getFruits = (req, res, next) => {
  if (arr.length) res.json(arr);
  else res.status(404).json({ message: "no fruits" });
};

exports.getFruit = (req, res, next) => {
  const id = parseInt(req.params.id);
  const foundFruit = arr.find((ele) => ele.id === id);
  if (foundFruit) res.json(foundFruit);
  else res.status(404).json({ message: `no_${id} fruit` });
};
