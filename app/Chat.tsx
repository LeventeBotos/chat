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
  onSnapshot,
} from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Navbar } from "./Navbar";
import Loader from "./Loader";

interface ChatProps {
  id: string;
}

export const Chat: React.FC<ChatProps> = ({ id }) => {
  const [numm, setNumm] = useState(1);
  const dummy = useRef<HTMLDivElement | null>(null);
  const messagesRef = collection(db, id.toString());
  const [user1, setUser1] = useState("");
  const [user1Name, setUser1Name] = useState("");
  const [user1Description, setUser1Description] = useState("");
  const [user2, setUser2] = useState("");
  const [user2Name, setUser2Name] = useState("");
  const [user2Description, setUser2Description] = useState("");
  const [theme, setTheme] = useState("");
  const [newMsgs, setNewMsgs] = useState<DocumentData[]>([]);
  const [msgs, setMsgs] = useState<DocumentData[]>([]);
  const q = query(messagesRef, orderBy("createdAt", "asc"), limitToLast(25));
  const [messages] = useCollectionData(q);
  const [formValue, setFormValue] = useState<string>("");
  const [currentUid, setCurrentUid] = useState<string | null>(null);

  function urlify(text: string) {
    var urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, function (url) {
      return '<a href="' + url + '">' + url + "</a>";
    });
  }

  function timeout(delay: number) {
    return new Promise((res) => setTimeout(res, delay));
  }

  useEffect(() => {
    if (messages) {
      setMsgs(newMsgs.concat(messages));
    }
  }, [messages, newMsgs]);

  useEffect(() => {
    const metadataDocRef = doc(db, "chat_metadata", id);

    // Use onSnapshot to listen to real-time changes
    const unsubscribe = onSnapshot(metadataDocRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const metadata = docSnapshot.data();
        setUser1(metadata.user1email);
        setUser1Name(metadata.user1name);
        setUser1Description(metadata.user1description);
        setUser2(metadata.user2email);
        setUser2Name(metadata.user2name);
        setUser2Description(metadata.user2description);
        setTheme(metadata.theme);
      }
    });

    return () => unsubscribe(); // Unsubscribe from the real-time updates when the component unmounts
  }, [id]);

  useEffect(() => {
    const fetchChatMetadata = async () => {
      try {
        const metadataDocRef = doc(db, "chat_metadata", id);
        const metadataSnapshot = await getDoc(metadataDocRef);

        const metadata = metadataSnapshot.data();
        if (metadata !== undefined) {
          setUser1(metadata.user1email);
          setUser1Name(metadata.user1name);
          setUser1Description(metadata.user1description);
          setUser2(metadata.user2email);
          setUser2Name(metadata.user2name);
          setUser2Description(metadata.user2description);
          setTheme(metadata.theme);
        }
      } catch (error) {
        console.error("Error fetching chat metadata:", error);
      }
    };

    const joinChat = async (chatId: string) => {
      const user = auth.currentUser;
      if (!user) {
        return;
      }

      try {
        const chatMetadataRef = doc(db, "chat_metadata", id);
        const chatMetadataSnapshot = await getDoc(chatMetadataRef);
        if (chatMetadataSnapshot.exists()) {
          const existingUser1 = chatMetadataSnapshot.data().user1email;
          if (existingUser1 && existingUser1 !== user.email) {
            await updateDoc(chatMetadataRef, {
              user2email: user.email,
              user2name: user.displayName || localStorage.getItem("name"),
              user2: user.uid,
              user2description: localStorage.getItem("description"),
            });
          } else {
            await updateDoc(chatMetadataRef, {
              user1email: user.email,
              user1name: user.displayName || localStorage.getItem("name"),
              user1: user.uid,
              user1description: localStorage.getItem("description"),
            });
          }
          console.log("User joined the chat and updated chat metadata");
        } else {
          await updateDoc(chatMetadataRef, {
            user1email: user.email,
            user1name: user.displayName || localStorage.getItem("name"),
            user1: user.uid,
            user1description: localStorage.getItem("description"),
          });
          console.log("User joined the chat and created chat metadata");
        }
        console.log("User joined the chat and updated chat metadata");
      } catch (error) {
        console.error("Error joining the chat:", error);
      }
    };

    fetchChatMetadata();
    timeout(1000).then(() => {
      joinChat(id.toString());
      if (auth.currentUser) {
        setCurrentUid(auth.currentUser.uid);
      }
    });
  }, []);

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
        endBefore(messages[0].createdAt),
        limit(25 * numm)
      );

      const newMessages = await getDocs(newQuery);
      setNewMsgs(newMessages.docs.map((doc) => doc.data()));
    }
  };

  return (
    <div className="bg-[#111111] w-full flex flex-col overflow-clip h-screen">
      <Navbar />
      <div className="flex flex-row h-full w-full gap-2 p-1">
        <div className="w-1/4 hidden gap-2 h-full text-center  lg:flex text-white flex-col">
          <div className="gap-3 pt-5 h-1/3 w-full flex flex-col justify-evenly bg-[#191919] rounded-lg">
            <p className="font-bold text-3xl">{theme}</p>
            <p>Ongoing debate between:</p>

            {auth.currentUser?.email && (
              <div className="flex flex-row justify-evenly">
                {user1 != auth.currentUser.email && user1 ? (
                  <p className="gradientbg self-center flex flex-col text-2xl select-none justify-evenly w-12 h-12 rounded-full">
                    {user1[0]}
                  </p>
                ) : (
                  <div>
                    {user2 && (
                      <p className="gradientbg self-center flex flex-col text-2xl select-none  justify-evenly w-12 h-12 rounded-full">
                        {user2[0]}
                      </p>
                    )}
                  </div>
                )}
                <p className="text-center flex flex-col justify-evenly">&</p>

                {auth.currentUser.photoURL ? (
                  <img
                    src={auth.currentUser.photoURL}
                    className="rounded-full w-12 h-12"
                  />
                ) : (
                  <p className="gradientbg self-center flex flex-col text-lg select-none justify-evenly w-12 h-12 rounded-full">
                    {auth.currentUser.email[0]}
                  </p>
                )}
              </div>
            )}
          </div>
          <div className="pt-5 bg-[#191919] h-2/3 w-full rounded-lg">
            {user1 &&
              user2 &&
              user1Name &&
              user2Name &&
              auth.currentUser?.email && (
                <div>
                  {user1 == auth.currentUser?.email ? (
                    <div className="flex flex-col gap-3 items-center">
                      <p className="gradientbg self-center flex flex-col text-4xl select-none justify-evenly w-20 h-20 rounded-full">
                        {user2[0]}
                      </p>
                      <p className="font-bold text-xl">{user2Name}</p>
                      <div className="flex relative p-1 flex-row justify-evenly">
                        {/* <p className="absolute text-4xl px-2 h-min font-semibold text-white top-0 left-0">
                          &quot;
                        </p> */}
                        <p className="mx-5 m-2 mb-5">{user2Description}</p>
                        {/* <p className="absolute text-4xl px-2 h-min font-semibold text-white bottom-0 right-0">
                          &quot;
                        </p> */}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3 items-center">
                      <p className="gradientbg self-center flex flex-col text-4xl select-none justify-evenly w-20 h-20 rounded-full">
                        {user1[0]}
                      </p>
                      <p className="font-bold text-xl">{user1Name}</p>
                      <div className="flex relative p-1 flex-row justify-evenly">
                        {/* <p className="absolute text-4xl px-2 h-min font-semibold text-white top-0 left-0">
                          &quot;
                        </p> */}
                        <p className="mx-5 m-2 mb-5">{user1Description}</p>
                        {/* <p className="absolute text-4xl px-2 h-min font-semibold text-white bottom-0 right-0">
                          &quot;
                        </p> */}
                      </div>
                    </div>
                  )}
                </div>
              )}
          </div>
        </div>
        {user2 && user1 ? (
          <div className=" rounded-t-lg bg-[#191919] w-full  flex flex-col">
            <div className="flex text-white flex-grow  p-5 gap-2  overflow-y-scroll h-96 flex-col w-full">
              <button
                onClick={() => loadMoreMessages()}
                className="w-2/3 self-center p-2 text-center bg-[#2a2a2a] text-white rounded-xl hover:bg-[#2f2f2f] ease-in-out duration-200"
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
                              {auth.currentUser.photoURL ? (
                                <img
                                  src={auth.currentUser.photoURL}
                                  className="rounded-full"
                                />
                              ) : (
                                <p className="gradientbg self-center flex flex-col text-lg select-none justify-evenly rounded-full">
                                  {auth.currentUser.email[0]}
                                </p>
                              )}
                            </div>
                          ) : (
                            <div>
                              {user2 == auth.currentUser.email &&
                              user1 &&
                              user2 ? (
                                <p>{user1[0]}</p>
                              ) : (
                                <p>{auth.currentUser.email[0]}</p>
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
            <form
              className="w-full flex h-24 p-0 md:p-5 pt-0 mt-0 bg-clip-padding pb-3 flex-row relative bottom-0 left-0 right-0"
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
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};
