import prisma from "../prismaClient";

export const getAllTrips = async () => {
  try {
    const trips = await prisma.trips.findMany();
    return trips;
  } catch (error) {
    console.log("Произошла ошибка ", error);
  } finally {
    prisma.$disconnect();
  }
};

export const getTripsByDayTime = async (cur) => {
  try {
    const formattedDate = cur.toISOString().split("T")[0];

    const trips = await prisma.trips.findMany({
      include: {
        driver: true,
      },
      where: {
        date: {
          gte: new Date(formattedDate),
          lt: new Date(new Date(formattedDate).getTime() + 24 * 60 * 60 * 1000),
        },
      },
    });

    const grouped = {};

    trips.forEach((item) => {
      const time = item.time.split(":")[0] + ":00";

      if (!grouped[time]) {
        grouped[time] = {};
      }

      if (!grouped[time][item.direction]) {
        grouped[time][item.direction] = {
          driverSeats: 0,
          freeSeats: 0,
          items: [],
        };
      }

      grouped[time][item.direction].driverSeats += item.driver.seats;
      grouped[time][item.direction].freeSeats += item.free_seats;
      grouped[time][item.direction].items.push(item);
    });

    const results = Object.entries(grouped).map(([time, directions]) => ({
      time,
      directions: Object.entries(directions).map(([direction, data]) => ({
        direction,
        driverSeats: data.driverSeats,
        freeSeats: data.freeSeats,
        items: data.items,
      })),
    }));

    return results;
  } catch (error) {
    console.log("Произошла ошибка ", error);
  } finally {
    prisma.$disconnect();
  }
};
