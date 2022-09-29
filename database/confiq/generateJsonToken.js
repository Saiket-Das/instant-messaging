const jtw = require("jsonwebtoken");

const generateJsonToekn = (id) => {
  return jtw.sign({ id }, process.env.JWT_SECRET, { expiresIn: "2d" });
};

module.exports = generateJsonToekn;
