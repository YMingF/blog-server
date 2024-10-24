const prisma = require("../models/userModel");

async function findUserByUsername(username) {
  return await prisma.user.findMany({
    where: {
      username: {
        contains: username,
        mode: "insensitive", // Optional: makes the search case-insensitive
      },
    },
  });
}

module.exports = {
  findUserByUsername,
};
