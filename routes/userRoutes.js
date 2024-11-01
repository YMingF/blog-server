const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController.js");

router.post("/filterUser", userController.getMatchedUser);
router.post("/user/follow", userController.followUser);
router.post("/user/unfollow", userController.unfollowUser);
router.post("/user/getFollowees", userController.getFollowees);
module.exports = router;
