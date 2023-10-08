import prisma from "../prismaClient";

export const getAllUsers = async () => {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    console.log("Произошла ошибка ", error);
  } finally {
    prisma.$disconnect();
  }
};
