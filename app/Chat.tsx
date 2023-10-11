"use client";

import React, { useEffect, useRef, useState } from "react";
import { auth, db } from "./Firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  orderBy,
  query,
  limit,
  limitToLast,
  endBefore,
  getDocs,
  DocumentData,
} from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { randomUUID } from "crypto";
import { Navbar } from "./Navbar";

interface ChatProps {
  id: string;
}

export const Chat: React.FC<ChatProps> = ({ id }) => {
  const [numm, setNumm] = useState(1);
  const dummy = useRef<HTMLDivElement | null>(null);
  const messagesRef = collection(db, id);

  const [newMsgs, setNewMsgs] = useState<DocumentData[]>([]);
  const [msgs, setMsgs] = useState<DocumentData[]>([]);
  const q = query(messagesRef, orderBy("createdAt", "asc"), limitToLast(25));

  const [messages] = useCollectionData(q);

  const [formValue, setFormValue] = useState<string>("");
  const [currentUid, setCurrentUid] = useState<string | null>(null);

  useEffect(() => {
    if (messages) {
      setMsgs(newMsgs.concat(messages));
    }
  }, [messages, newMsgs]);

  function urlify(text: string) {
    var urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, function (url) {
      return '<a href="' + url + '">' + url + "</a>";
    });
    // or alternatively
    // return text.replace(urlRegex, '<a href="$1">$1</a>')
  }

  useEffect(() => {
    if (auth.currentUser) {
      setCurrentUid(auth.currentUser.uid);
    }
    if (dummy.current) {
      dummy.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, dummy]);

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

  const loadMoreMessages = async () => {
    if (messages && messages.length > 0) {
      setNumm(numm + 1);
      const newQuery = query(
        messagesRef,
        orderBy("createdAt", "asc"),
        endBefore(messages[0].createdAt), // Use the timestamp of the first message
        limit(25 * numm)
      );

      const newMessages = await getDocs(newQuery);
      console.log(newMessages);
      setNewMsgs(newMessages.docs.map((doc) => doc.data()));
      // Update the state with the newMessages if needed
    }
  };

  return (
    <div className="bg-[#1f1f1f] overflow-x-hidden w-full flex flex-col bottom-0 right-0 h-screen">
      <Navbar />
      <div className="flex text-white flex-grow relative bottom-0 p-5 gap-2 right-0 h-screen overflow-y-scroll overflow-x-hidden scrollbar-hide flex-col w-screen">
        <button
          onClick={() => loadMoreMessages()}
          className="w-2/3 self-center p-2 text-center bg-[#2a2a2a] text-white rounded-xl hover:bg-[#2f2f3f] ease-in-out duration-200"
        >
          Load more messages
        </button>
        {msgs &&
          msgs.map((msg, index) => (
            <div
              key={crypto.randomUUID()}
              className={` bg-[#444444]  justify-evenly rounded-xl p-2 max-w-xs md:max-w-sm lg:max-w-lg xl:max-w-xl flex ${
                msg.uid === currentUid
                  ? " flex-row items-end self-end bg-[#333333]"
                  : " flex-row-reverse items-start self-start"
              }  `}
            >
              <p
                className={` w-11/12 px-2 break-words`}
                dangerouslySetInnerHTML={{ __html: urlify(msg.text) }}
              ></p>
              <img
                alt={msg.uid}
                src={msg.photoURL}
                className="rounded-full h-7 w-7"
              />
            </div>
          ))}
        <span ref={dummy} className="bg-transparent"></span>
      </div>
      {/* <span className="w-full z-10 bg-transparent h-32"></span> */}
      <form
        className="w-full flex z-20 p-0 md:p-5 pt-0 mt-0 bg-clip-padding pb-3 flex-row relative bottom-0 left-0 right-0"
        onSubmit={sendMessage}
        name="msg"
      >
        <input
          placeholder="Say something nice"
          required
          type="text"
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          className="rounded-xl w-full p-3 bg-[#1f1f1f] text-white border-2 border-[#3f3f3f] rounded-r-none"
        />
        <button
          type="submit"
          className="md:w-1/5 lg:w-1/6 w-1/3 buttonn rounded-l-none"
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
          <span className="text-xs md:text-lg">Send</span>
        </button>
      </form>
      {/* <p className="text-white">{id}</p> */}
    </div>
  );
};
