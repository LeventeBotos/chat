import React from "react";
import { Navbar } from "../Navbar";

const page = () => {
  return (
    <div className="text-white h-screen text-2xl md:text-4xl flex flex-col text-center justify-evenly">
      <Navbar />
      <p className="h-full text-center flex flex-col justify-evenly">
        {" "}
        Dont be a dick.
      </p>
    </div>
  );
};

export default page;
