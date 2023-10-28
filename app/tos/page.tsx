import React from "react";
import { Navbar } from "../Navbar";

const page = () => {
  return (
    <div className="text-white h-screen flex flex-col text-center justify-evenly">
      <Navbar />
      <p className="h-full text-center text-2xl md:text-4xl  flex flex-col justify-evenly">
        {" "}
        Please refrain from engaging in discourteous or offensive behavior.
      </p>
    </div>
  );
};

export default page;
