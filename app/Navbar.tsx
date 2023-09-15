/* eslint-disable @next/next/no-html-link-for-pages */
"use client";

import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { GrClose } from "react-icons/gr";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed left-0 right-0 top-0 z-30 flex h-20 items-center justify-between bg-[#f5f5f5] bg-opacity-75 p-3 backdrop-blur-lg backdrop-filter md:h-24">
      <a href="/">
        <img
          src="/logo.png"
          alt="logo"
          className=" pl-2 p-1 h-20 opacity-100 md:h-24"
        />
      </a>
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

      {/* 
      =========================================================================================================================
      Mobile Navbar
      =========================================================================================================================
      */}
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
      </div>
    </nav>
  );
};
