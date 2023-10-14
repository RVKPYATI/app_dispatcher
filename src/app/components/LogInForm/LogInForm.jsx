"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import loader from "@/assets/loader.svg";
import { useLocalStorage } from "@/hooks/useLocalStorage";

function LogInForm({ reg }) {
  const [formData, setFormData] = useState({
    mobile_phone: "",
    password: "",
  });
  const [auth, setAuth] = useState(true);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setValue } = useLocalStorage();

  const getAuth = async (credentials) => {
    const { mobile_phone, password } = credentials;
    const mobilePhone = encodeURIComponent(mobile_phone);
    const url = `/api/users?phone=${mobilePhone}&pass=${password}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("Ошибка", error);
    }
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

    if (!formData.mobile_phone.trim()) {
      newErrors.mobile_phone = "Введите корректный номер телефона";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Поле не может быть пустым";
    }

    if (Object.keys(newErrors).length === 0) {
      const credentials = {
        mobile_phone: formData.mobile_phone,
        password: formData.password,
      };

      setLoading(true);

      try {
        const serverResponse = await getAuth(credentials);
        if (serverResponse.status === 400) setAuth(false);
        setFormData({
          mobile_phone: "",
          password: "",
        });
        setErrors({
          mobile_phone: "",
          password: "",
        });
        setLoading(false);

        if (serverResponse.status === 200) {
          setLoading(true);
          const id = serverResponse.user.id;
          setValue("Authorization", id);
          router.push("/");
        }
      } catch (error) {
        console.error("Ошибка", error);
      }
    } else {
      // Обновляем состояние ошибок
      setErrors(newErrors);
    }
  };

  return (
    <>
      <div className="w-full px-5 text-center">
        <h2 className="text-primary font-light mb-10">
          Для входа в систему введите свои данные
        </h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap ml-24 mr-24 md:ml-1 md:mr-2 mb-8 md:mb-2 justify-between">
          <div className="mb-4 font-light">
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
          <div className="mb-4 font-light">
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
        </div>

        <div className="flex flex-col items-center mb-10">
          <h2
            className={`${
              auth ? "invisible" : "visible"
            } text-red-600 font-light mb-8 sm:mb-4`}
          >
            Неверные логин или пароль
          </h2>
          <button
            type="submit"
            className="relative flex justify-center bg-primary text-baseColor w-60 h-11 px-4 py-2 rounded hover:bg-primaryHover transition ease-in-out duration-500"
          >
            {loading ? "" : "Войти"}
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
                }}
              />
            )}
          </button>
        </div>
      </form>

      <div className="flex w-full justify-center ">
        <p className="text-primary font-light text-sm">
          У меня нет аккаунта.{" "}
          <span
            className="font-bold underline cursor-pointer md:hidden"
            onClick={() => reg(true)}
          >
            Зарегистрироваться
          </span>
        </p>
      </div>
      <p className="text-primary font-light text-sm hidden md:block">
        Для регистрации в системе обратитесь к диспетчеру.
      </p>
    </>
  );
}

export default LogInForm;
