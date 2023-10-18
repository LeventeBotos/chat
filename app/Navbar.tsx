/* eslint-disable @next/next/no-html-link-for-pages */
"use client";

import { useEffect, useState } from "react";
import { auth } from "./Firebase";
import { signOut } from "firebase/auth";
import { BiLogOut } from "react-icons/bi";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentUserImg, setCurrentUserImg] = useState(
    auth.currentUser?.photoURL
  );

  useEffect(() => {
    setCurrentUserImg(auth.currentUser?.photoURL);
  });
  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className=" h-24 flex flex-row justify-between p-2 px-5 items-center w-full">
      <a href="/" className=" nothover  text-xl md:text-5xl font-bold gradient">
        Deb8
      </a>
      <div className="bg-none">
        {auth.currentUser?.photoURL ? (
          <img
            onClick={togglePanel}
            src={auth.currentUser?.photoURL}
            alt="logo"
            className="rounded-full shadow-lg h-16 opacity-100 w-16"
          />
        ) : (
          <div className="rounded-full shadow-lg h-16 opacity-100 w-16 bg-[#252525]" />
        )}
        {isOpen && (
          <div
            // onClick={(e) => e.preventDefault()}
            className="absolute justify-evenly top-24 bg-[#222222] text-center text-white w-96 h-96 items-center right-10 rounded-lg z-50 flex flex-col"
          >
            {auth.currentUser?.photoURL ? (
              <div className="flex  flex-col">
                <img
                  src={auth.currentUser?.photoURL}
                  alt="img"
                  className="h-24  w-24 rounded-full"
                />
              </div>
            ) : (
              <p className="text-white self-center">wrong</p>
            )}
            <div>
              <p className="text-2xl font-bold">Hiya,</p>
              <p className="text-xl"> {auth.currentUser?.displayName}</p>
            </div>
            {auth.currentUser?.email}
            <div
              onClick={() => {
                signOut(auth);

                location.replace("/");
              }}
              className=" my-5 rounded-full flex flex-row justify-center items-center gap-3 w-3/4 border-[#333333] border-2 p-2 hover:bg-[#333333] ease-in-out duration-300 text-center"
            >
              {" "}
              <BiLogOut />
              <p>Sign Out</p>
            </div>
            <div className="flex text-sm flex-row text-gray-200 w-full justify-evenly">
              <a
                // onClick={() => location.replace("/tos")}
                href="/tos"
                className="w-1/3 cursor-pointer bg-none underline hover:text-gray-300"
              >
                Terms Of Service
              </a>
              <a
                // onClick={() => location.replace("/about")}
                href="/about"
                className="w-1/3 cursor-pointer bg-none underline hover:text-gray-300"
              >
                About Us
              </a>
            </div>
          </div>
        )}
      </div>

      {/*
      <button
        id="nav-toggle"
        aria-label="menu"
        className="menuu block h-12 w-auto items-center hover:text-black lg:hidden"
        onClick={togglePanel}
      >
        {isOpen ? (
          <GrClose className="h-full w-auto p-1 hover:text-black" />
        ) : (
          <AiOutlineMenu className="h-full w-auto hover:text-black" />
        )}
      </button>
      <div
        className=" hidden lg:flex flex-row-reverse gap-4 px-2  lg:items-center"
        id="nav-content"
      >
        <a
          href="/"
          aria-label="Example"
          className="font-medium items-center rounded-full bg-transparent px-5 p-3 text-center text-[#1f1f1f] ease-in-out duration-200 hover:bg-accent hover:text-[#f5f5f5] text-lg"
        >
          Example
        </a>
        <a
          href="/"
          aria-label="Example"
          className="font-medium items-center rounded-full bg-transparent px-5 p-3 text-center text-[#1f1f1f] ease-in-out duration-200 hover:bg-accent hover:text-[#f5f5f5] text-lg"
        >
          Example
        </a>
        <a
          href="/"
          aria-label="Főoldal"
          className="font-medium items-center rounded-full bg-transparent px-5 p-3 text-center text-[#1f1f1f] ease-in-out duration-200 hover:bg-accent hover:text-[#f5f5f5] text-lg"
        >
          Főoldal
        </a>
      </div>

     
      <div
        className={`fixed flex-col left-0 top-0 pt-10 z-30 flex items-center w-72 bg-white h-full lg:hidden ${
          isOpen ? "flex" : "hidden"
        }`}
        id="nav-panel"
      >
        <a href="/" className="w-3/4 rounded-full h-12 ">
          <button
            aria-label="Főoldal"
            className="w-full bg-accent ease-in-out duration-200 text-white rounded-full p-2 h-full"
          >
            Főoldal
          </button>
        </a>
        <a href="/" className="w-3/4 rounded-full h-12 ">
          <button
            aria-label="Example"
            className="w-full bg-accent ease-in-out duration-200 text-white rounded-full p-2 h-full"
          >
            Example
          </button>
        </a>
        <a href="/" className="w-3/4 rounded-full h-12 ">
          <button
            aria-label="Example"
            className="w-full bg-accent ease-in-out duration-200 text-white rounded-full p-2 h-full"
          >
            Example
          </button>
        </a>
      </div> */}
    </nav>
  );
};
