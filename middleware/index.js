const { verifyToken } = require("../helper");
const { User } = require("../models");
const authentication = async (req, res, next) => {
  try {
    let { access_token } = req.headers;
    if (!access_token) {
      throw { name: "No token" };
    }
    const payload = verifyToken(access_token);
    const user = await User.findByPk(payload.id);
    if (!user) {
      throw { name: "Unauthorized" };
    }
    req.user = {
      id: user.id,
    };
    next();
  } catch (error) {
    res.status(401).json({
      message: "Login First",
    });
  }
};

module.exports = authentication;
