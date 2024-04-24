function findSnake(s) {
  return s.replace(/(_\w)/g, function (m) {
    return m[1].toUpperCase();
  });
}

const snakeToCamel = (response) => {
  return response.map((ele) =>
    Object.keys(ele).reduce((acc, key) => {
      acc[findSnake(key)] = ele[key];
      return acc;
    }, {})
  );
};

module.exports = snakeToCamel;
