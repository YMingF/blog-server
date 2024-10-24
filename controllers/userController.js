const userService = require("../services/userService");

async function getMatchedUser(req, res) {
  const { username, password } = req.body;

  try {
    const user = await userService.findUserByUsername(username);

    if (user && user.password === password) {
      req.session.user = { id: user.id, username: user.username };
      res.json({ success: true, user: { username: user.username } });
    } else {
      res.status(401).json({ success: false, message: "用户名或密码错误" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "服务器错误" });
  }
}

module.exports = {
  getMatchedUser,
};
