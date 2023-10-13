"use client";

import { Navbar } from "../components/Navbar/Navbar";
import { MyProvider } from "Context/Context";
import { MainTable } from "../components/MainTable/MainTable";

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
