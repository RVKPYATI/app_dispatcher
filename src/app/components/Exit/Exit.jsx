"use client";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useRouter } from "next/navigation";

export function Exit() {
  const router = useRouter();
  const { removeValue } = useLocalStorage();

  const handleClick = () => {
    removeValue("Authorization");
    router.push("/login");
  };
  return (
    <div
      className="ml-4 border-b-2 border-b-red-700 py-1 cursor-pointer text-baseColor text-lg md:text-base leading-none hover:text-red-400"
      onClick={handleClick}
    >
      Выход
    </div>
  );
}
