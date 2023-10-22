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
  doc,
  getDoc,
  updateDoc,
  setDoc,
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
  const [user1, setUser1] = useState("");
  const [user2, setUser2] = useState("");
  const [theme, setTheme] = useState("");

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
  function timeout(delay: number) {
    return new Promise((res) => setTimeout(res, delay));
  }

  // Example usage when a user joins a chat
  // Replace with the actual chat ID

  useEffect(() => {
    const fetchChatMetadata = async () => {
      try {
        const metadataDocRef = doc(db, "chat_metadata", id);
        const metadataSnapshot = await getDoc(metadataDocRef);

        const metadata = metadataSnapshot.data();

        // Access metadata.user1, metadata.user2, and metadata.theme to display in your UI
        if (metadata !== undefined) {
          setUser1(metadata.user1);
          setUser2(metadata.user2);
          setTheme(metadata.theme);
          // Update state or UI with this information
        }
      } catch (error) {
        console.error("Error fetching chat metadata:", error);
      }
    };

    const joinChat = async (chatId: string) => {
      const user = auth.currentUser;
      if (!user) {
        // User is not logged in, handle as needed
        console.log("no");
        return;
      }

      try {
        // Get the chat metadata document reference
        const chatMetadataRef = doc(db, "chat_metadata", chatId);

        // Check if the document exists
        const chatMetadataSnapshot = await getDoc(chatMetadataRef);
        if (chatMetadataSnapshot.exists()) {
          const existingUser1 = chatMetadataSnapshot.data().user1;
          if (existingUser1 && existingUser1 !== user.email) {
            await updateDoc(chatMetadataRef, {
              user2: user.email,
            });
          } else {
            await updateDoc(chatMetadataRef, {
              user1: user.email,
            });
          }
          console.log("User joined the chat and updated chat metadata");
        } else {
          // Handle the case where the document doesn't exist (create it, set initial data, etc.)
          await updateDoc(chatMetadataRef, {
            user1: user.email,
          });
          console.log("User joined the chat and created chat metadata");
        }
        console.log("User joined the chat and updated chat metadata");
      } catch (error) {
        console.error("Error joining the chat:", error);
      }
    };

    // Example usage when a user joins a chat
    console.log("ue");

    fetchChatMetadata();
    timeout(1000).then(() => {
      joinChat(id);
    });
  }, []);

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
    <div className="bg-[#111111] w-full flex flex-col overflow-clip h-screen">
      <Navbar />
      <div className="flex flex-row h-full w-full gap-2 p-1">
        <div className="w-1/4 hidden rounded-lg text-center gap-3 pt-5 bg-[#191919] lg:flex text-white flex-col">
          <p className="font-bold text-3xl">{theme}</p>
          <p>Active debate between</p>
          {auth.currentUser?.email && (
            <div className="flex flex-row justify-evenly">
              {user1 != auth.currentUser.email ? (
                <p className="gradientbg self-center flex flex-col text-lg select-none justify-evenly w-12 h-12 rounded-full">
                  {user1[0]}
                </p>
              ) : (
                <p className="gradientbg self-center flex flex-col text-lg select-none justify-evenly w-12 h-12 rounded-full">
                  {user2[0]}
                </p>
              )}
              <p className="text-center flex flex-col justify-evenly">&</p>
              <p className="gradientbg self-center flex flex-col text-lg select-none justify-evenly w-12 h-12 rounded-full">
                {auth.currentUser.email[0]}
              </p>
            </div>
          )}
        </div>
        <div className=" rounded-t-lg bg-[#191919] w-full h-full flex flex-col">
          <div className="flex text-white flex-grow relative bottom-0 p-5 gap-2 right-0 h-full overflow-y-scroll overflow-x-hidden scrollbar-hide flex-col w-full">
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
                    className={` w-11/12 px-2 break-words text-lg`}
                    dangerouslySetInnerHTML={{ __html: urlify(msg.text) }}
                  ></p>
                  <div className="text-center ">
                    {auth.currentUser?.email ? (
                      <div className="gradientbg self-center flex flex-col text-sm select-none justify-evenly w-7 h-7 rounded-full">
                        {msg.uid === currentUid ? (
                          <div>
                            {user1 == auth.currentUser.email ? (
                              <p>{user1[0]}</p>
                            ) : (
                              <p>{user2[0]}</p>
                            )}
                          </div>
                        ) : (
                          <div>
                            {user2 == auth.currentUser.email ? (
                              <p>{user1[0]}</p>
                            ) : (
                              <p>{user2[0]}</p>
                            )}
                          </div>
                        )}
                      </div>
                    ) : (
                      <p className="gradientbg self-center flex flex-col justify-evenly font-bold text-xl w-7 h-7 rounded-full">
                        Me
                      </p>
                    )}
                  </div>
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
      </div>
    </div>
  );
};
