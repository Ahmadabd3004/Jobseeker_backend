const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const secretKey = "rahasia";

const hashingPassword = (password) => bcrypt.hashSync(password);
const compareHash = (password, hashedPassword) =>
  bcrypt.compareSync(password, hashedPassword);

const createToken = (payload) => jwt.sign(payload, secretKey);
const verifyToken = (token) => jwt.verify(token, secretKey);

module.exports = {
  createToken,
  verifyToken,
  hashingPassword,
  compareHash,
};
