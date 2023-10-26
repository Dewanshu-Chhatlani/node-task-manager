const jwt = require("jsonwebtoken");

const User = require("../models/user.model");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "&dbh%dbh45ehy753");

    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) throw new Error("Invalid Token1");

    req.user = user;

    next();
  } catch (e) {
    res.status(401).send({ error: "Authentication failed!" });
  }
};

module.exports = auth;
