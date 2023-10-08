"use client";
import { useState } from "react";
import { useRef } from "react";
import { useSWRConfig } from "swr";

import { Loading } from "../Loading/Loading";
import { TripInfo } from "./TripInfo";
import { TripRow } from "./TripRow";
import { Modal } from "../Modal/Modal";
import { irish } from "@/fonts/fonts";
import { fetcher } from "@/utils/helpers";

const MainTableRow = ({ tripsByDay, isLoading, time, i, date, day }) => {
  const { mutate } = useSWRConfig();
  const div1Ref = useRef(null);
  const div2Ref = useRef(null);
  const [filterData, setFilterData] = useState(null);
  const [timeDirect, setTimeDirect] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (filterDirection, timeDirect) => {
    setIsModalOpen(true);
    setFilterData(filterDirection);
    setTimeDirect(timeDirect);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    mutate(`/api/trips/day?date=${day}`, fetcher(`/api/trips/day?date=${day}`));
  };

  const handleClickLeft = (divRef) => {
    const timeDirect = {};
    const filterDirection = [];
    timeDirect.time = divRef.current.id.slice(0, 2);
    timeDirect.direction = divRef.current.id.substr(3);
    openModal(filterDirection, timeDirect);

    tripsByDay &&
      tripsByDay.map((trip) => {
        const { directions } = trip;

        if (trip.time.slice(0, 2) === time) {
          const filterDirection = directions?.filter(
            (direction) => direction.direction === "Оренбург-Уфа"
          );

          openModal(filterDirection);
        }

        if (
          divRef.current.textContent.length === 0 ||
          (divRef.current.textContent.length === 1 &&
            divRef.current.id.substr(3) === "Оренбург-Уфа")
        ) {
          const timeDirect = {};

          timeDirect.time = divRef.current.id.slice(0, 2);
          timeDirect.direction = divRef.current.id.substr(3);

          const filterDirection = [];

          openModal(filterDirection, timeDirect);
        }
      });
  };

  const handleClickRight = (divRef) => {
    const timeDirect = {};
    const filterDirection = [];
    timeDirect.time = divRef.current.id.slice(0, 2);
    timeDirect.direction = divRef.current.id.substr(3);
    openModal(filterDirection, timeDirect);

    tripsByDay &&
      tripsByDay.map((trip) => {
        const { directions } = trip;

        if (trip.time.slice(0, 2) === time) {
          const filterDirection = directions?.filter(
            (direction) => direction.direction === "Уфа-Оренбург"
          );

          openModal(filterDirection);
        }

        if (
          divRef.current.textContent.length === 0 ||
          (divRef.current.textContent.length === 1 &&
            divRef.current.id.substr(3) === "Уфа-Оренбург")
        ) {
          const timeDirect = {};

          timeDirect.time = divRef.current.id.slice(0, 2);
          timeDirect.direction = divRef.current.id.substr(3);

          const filterDirection = [];

          openModal(filterDirection, timeDirect);
        }
      });
  };

  const directionsData = [];
  const directionsData2 = [];
  let countDriverLeft = [];
  let countDriverRight = [];
  let countfreeSeats = "";
  let countDriverSeats = "";
  let countfreeSeatsRight = "";
  let countDriverSeatsRight = "";

  tripsByDay &&
    tripsByDay.forEach((trip) => {
      //
      if (trip.time.slice(0, 2) === time) {
        const { directions } = trip;
        directions.forEach((tripDirect) => {
          if (tripDirect.direction === "Оренбург-Уфа") {
            countDriverLeft = tripDirect.items;

            countfreeSeats = tripDirect.freeSeats;
            countDriverSeats = tripDirect.driverSeats;
          }
          if (tripDirect.direction === "Уфа-Оренбург") {
            countDriverRight = tripDirect.items;
            countfreeSeatsRight = tripDirect.freeSeats;
            countDriverSeatsRight = tripDirect.driverSeats;
          }
        });
      }
    });

  return (
    <>
      {/*Главный div (линия для каждого промежутка времени)*/}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <TripRow data={filterData} timeDirect={timeDirect} date={date} />
      </Modal>

      <div
        key={"main" + i}
        className={`flex justify-between items-center font-light text-xs md:text-[6px] ${
          i % 2 === 0 ? "bg-zinc-200" : "bg-zinc-300"
        }`}
      >
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <div
              key={"main2" + i}
              onClick={() => handleClickLeft(div1Ref)}
              ref={div1Ref}
              id={time + " Оренбург-Уфа"}
              className={`flex w-[575px] md:w-[full] justify-between items-center cursor-pointer`}
            >
              {/*div левый столбец Оренбург-Уфа*/}
              <div
                className={`flex flex-wrap gap-[2px] w-[450px] justify-start pl-1 border-r border-zinc-500 items-center
              ${countDriverRight.length > 10 ? "h-24" : ""} ${
                  countDriverLeft.length > 10 ? "h-24" : ""
                }`}
              >
                {countDriverLeft.length === 0 && <div className="h-12"></div>}
                {tripsByDay &&
                  tripsByDay.map((trip, i) => {
                    const { directions } = trip;
                    if (trip.time.slice(0, 2) === time) {
                      directionsData2.push(directions);
                      return (
                        <TripInfo
                          key={i + "_left_" + i}
                          data={directions}
                          direct="Оренбург-Уфа"
                          timeText={time}
                        />
                      );
                    }
                  })}
              </div>
              <div className="flex w-[125px] justify-center items-center leading-none">
                <div
                  className={`flex justify-center items-center w-[50px] h-11 text-lg font-medium py-2 border-r border-zinc-500 ${
                    irish.className
                  } ${countDriverRight.length > 10 ? "h-24" : ""} ${
                    countDriverLeft.length > 10 ? "h-24" : ""
                  }`}
                >
                  {countDriverSeats}
                </div>
                <div
                  className={`flex justify-center items-center w-[75px] h-11 text-lg font-medium py-2 border-r border-zinc-500 ${
                    irish.className
                  } ${countDriverRight.length > 10 ? "h-24" : ""} ${
                    countDriverLeft.length > 10 ? "h-24" : ""
                  }`}
                >
                  {countfreeSeats}
                </div>
              </div>
            </div>
          </>
        )}

        <div
          className={`flex items-center justify-center w-[70px] h-11 px-1 text-center text-xl font-bold border-r border-zinc-500 ${
            irish.className
          } ${countDriverRight.length > 10 ? "h-24" : ""} ${
            countDriverLeft.length > 10 ? "h-24" : ""
          }`}
        >
          {time + `:00`}
        </div>
        {/*Центральный столбец время*/}

        {isLoading ? (
          <Loading />
        ) : (
          <>
            <div
              key={"mai2" + i}
              onClick={() => handleClickRight(div2Ref)}
              ref={div2Ref}
              id={time + " Уфа-Оренбург"}
              className={`flex w-[575px] md:w-[full] justify-between cursor-pointer`}
            >
              {/*div правый столбец Уфа-Оернбург*/}
              <div
                className={`flex flex-wrap gap-[2px] w-[430px] justify-start pl-1 border-r border-zinc-500 items-center
              ${countDriverRight.length > 10 ? "h-24" : ""} ${
                  countDriverLeft.length > 10 ? "h-24" : ""
                }`}
              >
                {tripsByDay &&
                  tripsByDay.map((trip, i) => {
                    const { directions } = trip;
                    if (trip.time.slice(0, 2) === time) {
                      directionsData.push(directions);
                      return (
                        <TripInfo
                          key={i + "_left_" + i}
                          data={directions}
                          direct="Уфа-Оренбург"
                          timeText={time}
                        />
                      );
                    }
                  })}
              </div>
              <div className="flex w-[125px] justify-center items-center leading-none">
                <div
                  className={`w-[50px] h-11 text-lg font-medium py-2 text-center border-r border-zinc-500 ${
                    irish.className
                  } ${countDriverRight.length > 10 ? "h-24" : ""} ${
                    countDriverLeft.length > 10 ? "h-24" : ""
                  }`}
                >
                  {countDriverSeatsRight}
                </div>
                <div
                  className={`w-[75px] h-11 text-lg font-medium py-2 text-center  border-zinc-500 ${
                    irish.className
                  } ${countDriverRight.length > 10 ? "h-24" : ""} ${
                    countDriverLeft.length > 10 ? "h-24" : ""
                  }`}
                >
                  {countfreeSeatsRight}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export { MainTableRow };
