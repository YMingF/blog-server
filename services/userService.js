const prisma = require("../models/userModel");

async function findUserByUsername(username) {
  if (!username || username.trim() === "") {
    return [];
  }

  return await prisma.user.findMany({
    where: {
      username: {
        contains: username,
        mode: "insensitive",
      },
    },
  });
}

async function followUser(followerId, followingId) {
  return await prisma.follow.create({
    data: { followerId, followingId },
  });
}

async function unfollowUser(followerId, followingId) {
  return await prisma.follow.delete({
    where: { followerId_followingId: { followerId, followingId } },
  });
}

module.exports = {
  findUserByUsername,
  followUser,
  unfollowUser,
};
