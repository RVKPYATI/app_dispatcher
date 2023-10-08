import prisma from "../prismaClient";

export const getTripById = async (id) => {
  try {
    const trip = await prisma.trips.findUnique({
      where: {
        id: id,
      },
    });
    return trip;
  } catch (error) {
    console.log("Произошла ошибка ", error);
  } finally {
    prisma.$disconnect();
  }
};
