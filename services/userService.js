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

module.exports = {
  findUserByUsername,
};
