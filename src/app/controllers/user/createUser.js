import prisma from "../prismaClient";

export const createUser = async (body) => {
  try {
    const results = await prisma.user.create({
      data: body,
    });
    return results;
  } catch (error) {
    if (error.code === 'P2002') return ({status: 400, message: "Пользователь уже существует"})
    console.log("Произошла ошибка, код: ", error);
  } finally {
    prisma.$disconnect();
  }
  return "data";
};
