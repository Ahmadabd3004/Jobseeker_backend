const { createToken, compareHash } = require("../helper");
const { User } = require("../models");

class Controller {
  static async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ where: { username } });
      if (!user) {
        throw { name: "Not Found" };
      }
      const validatePassword = compareHash(password, user.password);
      if (!validatePassword) {
        throw { name: "Not Found" };
      }
      const payload = {
        id: user.id,
      };
      const access_token = createToken(payload);
      res.status(200).json({
        access_token,
      });
    } catch (error) {
      res.status(401).json({
        message: "username/password error",
      });
    }
  }
}

module.exports = Controller;
