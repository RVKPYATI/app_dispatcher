"use client";

//import { MainTable } from "@/app/components/MainTable/MainTable";
import { Navbar } from "../components/Navbar/Navbar";
import { MyProvider } from "Context/Context";
import { MainTable } from "../components/MainTable/MainTable copy";

const main = () => {
  return (
    <>
      <MyProvider>
        <Navbar />
        <MainTable />
      </MyProvider>
    </>
  );
};

export default main;
