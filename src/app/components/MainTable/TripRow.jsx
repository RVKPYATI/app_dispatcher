"use client";

import { useState } from "react";
import { TrTrip } from "./TrTrip";
import { NewTrip } from "./NewTrip";
import { useMyContext } from "Context/Context";
import { irish } from "@/fonts";

const TripRow = ({ data, direct, timeDirect, date }) => {
  const { userData } = useMyContext();
  const [visibleUser, setVisibleUser] = useState(false);
  const [isLoadingDel, setLoadingDel] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const handleClickAdd = async () => {
    setVisibleUser(true);
  };

  const handleDeleteTrip = async (tripId) => {
    try {
      setLoadingDel(true);
      const response = await fetch(`/api/trips/${tripId}`, {
        method: "DELETE",
      });
      await response.json();
      setLoadingDel(false);
      setDeleted(true);
    } catch (error) {
      console.error(error);
      setLoadingDel(false);
    }
  };

  if (data.length > 0) {
    const { items } = data[0];
    const { direction, time } = items[0];

    const userExists = items.some((item) => item.driverId === userData.id);
    return (
      <>
        {items && (
          <>
            <div>
              <div className="flex md:w-full justify-between items-center py-5 md:py-2 px-10 md:px-0">
                <div className="font-light text-4xl md:text-base md:pl-2">
                  {direction}
                </div>
                <div
                  className={`mx-16 md:mx-8 font-normal text-6xl md:text-lg md:text-center ${irish.className}`}
                >
                  {`${time} - ${time.slice(0, 2)}:59`}
                </div>
                <div key={time + "2"}>
                  <button
                    onClick={handleClickAdd}
                    className={`w-[179px] md:w-full md:text-sm font-light bg-blue-950 rounded-md text-white px-1 py-4 hover:border-red-500 border-2 ${
                      userExists ? "invisible" : "visible"
                    }`}
                  >
                    Добавить себя
                  </button>
                </div>
              </div>
            </div>
            <table className="table-fixed w-[1197px] md:w-full">
              <thead className="text-[8px]">
                <tr className=" bg-zinc-200">
                  <th className="font-light w-[300px] md:w-[70px] text-center py-4">
                    ФИО
                  </th>
                  <th className="font-light text-center py-4">Время</th>
                  <th className="font-light text-center py-4">
                    Посадочных мест
                  </th>
                  <th className="font-light text-center py-4">
                    Свободных мест
                  </th>
                  <th className="font-light text-center py-4">WhatsApp</th>
                  <th className="font-light text-center py-4">Telegram</th>
                  <th className="font-light text-center py-4">
                    Звонок водителю
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((data, i) => (
                  <TrTrip
                    key={`${i}-trips-${i}`}
                    trips={data}
                    isExist={userExists}
                    handleDeleteTrip={handleDeleteTrip}
                    loadingDel={isLoadingDel}
                    deleted={deleted}
                  />
                ))}
                {visibleUser && (
                  <NewTrip
                    trips={data}
                    time={time}
                    direction={direction}
                    date={date}
                  />
                )}
              </tbody>
            </table>
          </>
        )}
      </>
    );
  }
  if (data.length === 0) {
    return (
      <>
        <div>
          <div className="flex md:w-full justify-between items-center py-5 md:py-2 px-10 md:px-0">
            <div className="font-light text-4xl md:text-base md:pl-2">
              {timeDirect.direction}
            </div>
            <div
              className={`mx-16 md:mx-8 font-normal text-6xl md:text-lg md:text-center ${irish.className}`}
            >
              {`${timeDirect.time}:00 - ${timeDirect.time.slice(0, 2)}:59`}
            </div>
            <div>
              <button
                onClick={handleClickAdd}
                className={`w-[179px] md:w-full md:text-sm font-light bg-blue-950 rounded-md text-white px-1 py-4 hover:border-red-500 border-2`}
              >
                Добавить себя
              </button>
            </div>
          </div>
        </div>
        <table className="table-fixed w-[1197px] md:w-full">
          <thead className="text-[8px]">
            <tr className=" bg-zinc-200">
              <th className="font-light w-[300px] md:w-[70px] text-center py-4">
                ФИО
              </th>
              <th className="font-light text-center py-4">Время</th>
              <th className="font-light text-center py-4">Посадочных мест</th>
              <th className="font-light text-center py-4">Свободных мест</th>
              <th className="font-light text-center py-4">WhatsApp</th>
              <th className="font-light text-center py-4">Telegram</th>
              <th className="font-light text-center py-4">Звонок водителю</th>
            </tr>
          </thead>
          <tbody>
            {visibleUser ? (
              <NewTrip
                trips={data}
                time={timeDirect.time}
                direction={timeDirect.direction}
                date={date}
              />
            ) : (
              <tr>
                <td></td>
                <td></td>

                <td className="font-medium text-xl text-center md:text-base">
                  Поездок нет
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </>
    );
  }
};
export { TripRow };
