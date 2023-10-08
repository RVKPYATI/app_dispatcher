import prisma from "../prismaClient";

export const deleteTrip = async (id) => {
  try {
    const results = await prisma.trips.delete({
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
