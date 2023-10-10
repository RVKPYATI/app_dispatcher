"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";

import { fetcher } from "@/utils/helpers";

import { Navbar } from "../Navbar/Navbar";
//import { MainTableRow } from "./MainTableRow";
import { MainTableRow } from "./MainTableRow-copy";

import telegram from "@/assets/telegram.png";
import whatsapp from "@/assets/whatsapp.png";
import arrow_right from "@/assets/arrow_right.svg";
import car from "@/assets/car.svg";
import arrow_white from "@/assets/arrow_white.svg";

const MainTable = () => {
  const timeRange = [
    "00",
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
  ];

  const [currentDay, setCurrentDay] = useState(
    new Date()
  ); /*Стейт с сегодняшним днем*/

  const [day, setDay] = useState("today");
  const [date, setDate] = useState(new Date());
  const [isTomorrow, setIsTomorrow] = useState(false);
  const [dayLabel, setDayLabel] = useState("Сегодня");
  const [dayLabel2, setDayLabel2] = useState("Завтра");

  const { data, isLoading } = useSWR(
    `/api/trips/day?date=${day}`,
    fetcher
  ); /*данные о поездках на текущий день*/

  const handleChangeDay = () => {
    setDay(day === "today" ? "tomorrow" : "today");
    setDayLabel(dayLabel === "Сегодня" ? "Завтра" : "Сегодня");
    setDayLabel2(dayLabel2 === "Завтра" ? "Сегодня" : "Завтра");
    if (isTomorrow) {
      // Если уже установлена дата завтра, вернуть сегодняшнюю дату
      setDate(new Date());
      setIsTomorrow(false);
    } else {
      // Установить дату на завтра
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setDate(tomorrow);
      setIsTomorrow(true);
    }
  };

  return (
    <>
      <Navbar />
      <div className="w-[1200px] pt-20 container mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex gap-7 text-base font-light py-4">
            <Link href="https://t.me/+KkdNVQXSWjVmZ" target="_blank">
              <div className="flex pl-2 items-end gap-1 ">
                <Image src={telegram} alt="telegram" width={33} height={33} />
                <p>Telegram</p>
              </div>
            </Link>
            <Link href="https://chat.whatsapp.com/ABCDEFG12345" target="_blank">
              <div className="flex items-end gap-1 ">
                <Image src={whatsapp} alt="whatsapp" width={33} height={33} />
                <p>Whatsapp</p>
              </div>
            </Link>
          </div>
          <div className="text-4xl mr-24 font-medium">
            {dayLabel}:{" "}
            {date.toLocaleDateString("ru", {
              day: "numeric",
              month: "long",
            })}
          </div>
          <div
            onClick={handleChangeDay}
            className="flex gap-1 text-3xl font-light cursor-pointer"
          >
            {dayLabel2}{" "}
            <Image src={arrow_right} width={34} height={34} alt="arrow" />
          </div>
        </div>
        <div>
          <div className="flex justify-between py-2 bg-zinc-400">
            <div className="flex justify-around items-center w-[600px]">
              <Image src={car} width={37} height={40} alt="car" />
              <div className="text-3xl font-bold  text-baseColor">
                <h1 className="text-shadow">Оренбург-Уфа</h1>
              </div>
              <Image src={arrow_white} width={32} height={35} alt="arrow" />
            </div>
            <div className="flex justify-around items-center w-[600px]">
              <Image
                src={arrow_white}
                width={32}
                height={35}
                className="rotate-180"
                alt="arrow"
              />
              <div className="text-3xl font-bold text-white">
                <h1 className="text-shadow">Уфа-Оренбург</h1>
              </div>
              <Image
                src={car}
                width={37}
                height={40}
                className="scale-x-[-1]"
                alt="car"
              />
            </div>
          </div>
        </div>
        {/*ОБразец*/}
        {/* <div className="flex justify-between items-center font-light text-xs md:text-[6px] bg-zinc-300">
          <div className="flex w-[575px] md:w-[full] justify-between">
            <div className="flex w-[450px] justify-center items-center py-2 border-r border-zinc-500">
              Водители
            </div>
            <div className="flex w-[125px] justify-center items-center leading-none">
              <div className=" w-[50px] py-2 text-center border-r border-zinc-500">
                Всего мест
              </div>
              <div className="w-[75px] py-2 text-center border-r border-zinc-500">
                Свободных мест
              </div>
            </div>
          </div>
          <div className="w-[70px] py-3 px-1 text-center border-r border-zinc-500">
            Диапазон
          </div>
          <div className="flex w-[575px] md:w-[full] justify-between">
            <div className="flex w-[430px] justify-center items-center py-2 border-r border-zinc-500">
              Водители
            </div>
            <div className="flex w-[125px] justify-center items-center leading-none">
              <div className=" w-[50px] py-2 text-center border-r border-zinc-500">
                Всего мест
              </div>
              <div className="w-[75px] py-2 text-center">Свободных мест</div>
            </div>
          </div>
        </div> */}
        <table className="table-fixed border font-light text-xs md:text-[6px] bg-zinc-300">
          <thead>
            <tr>
              <th className="">Водители</th>
              <th>Всего мест</th>
              <th>Свободных мест</th>
              <th>Диапазон</th>
              <th>Водители</th>
              <th>Всего мест</th>
              <th>Свободных мест</th>
            </tr>
          </thead>
          <tbody>
            {timeRange.map((time, i) => (
              <MainTableRow
                key={time + "-main_table" + time}
                tripsByDay={data}
                time={time}
                i={i}
                isLoading={isLoading}
                date={date}
                day={day}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export { MainTable };
