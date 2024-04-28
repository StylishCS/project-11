const jwt = require("jsonwebtoken");
const Users = require("../DB/Users.json")

async function UserPrivileges(req, res, next) {
  try {
    if (!req.header("Authorization")) {
      return res.status(401).json("FORBIDDEN");
    }
    const key = req.header("Authorization").split(" ")[0];
    const token = req.header("Authorization").split(" ")[1];
    if (key !== process.env.JWT_KEYWORD) {
      return res.status(401).json("FORBIDDEN");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = Users.find((user) => user.id === decoded.id);
    if (!user) {
      return res.status(401).json("FORBIDDEN");
    }
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json("FORBIDDEN");
  }
}

module.exports = UserPrivileges;
