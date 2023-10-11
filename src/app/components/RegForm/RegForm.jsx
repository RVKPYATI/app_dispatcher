"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
// import Avatar from "react-avatar-edit";
import { UploadAvatar } from "../UploadAvatar/UploadAvatar";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import loader from "@/assets/loader.svg";

const RegForm = ({ reg }) => {
  const [formData, setFormData] = useState({
    full_name: "",
    mobile_phone: "",
    password: "",
    car: "",
    seats: "",
    whatsap: "",
    telegram: "",
  });
  const [auth, setAuth] = useState(true);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setValue } = useLocalStorage();
  const [changed, setChanged] = useState(null);

  const regUser = async (user) => {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Простая валидация
    const newErrors = {};

    if (!formData.full_name.trim()) {
      newErrors.full_name = "Поле не может быть пустым";
    }

    if (!formData.mobile_phone.trim()) {
      newErrors.mobile_phone = "Введите корректный номер телефона";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Поле не может быть пустым";
    }

    if (!formData.seats.trim()) {
      newErrors.seats = "Введите корректное число";
    }

    if (!formData.car.trim()) {
      newErrors.car = "Введите марку автомобиля";
    }

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      const user = {
        ...formData,
        seats: Number(formData.seats),
        avatar: changed,
      };

      const responseServer = await regUser(user);

      if (responseServer?.response?.id) {
        const clientID = responseServer?.response.id;
        setValue("Authorization", clientID);
        alert("Регистрация успешно завершена!");
        router.push("/");
      }
      if (responseServer?.response?.status) {
        setAuth(false);
        setLoading(false);
      }
    } else {
      // Обновляем состояние ошибок
      setErrors(newErrors);
    }
  };

  return (
    <>
      <div className="w-full px-5 text-center md:mt-[16rem]">
        <h2 className="text-primary font-light mb-6 md:mt-14">
          Для регистрации в системе введите свои учетные данные
        </h2>
      </div>
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex flex-wrap ml-24 mr-20 sm:ml-1 sm:mr-2 mb-2 justify-between">
          <div className="mb-2 font-light">
            <label
              htmlFor="full_name"
              className="block text-start text-primary text-sm"
            >
              ФИО
              <span className="text-red-600"> *</span>
              <span className="text-primary text-xs"> (обязательное поле)</span>
            </label>
            <input
              type="text"
              id="full_name"
              name="full_name"
              placeholder="Иванов Иван Иванович"
              value={formData.full_name}
              onChange={handleChange}
              className="mt-1 block w-80 focus:outline-dotted focus:outline-2 focus:outline-offset-2 focus:outline-zinc-300 rounded py-2 px-3 bg-white"
            />
            {errors.full_name && (
              <p className="text-red-500 mt-2 font-light text-xs">
                {errors.full_name}
              </p>
            )}
          </div>
          <div className="mb-2 font-light">
            <label
              htmlFor="mobile_phone"
              className="block text-start text-primary text-sm"
            >
              Мобильный телефон
              <span className="text-red-600"> *</span>
              <span className="text-primary text-xs"> (обязательное поле)</span>
            </label>
            <input
              type="tel"
              id="mobile_phone"
              name="mobile_phone"
              placeholder="+79998887766"
              pattern="^((\+7|7|8)+([\- ])?(\(?\d{3}\)?[\- ]?)?(\d{3}[\- ]?\d{2}[\- ]?\d{2}))$"
              value={formData.mobile_phone}
              onChange={handleChange}
              className="mt-1 block w-80 focus:outline-dotted focus:outline-2 focus:outline-offset-2 focus:outline-zinc-300 rounded py-2 px-3 bg-white"
            />
            {errors.mobile_phone && (
              <p className="text-red-500 mt-2 font-light text-xs">
                {errors.mobile_phone}
              </p>
            )}
          </div>
          <div className="mb-2 mt-4 font-light">
            <label
              htmlFor="car"
              className="block text-start text-primary text-sm"
            >
              Марка автомобиля
              <span className="text-red-600"> *</span>
              <span className="text-primary text-xs"> (обязательное поле)</span>
            </label>
            <input
              type="text"
              id="car"
              name="car"
              placeholder="Honda CR-V"
              value={formData.car}
              onChange={handleChange}
              className="mt-1 block w-80 focus:outline-dotted focus:outline-2 focus:outline-offset-2 focus:outline-zinc-300 rounded py-2 px-3 bg-white"
            />
            {errors.car && (
              <p className="text-red-500 mt-2 font-light text-xs">
                {errors.car}
              </p>
            )}
          </div>
          <div className="mb-2 mt-4 font-light">
            <label
              htmlFor="seats"
              className="block text-start text-primary text-sm"
            >
              Количество мест
              <span className="text-red-600"> *</span>
              <span className="text-primary text-xs"> (обязательное поле)</span>
            </label>
            <input
              type="text"
              id="seats"
              name="seats"
              pattern="^[0-9]+$"
              placeholder="4"
              value={formData.seats}
              onChange={handleChange}
              className="mt-1 block w-80 focus:outline-dotted focus:outline-2 focus:outline-offset-2 focus:outline-zinc-300 rounded py-2 px-3 bg-white"
            />
            {errors.seats && (
              <p className="text-red-500 mt-2 font-light text-xs">
                {errors.seats}
              </p>
            )}
          </div>
          <div className="mb-2 mt-4 font-light">
            <label
              htmlFor="whatsap"
              className="block text-start text-primary text-sm"
            >
              Телефон в Whatsapp
            </label>
            <input
              type="tel"
              id="whatsap"
              name="whatsap"
              pattern="^((\+7|7|8)+([\- ])?(\(?\d{3}\)?[\- ]?)?(\d{3}[\- ]?\d{2}[\- ]?\d{2}))$"
              placeholder="+79996665544"
              value={formData.whatsap}
              onChange={handleChange}
              className="mt-1 block w-80 focus:outline-dotted focus:outline-2 focus:outline-offset-2 focus:outline-zinc-300 rounded py-2 px-3 bg-white"
            />
            {errors.whatsap && (
              <p className="text-red-500 mt-2 font-light text-xs">
                {errors.whatsap}
              </p>
            )}
          </div>
          <div className="mb-2 mt-4 font-light">
            <label
              htmlFor="telegram"
              className="block text-start text-primary text-sm"
            >
              Никнейм в Telegram
            </label>
            <input
              type="text"
              id="telegram"
              name="telegram"
              placeholder="ivanych93"
              value={formData.telegram}
              onChange={handleChange}
              className="mt-1 block w-80 focus:outline-dotted focus:outline-2 focus:outline-offset-2 focus:outline-zinc-300 rounded py-2 px-3 bg-white"
            />
            {errors.telegram && (
              <p className="text-red-500 mt-2 font-light text-xs">
                {errors.telegram}
              </p>
            )}
          </div>
          <div className="mt-2 font-light">
            <label
              htmlFor="password"
              className="block text-start text-primary text-sm"
            >
              Пароль
              <span className="text-red-600"> *</span>
              <span className="text-primary text-xs"> (обязательное поле)</span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-80 focus:outline-dotted focus:outline-2 focus:outline-offset-2 focus:outline-zinc-300 rounded py-2 px-3 bg-white"
            />
            {errors.password && (
              <p className="text-red-500 mt-2 font-light text-xs">
                {errors.password}
              </p>
            )}
          </div>
          <div className="flex justify-between font-light">
            <p className="pr-28 pt-3  text-primary text-sm">Аватар</p>

            <UploadAvatar avatarChange={setChanged} />
          </div>
        </div>
        <div className="flex flex-col items-center">
          <h2
            className={`${
              auth ? "invisible" : "visible"
            } text-red-600 font-light mb-2`}
          >
            Пользователь с таким номером телефона уже есть
          </h2>
          <button
            type="submit"
            className="relative flex justify-center bg-primary text-baseColor w-60 h-11 px-4 py-2 mb-6 rounded hover:bg-primaryHover transition ease-in-out duration-500"
          >
            {loading ? "" : "Зарегистрироваться"}
            {loading && (
              <Image
                alt="loading"
                src={loader}
                // placeholder='blur'
                quality={80}
                // sizes='100vw'
                width={30}
                height={30}
                style={{
                  margin: "0 auto",
                  position: "absolute",
                  top: "8px",
                  left: "108px",
                }}
              />
            )}
          </button>
          <div className="flex w-full justify-center">
            <p className="text-primary font-light text-sm">
              У меня есть аккаунт.{" "}
              <span
                className="font-bold underline cursor-pointer"
                onClick={() => reg(false)}
              >
                Войти
              </span>{" "}
              в систему
            </p>
          </div>
        </div>
      </form>
    </>
  );
};

export default RegForm;
