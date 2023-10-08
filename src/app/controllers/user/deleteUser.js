import prisma from "../prismaClient";

export const deleteUser = async (id) => {
  try {
    const results = await prisma.user.delete({
      where: {
        id: id,
      },
    });

    return results;
  } catch (error) {
    console.log("Произошла ошибка, код: ", error);
  } finally {
    prisma.$disconnect();
  }
  return "data";
};
