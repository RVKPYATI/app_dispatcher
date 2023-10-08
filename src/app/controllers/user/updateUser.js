import prisma from "../prismaClient";

export const updateUser = async (body, id) => {
  try {
    const results = await prisma.user.update({
      where: {
        id: id,
      },
      data: body,
    });

    return results;
  } catch (error) {
    console.log("Произошла ошибка, код: ", error);
  } finally {
    prisma.$disconnect();
  }
  return "data";
};
