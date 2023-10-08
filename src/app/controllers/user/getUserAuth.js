import prisma from "../prismaClient";

export const getUser = async (body) => {
  try {
    const result = await prisma.user.findUnique({
      where: {
        mobile_phone: body,
      },
    });
    return result;
  } catch (error) {
    console.log("Произошла ошибка, код: ", error);
  } finally {
    await prisma.$disconnect();
  }
  return "data";
};
