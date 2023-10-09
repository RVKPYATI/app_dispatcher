import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { useMyContext } from "Context/Context";
import { irish } from "@/fonts";
import whatsapp from "@/assets/whatsapp.png";
import telegram from "@/assets/telegram.png";
import phone from "@/assets/phone.png";

const NewTrip = ({ time, direction, date }) => {
  const { userData } = useMyContext();

  const [isLoading, setIsLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [formData, setFormData] = useState({
    time: time,
    direction: direction,
    driverId: userData.id,
    free_seats: userData.seats,
    date: date,
  });

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

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);

      const response = await fetch("/api/trips", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const results = await response.json();
      setIsLoading(false);
      setSaved(true);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <tr className="bg-zinc-300">
        <td className="text-light text-lg text-center py-4">
          {userData.full_name}
        </td>
        <td className={`font-medium text-2xl text-center ${irish.className}`}>
          {time + ":00"}
        </td>
        <td className={`font-medium text-2xl text-center ${irish.className}`}>
          {userData.seats}
        </td>
        <td className={`font-medium text-2xl text-center ${irish.className}`}>
          <input
            onChange={handleChange}
            className="w-12 appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline no-spinners"
            type="text"
            name="free_seats"
            value={formData.free_seats}
          />
        </td>
        <td className="text-center">
          <Link href={`https://wa.me/${userData.whatsap}`}>
            <div className="flex justify-center items-center">
              <Image src={whatsapp} alt="whatsapp" width={33} height={33} />
            </div>
          </Link>
        </td>
        <td>
          <Link href={`https://t.me/${userData.telegram}`}>
            <div className="flex justify-center items-center">
              <Image src={telegram} alt="telegram" width={33} height={33} />
            </div>
          </Link>
        </td>
        <td>
          <Link href={`tel:${userData.mobile_phone}`}>
            <div className="flex justify-center items-center">
              <Image src={phone} alt="phone" width={30} height={30} />
            </div>
          </Link>
        </td>
      </tr>

      <tr>
        <td></td>
        <td></td>
        <td>
          {saved ? (
            ""
          ) : (
            <button
              onClick={handleSubmit}
              disabled={saved}
              className="bg-white border-2 border-primary text-lg text-black w-32 px-4 py-2 mt-1 rounded hover:text-white hover:bg-primaryHover transition ease-in-out duration-500"
            >
              {isLoading ? "Подождите" : "Сохранить"}
            </button>
          )}
        </td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td>
          <span className=" text-green-500 text-lg font-medium">
            {saved && "✔️ Сохранено"}
          </span>
        </td>
      </tr>
    </>
  );
};

export { NewTrip };
