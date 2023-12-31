"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { useMyContext } from "Context/Context";
import { irish } from "@/fonts";

import whatsapp from "@/assets/whatsapp.png";
import telegram from "@/assets/telegram.png";
import phone from "@/assets/phone.png";

const TrTrip = ({ trips, loadingDel, handleDeleteTrip, deleted }) => {
  const { userData } = useMyContext();
  const [updated, setUpdated] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    time: trips.time,
    direction: trips.direction,
    driverId: trips.driverId,
    free_seats: trips.free_seats,
  });

  const handleCountPlus = () => {
    const newCount = formData.free_seats + 1;
    if (newCount <= userData.seats) {
      setFormData({
        ...formData,
        free_seats: newCount,
      });
    }
  };
  const handleCountMinus = () => {
    const newCount = formData.free_seats - 1;
    if (newCount >= 0) {
      setFormData({
        ...formData,
        free_seats: newCount,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (
      /^\d*$/.test(value) &&
      (value === "" || parseInt(value) <= userData.seats)
    ) {
      setFormData({
        ...formData,
        [name]: value === "" ? "" : Number(value),
      });
    } else {
      alert(`Введите число не больше ${userData.seats}`);
    }
  };

  const handleSubmitUpdate = async () => {
    try {
      setLoading(true);

      const response = await fetch(`/api/trips/${trips.id}`, {
        method: "PUT",
        body: JSON.stringify({ free_seats: formData.free_seats }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const results = await response.json();
      setLoading(false);
      setUpdated(true);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      {trips && (
        <>
          {deleted ? (
            <tr className="bg-zinc-300">
              <td className="text-light text-sm md:text-[8px] text-center py-4">
                {trips.driver.id === userData.id ? "" : trips.driver.full_name}
              </td>
              <td
                className={`font-medium text-2xl md:text-[8px] text-center ${irish.className}`}
              >
                {" "}
                {trips.driver.id === userData.id ? "" : `${trips.time}:00`}
              </td>
              <td
                className={`font-medium text-2xl md:text-sm text-center ${irish.className}`}
              >
                {trips.driver.id === userData.id ? "" : trips.driver.seats}
              </td>
              <td
                className={`font-medium text-2xl md:text-[8px] text-center ${irish.className}`}
              >
                {trips.driver.id === userData.id ? "" : trips.free_seats}
              </td>
              <td className="text-center">
                {trips.driver.id === userData.id ? (
                  ""
                ) : (
                  <Link
                    href={`https://wa.me/${trips.driver.whatsap}`}
                    target="_blank"
                  >
                    <div className="flex justify-center items-center">
                      <Image
                        src={whatsapp}
                        alt="whatsapp"
                        width={33}
                        height={33}
                      />
                    </div>
                  </Link>
                )}
              </td>
              <td>
                {trips.driver.id === userData.id ? (
                  ""
                ) : (
                  <Link
                    href={`https://t.me/${trips.driver.telegram}`}
                    target="_blank"
                  >
                    <div className="flex justify-center items-center">
                      <Image
                        src={telegram}
                        alt="telegram"
                        width={33}
                        height={33}
                      />
                    </div>
                  </Link>
                )}
              </td>
              <td>
                {trips.driver.id === userData.id ? (
                  ""
                ) : (
                  <Link href={`tel:${trips.driver.mobile_phone}`}>
                    <div className="flex justify-center items-center">
                      <Image src={phone} alt="phone" width={30} height={30} />
                    </div>
                  </Link>
                )}
              </td>
            </tr>
          ) : (
            <tr className="bg-zinc-300">
              <td className="text-light text-lg md:text-xs text-center py-4">
                {trips.driver.full_name}
              </td>
              {/* <td
                className={`font-medium text-2xl md:text-xs text-center ${irish.className}`}
              >{`${trips.time}`}</td> */}
              <td
                className={`font-medium text-2xl md:text-xs text-center ${irish.className}`}
              >
                {trips.driver.seats}
              </td>
              <td
                className={`font-medium text-2xl md:text-xs text-center ${irish.className}`}
              >
                {trips.driver.id === userData.id ? (
                  <div className="flex justify-center md:items-center md:flex-col gap-1">
                    <button
                      className="bg-white rounded-full w-8 h-8"
                      onClick={handleCountPlus}
                    >
                      +
                    </button>

                    <input
                      onChange={handleChange}
                      className="w-12 appearance-none border rounded  py-2 px-3 leading-tight focus:outline-none focus:shadow-outline no-spinners md:w-8"
                      type="text"
                      name="free_seats"
                      value={formData.free_seats}
                    />

                    <button
                      className=" bg-white rounded-full w-8 h-8"
                      onClick={handleCountMinus}
                    >
                      -
                    </button>
                  </div>
                ) : (
                  trips.free_seats
                )}
              </td>
              <td className="text-center">
                <Link href={`https://wa.me/${trips.driver.whatsap}`}>
                  <div className="flex justify-center items-center">
                    <Image
                      src={whatsapp}
                      alt="whatsapp"
                      width={33}
                      height={33}
                      className="md:w-7"
                    />
                  </div>
                </Link>
              </td>
              <td>
                <Link href={`https://t.me/${trips.driver.telegram}`}>
                  <div className="flex justify-center items-center">
                    <Image
                      src={telegram}
                      alt="telegram"
                      width={33}
                      height={33}
                      className="md:w-7"
                    />
                  </div>
                </Link>
              </td>
              <td>
                <Link href={`tel:${trips.driver.mobile_phone}`}>
                  <div className="flex justify-center items-center">
                    <Image
                      src={phone}
                      alt="phone"
                      width={30}
                      height={30}
                      className="md:w-7"
                    />
                  </div>
                </Link>
              </td>
            </tr>
          )}
          {trips.driver.id === userData.id ? (
            <>
              <tr>
                <td></td>

                <td>
                  <button
                    onClick={handleSubmitUpdate}
                    disabled={isLoading}
                    className="bg-white border-2 border-primary text-lg md:text-sm text-black w-18 px-4 py-2 rounded hover:bg-primaryHover hover:text-white transition ease-in-out duration-500"
                  >
                    {isLoading ? "Подождите" : "Обновить"}
                  </button>
                </td>
                <td></td>
                <td></td>
                <td>
                  <button
                    onClick={() => handleDeleteTrip(trips.id)}
                    disabled={loadingDel}
                    className="bg-white border-2 border-red-600 text-lg md:text-sm text-black hover:text-white w-18 px-4 py-2 mt-1 rounded hover:bg-primaryHover transition ease-in-out duration-500"
                  >
                    {loadingDel ? "Подождите" : "Удалить"}
                  </button>
                </td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td>
                  <span className=" text-green-500 text-lg font-medium">
                    {updated && "✔️ Сохранено"}
                  </span>
                </td>
              </tr>
            </>
          ) : (
            ""
          )}
        </>
      )}
    </>
  );
};

export { TrTrip };
