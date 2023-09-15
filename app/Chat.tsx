"use client";

import React, { useRef, useState } from "react";
import { auth, db } from "./Firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  orderBy,
  query,
  limit,
} from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Send_Flowers } from "next/font/google";

export const Chat: React.FC = () => {
  const dummy = useRef<HTMLDivElement | null>(null);
  const messagesRef = collection(db, "messages");
  const q = query(messagesRef, orderBy("createdAt"), limit(50));
  const [currentUid, setCurrentUid] = useState("");
  const [messages] = useCollectionData(q);

  const [formValue, setFormValue] = useState<string>("");

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (auth.currentUser) {
      const { uid, photoURL } = auth.currentUser;
      setCurrentUid(uid);
      try {
        await addDoc(messagesRef, {
          text: formValue,
          createdAt: serverTimestamp(),
          uid,
          photoURL,
        });
      } catch (error) {
        console.error("Error sending message:", error);
      }

      setFormValue("");
      if (dummy.current) {
        dummy.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="flex flex-col bottom-0 ml-2 left-0 min-h-screen">
      <div className="flex flex-grow overflow-y-auto overflow-x-clip flex-col p-3 gap-2">
        {messages &&
          messages.map((msg) => (
            <div
              key={msg.uid}
              className={`bg-lime-600  justify-evenly rounded-xl p-2 max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg flex ${
                msg.uid === currentUid
                  ? " flex-row items-end self-end"
                  : " flex-row-reverse items-start self-start"
              }  `}
            >
              <p className={` w-11/12 px-2 break-words`}>{msg.text}</p>
              <img
                alt={msg.uid}
                src={msg.photoURL}
                className="rounded-full h-7 w-7"
              />
            </div>
          ))}
      </div>
      <span ref={dummy}></span>
      <form
        className="w-full flex pb-5 flex-row relative bottom-0 right-0"
        onSubmit={sendMessage}
      >
        <input
          placeholder="Say something nice"
          required
          type="text"
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          className="rounded-xl w-full p-3 bg-transparent border-2 border-[#3f3f3f] rounded-r-none"
        />
        {/* <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="Say something nice"
          className="w-full h-10 rounded-xl p-2"
        /> */}
        <button
          type="submit"
          className="md:w-1/5 lg:w-1/6  w-1/3 buttonn rounded-l-none"
          disabled={!formValue}
        >
          <div className="svg-wrapper-1">
            <div className="svg-wrapper">
              <svg
                height="24"
                width="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0h24v24H0z" fill="none"></path>
                <path
                  d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
          </div>
          <span>Send</span>
        </button>
        {/* <button type="submit" className="w-1/5" disabled={!formValue}>
          🕊️
        </button> */}
      </form>
    </div>
  );
};
