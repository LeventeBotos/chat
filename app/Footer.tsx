"use client";
import { SignOutHook } from "react-firebase-hooks/auth";
import React from "react";
import { auth } from "./Firebase";
import { signOut } from "firebase/auth";

const Footer = () => {
  return (
    <div className="w-full flex py-5 gap-5 flex-col justify-evenly text-white bg-[#1f1f1f]">
      <div className="flex pb-2 w-full text-sm flex-row text-gray-200 justify-evenly">
        <a
          href="/tos"
          className=" cursor-pointer bg-none underline hover:text-gray-300"
        >
          Terms Of Service
        </a>
        <a
          href="/about"
          className=" cursor-pointer bg-none underline hover:text-gray-300"
        >
          About Us
        </a>
      </div>
      <p className="self-center">Copyright &copy; Botos Levente 2023</p>
    </div>
  );
};

export default Footer;
