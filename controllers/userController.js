const userService = require("../services/userService");

async function getMatchedUser(req, res) {
  const { username } = req.body;

  try {
    const users = await userService.findUserByUsername(username);

    if (users) {
      res.json(users);
    } else {
      res.json([]);
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "服务器错误" });
  }
}

async function followUser(req, res) {
  const { followerId, followingId } = req.body;
  await userService.followUser(followerId, followingId);
  res.json({ success: true });
}

async function unfollowUser(req, res) {
  const { followerId, followingId } = req.body;
  await userService.unfollowUser(followerId, followingId);
  res.json({ success: true });
}

module.exports = {
  getMatchedUser,
  followUser,
  unfollowUser,
};
