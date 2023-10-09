"use client";

import { useState } from "react";
import { useSWRConfig } from "swr";
import { fetcher } from "@/utils/helpers";
import Image from "next/image";
import { useMyContext } from "Context/Context";
import { formatName } from "@/utils/helpers";
import { UploadAvatar } from "../UploadAvatar/UploadAvatar";

export function User() {
  const { mutate } = useSWRConfig();
  const { userData, setUserData } = useMyContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [changed, setChanged] = useState(null);

  const changeAvatar = async (data = { avatar: "" }, id) => {
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.log("Ошибка изменения аватара", error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClickSave = async () => {
    const avatarChanged = await changeAvatar({ avatar: changed }, userData.id);

    setUserData((prevUserData) => ({
      ...prevUserData,
      avatar: changed,
    }));
    setIsMenuOpen(false);
    mutate(`/api/users/${userData.id}`, fetcher(`/api/users/${userData.id}`));
    mutate(`/api/trips/day?date=today`, fetcher(`/api/trips/day?date=today`));
  };

  const handleClickClear = async () => {
    const avatar = "";
    const avatarClear = await changeAvatar({ avatar }, userData.id);

    setUserData((prevUserData) => ({
      ...prevUserData,
      avatar,
    }));

    setIsMenuOpen(false);
  };

  return (
    <>
      <div className="relative">
        {userData && userData?.avatar && (
          <Image
            key={userData.avatar}
            src={userData.avatar}
            className="border-baseColor border-2 rounded-full w-11 h-11 md:w-6 md:h-6 cursor-pointer"
            width={34}
            height={34}
            alt="Avatar Driver"
            onClick={toggleMenu}
          />
        )}
        {userData && !userData?.avatar && (
          <div
            className="flex items-center justify-center ml-1 my-2 w-9 h-9 md:w-6 md:h-6 shadow-xl outline outline-offset-2 outline-2 outline-baseColor bg-driver1 border-gray-700 border-2 rounded-full cursor-pointer"
            onClick={toggleMenu}
          >
            <span className="font-medium text-base text-baseColor drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] md:text-xs">
              {userData?.full_name && formatName(userData?.full_name)}
            </span>
          </div>
        )}
        {isMenuOpen && (
          <div className="absolute flex flex-col items-center top-16 md:top-10 left-0 -translate-x-8 w-40 md:w-20 md:leading-none p-2 bg-primary border-gray-300 rounded shadow-lg z-50 text-center text-baseColor">
            <UploadAvatar avatarChange={setChanged} />
            <div className="flex text-sm gap-2 pt-2 justify-between">
              <button className="hover:text-red-300" onClick={handleClickSave}>
                Сохранить
              </button>
              <button className="hover:text-red-300" onClick={handleClickClear}>
                Сбросить
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
