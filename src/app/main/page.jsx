"use client";

import { MainTable } from "@/app/components/MainTable/MainTable";
import { MyProvider } from "Context/Context";

const main = () => {
  return (
    <>
      <MyProvider>
        <MainTable />
      </MyProvider>
    </>
  );
};

export default main;
