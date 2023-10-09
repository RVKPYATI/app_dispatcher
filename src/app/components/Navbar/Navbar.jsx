import Link from "next/link";
import Logo from "@/app/components/Logo/Logo";
import { Exit } from "@/app/components/Exit/Exit";
import { User } from "@/app/components/User/User";

export const Navbar = () => {
  return (
    <nav className="fixed flex justify-between ites-center mb-8 w-full h-16 bg-primary shadow-md z-50">
      <div className="flex shrink items-center w-[220px] ">
        <Link
          href="https://%D0%9E%D1%80%D0%B5%D0%BD%D0%B1%D1%83%D1%80%D0%B3-%D0%A3%D1%84%D0%B0.%D1%80%D1%84"
          target="_blank"
        >
          <Logo style={"ml-6"} />
        </Link>
      </div>
      <div className="shrink my-auto justify-center items-center">
        <h1 className="text-baseColor font-bold text-4xl tracking-wide leading-none">
          ДИСПЕТЧЕР
        </h1>
      </div>
      <div className="flex flex-none items-center gap-2 w-[220px] pl-16">
        <User />
        <Exit />
      </div>
    </nav>
  );
};
