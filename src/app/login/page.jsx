"use client"
import Image from "next/image";
import car from "@/assets/car-login.jpg";
import Logo from "@/app/components/Logo/Logo";
import Enter from "@/app/components/Enter/Enter";

export default function Auth() {
  return (
    <div className="flex max-w-full h-screen">
      <Logo style={"absolute inset-0 z-10 m-2"} />
      <div className="flex flex-col relative justify-center items-center w-[35%] md:hidden overflow-hidden">
        <div className="flex justify-center animate-pulse w-[20rem] border-y-2 z-10">
          <h1 className="text-4xl font-bold text-baseColor tracking-wide m-2 z-10">
            ДИСПЕТЧЕР
          </h1>
        </div>
        <Image
          alt="car"
          src={car}
          placeholder="blur"
          quality={100}
          sizes="100vw"
          fill
          style={{
            objectFit: "cover",
          }}
        />
      </div>
      <div className="flex flex-col items-center md:justify-center md:text-center w-[65%] md:w-full bg-baseColor">
        <h1 className="text-5xl font-bold pt-10 md:pt-2 mb-2 mx-auto text-primary">
          Добро пожаловать!
        </h1>
        <Enter />
      </div>
    </div>
  );
}
