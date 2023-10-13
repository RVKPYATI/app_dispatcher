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

        //divRef.current.querySelector("img")
        if (trip.time.slice(0, 2) === time) {
          const filterDirection = directions?.filter(
            (direction) => direction.direction === "Оренбург-Уфа"
          );
          console.log(filterDirection);
          openModal(filterDirection);
        }

        if (
          (divRef.current.textContent.length === 0 &&
            !divRef.current.querySelector("img")) ||
          (divRef.current.textContent.length === 1 &&
            divRef.current.id.substr(3) === "Оренбург-Уфа")
        ) {
          const timeDirect = {};

          timeDirect.time = divRef.current.id.slice(0, 2);
          timeDirect.direction = divRef.current.id.substr(3);

          const filterDirection = [];
          //console.log(filterDirection.length);
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
          (divRef.current.textContent.length === 0 &&
            !divRef.current.querySelector("img")) ||
          (divRef.current.textContent.length === 1 &&
            divRef.current.id.substr(3) === "Уфа-Оренбург")
        ) {
          const timeDirect = {};

          timeDirect.time = divRef.current?.id.slice(0, 2);
          timeDirect.direction = divRef.current?.id.substr(3);

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

      <tr
        key={"main2" + i}
        className={`h-10 font-light text-xs md:text-[6px] ${
          i % 2 === 0 ? "bg-zinc-200" : "bg-zinc-300"
        }`}
      >
        <td
          className="w-[450px] cursor-pointer border-r border-gray-500"
          onClick={() => handleClickLeft(div1Ref)}
          ref={div1Ref}
          id={time + " Оренбург-Уфа"}
          key={"mai" + i}
        >
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
        </td>
        <td
          className={`border-r border-gray-500 text-base md:text-sm text-center ${irish.className}`}
        >
          {countDriverSeats}
        </td>
        <td
          className={` border-r border-gray-500 text-base md:text-sm text-center ${irish.className}`}
        >
          {countfreeSeats}
        </td>
        <td
          className={` text-center text-xl md:text-base font-bold border-r border-gray-500 ${irish.className}`}
        >
          {time + `:00`}
        </td>
        <td
          className="w-[450px] cursor-pointer border-r border-gray-500"
          onClick={() => handleClickRight(div2Ref)}
          ref={div2Ref}
          id={time + " Уфа-Оренбург"}
          key={"mail" + i}
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
        </td>
        <td
          className={`border-r border-gray-500 text-base md:text-sm text-center ${irish.className}`}
        >
          {countDriverSeatsRight}
        </td>
        <td className={`text-base md:text-sm text-center ${irish.className}`}>
          {countfreeSeatsRight}
        </td>
      </tr>
    </>
  );
};

export { MainTableRow };
