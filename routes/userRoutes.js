const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/filterUser", userController.getMatchedUser);
router.post("/user/follow", userController.followUser);
router.post("/user/unfollow", userController.unfollowUser);
module.exports = router;
