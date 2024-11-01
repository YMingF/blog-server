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

async function getFollowees(followerId) {
  return await prisma.follow.findMany({
    where: { followerId },
    include: {
      following: {
        select: {
          id: true,
          username: true,
          uuid: true,
        },
      },
    },
  });
}

module.exports = {
  findUserByUsername,
  followUser,
  unfollowUser,
  getFollowees,
};
