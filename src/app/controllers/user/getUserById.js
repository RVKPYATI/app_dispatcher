import prisma from "../prismaClient";

export const getUserById = async (id) => {
  try {
    const results = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    return results;
  } catch (error) {
    console.log("Произошла ошибка ", error);
  } finally {
    prisma.$disconnect();
  }
};
