import prisma from "../prismaClient";

export const createTrip = async (body) => {
  try {
    if (body.date) {
      body.date = new Date(body.date).toISOString();
    }

    const results = await prisma.trips.create({
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
