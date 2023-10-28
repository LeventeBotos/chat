"use client";

import { useEffect, useState } from "react";
import { auth } from "./Firebase";
import { signOut } from "firebase/auth";
import { BiLogOut, BiPencil } from "react-icons/bi";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [desc, setDesc] = useState("");

  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const descriptionf = localStorage.getItem("descriptionf") || "";
    setDescription(descriptionf);
  }, []);

  useEffect(() => {
    const description = localStorage.getItem("description") || "description";
    setDesc(description);
  }, []);

  return (
    <nav className=" h-24 flex flex-row justify-between p-2 px-5 items-center w-full">
      <a
        href="/"
        className=" nothover  text-3xl md:text-5xl font-bold gradient"
      >
        Deb8
      </a>
      <div className="bg-none">
        {auth.currentUser?.photoURL ? (
          <div className="flex  flex-col">
            <img
              src={auth.currentUser?.photoURL}
              alt="img"
              onClick={togglePanel}
              className="md:h-16 h-12 shadow-lg md:w-16 w-12 rounded-full"
            />
          </div>
        ) : (
          <div className="text-center " onClick={togglePanel}>
            {auth.currentUser?.displayName ? (
              <p className="gradientbg self-center flex flex-col text-3xl select-none font-semibold justify-evenly w-16 h-16 rounded-full">
                {auth.currentUser.displayName[0]}
              </p>
            ) : (
              <div>
                {" "}
                {auth.currentUser?.email ? (
                  <p className="gradientbg select-none self-center flex flex-col justify-evenly font-bold text-2xl w-16 h-16 rounded-full">
                    {auth.currentUser.email[0]}
                  </p>
                ) : (
                  <p className="gradientbg select-none self-center flex flex-col justify-evenly font-bold text-xl w-16 h-16 rounded-full">
                    Me
                  </p>
                )}
              </div>
            )}
          </div>
        )}
        {isOpen && (
          <div className="absolute justify-evenly gap-2 top-20 md:top-24 shadow-lg bg-[#222222] text-center text-white w-full md:w-96 items-center md:right-10 right-0 rounded-t-none md:rounded-t-lg rounded-lg z-50 flex flex-col">
            {auth.currentUser?.photoURL ? (
              <div className="flex pt-5 flex-col">
                <img
                  src={auth.currentUser?.photoURL}
                  alt="img"
                  className="h-24  w-24 rounded-full"
                />
              </div>
            ) : (
              <div className="text-center ">
                {auth.currentUser?.email ? (
                  <p className="gradientbg self-center flex flex-col text-5xl select-none font-semibold justify-evenly w-24 h-24 rounded-full">
                    {auth.currentUser.email[0]}
                  </p>
                ) : (
                  <p className="gradientbg self-center flex flex-col justify-evenly font-bold text-3xl w-24 h-24 rounded-full">
                    Me
                  </p>
                )}
              </div>
            )}
            <div>
              <p className="text-xl">Greetings,</p>
              <p className="text-xl ">
                {auth.currentUser?.displayName || localStorage.getItem("name")}
              </p>
            </div>

            <p className="w-full text-center mx-3">
              {localStorage.getItem("description") ? (
                <div className="flex w-full justify-center items-center flex-row">
                  <BiPencil
                    className="text-xl mr-2 cursor-pointer"
                    onClick={() => {
                      localStorage.setItem(
                        "descriptionf",
                        localStorage.getItem("description") || ""
                      );
                      localStorage.removeItem("description");
                      setIsOpen(false);
                      setTimeout(() => {
                        setIsOpen(true);
                      }, 1);
                    }}
                  />
                  {localStorage.getItem("description")}
                </div>
              ) : (
                <div className="flex flex-col px-3 h-auto items-center w-full">
                  {/* <BiPencil className="text-xl mr-2" /> */}
                  <textarea
                    // type="text"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    className="rounded-t-lg  w-full py-1 h-24 p-2 bg-transparent border-2 border-[#3f3f3f] autofill:bg-[#1f1f1f]"
                    placeholder="What are your thoughts or insights that you wish to impart to others?"
                  />
                  <button
                    onClick={() => {
                      localStorage.setItem("description", description);
                      setIsOpen(false);
                      setTimeout(() => {
                        setIsOpen(true);
                      }, 1);
                    }}
                    className=" border-[#3f3f3f] flex justify-center gap-2 items-center border-2 border-t-0 hover:bg-[#3f3f3f] ease-out duration-300 w-full rounded-b-lg py-1 h-10 p-2 text-center"
                  >
                    <BiPencil />
                    Set
                  </button>
                </div>
              )}
            </p>

            <div
              onClick={() => {
                signOut(auth);

                location.replace("/");
              }}
              className=" cursor-pointer my-3 rounded-full flex flex-row justify-center items-center gap-3 w-3/4 border-[#333333] border-2 p-2 hover:bg-[#333333] ease-in-out duration-300 text-center"
            >
              {" "}
              <BiLogOut />
              <p>Sign Out</p>
            </div>
            <div className="flex pb-2 text-sm flex-row text-gray-200 w-full justify-evenly">
              <a
                href="/tos"
                className="w-1/3 cursor-pointer bg-none underline hover:text-gray-300"
              >
                Terms Of Service
              </a>
              <a
                href="/about"
                className="w-1/3 cursor-pointer bg-none underline hover:text-gray-300"
              >
                About Us
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
