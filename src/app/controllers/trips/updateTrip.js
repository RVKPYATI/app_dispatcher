import prisma from "../prismaClient";

export const updateTrip = async (body, id) => {
  try {
    const results = await prisma.trips.update({
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
