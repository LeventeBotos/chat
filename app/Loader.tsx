"use client";
// components/Loader.js
import React, { useEffect, useState } from "react";

const texts = [
  {
    txt: "We invite you to maintain a respectful and formal tone in your communication with others.",
  },
  {
    txt: "Please be considerate of differing perspectives and show kindness toward one another.",
  },
  {
    txt: "Let's ensure our conversations are characterized by mutual respect and absence of offensive language.",
  },
  {
    txt: "We value constructive dialogue and encourage you to express your thoughts with courtesy.",
  },
  {
    txt: "Kindly remember that our interactions should be marked by decorum and understanding.",
  },
];

const Loader = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    // Disable scrolling on mount
    if (count < texts.length) {
      setTimeout(() => {
        setCount(count + 1);
      }, 8000);
    } else {
      setCount(0);
    }
  }, [count]);
  useEffect(() => {
    // Disable scrolling on mount
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    // Enable scrolling on unmount
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    // Function to prevent default scroll
    const preventScroll = (e: any) => e.preventDefault();

    // Add an event listener to capture scroll events and prevent them
    window.addEventListener("wheel", preventScroll, { passive: false });
    window.addEventListener("touchmove", preventScroll, { passive: false });

    // Cleanup the event listener
    return () => {
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
    };
  }, []);

  useEffect(() => {
    // Disable scrolling on mount
    document.body.style.overflow = "hidden";

    // Enable scrolling on unmount
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      className=" w-full flex flex-col h-full bg-[#1f1f1f] rounded-lg bg-opacity-50  text-white gap-10 text-xl items-center justify-center  pointer-events-auto"
      style={{ backdropFilter: "blur(3px)" }} // Optional: adds a blur effect to the background
    >
      <div className="flex flex-col justify-evenly items-center gap-7">
        <p className="text-lg md:text-2xl">
          Waiting for someone with the same interests...
        </p>
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 " />
      </div>
      <div className="flex flex-col justify-evenly items-center"></div>
      <div className="relative w-full text-center flex flex-row justify-center">
        {texts.map((text, index) => (
          <p
            key={index}
            className={`text-lg w-3/4 self-center md:text-2xl ease-in-out top-0 absolute duration-500 ${
              index === count ? "opacity-1" : "opacity-0"
            }`}
          >
            {text.txt}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Loader;
