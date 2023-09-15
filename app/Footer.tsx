"use client";
import { SignOutHook } from "react-firebase-hooks/auth";
import React from "react";
import { auth } from "./Firebase";
import { signOut } from "firebase/auth";

const Footer = () => {
  return (
    <div className="w-full flex py-5 gap-5 flex-col text-white bg-[#1f1f1f]">
      <p className="self-center">Copyright &copy; Botos Levente 2023</p>
      <button onClick={() => signOut(auth)}>Sign out</button>
    </div>
  );
};

export default Footer;
