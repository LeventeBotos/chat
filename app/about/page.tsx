import React from "react";
import { Navbar } from "../Navbar";
import Text from "./Text";
import Faq from "./Faq";

const page = () => {
  return (
    <div className="w-full text-white p-5  text-lg md:text-xl flex flex-col justify-evenly">
      <Navbar />
      <Text />
      <Faq />
    </div>
  );
};

export default page;
