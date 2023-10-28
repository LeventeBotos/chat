import React, { useEffect, useState } from "react";
import { db } from "./Firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  query,
  limit,
  doc,
  setDoc,
} from "firebase/firestore";
import { Navbar } from "./Navbar";
import Footer from "./Footer";

const Choose = () => {
  const [theme, setTheme] = useState("");
  const [count, setCount] = useState(0);
  const [themes, setThemes] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = collection(db, "themes");
        const querySnapshot = await getDocs(q);
        console.log(querySnapshot);
        const themeData = querySnapshot.docs.map((doc) =>
          String(doc.data().name)
        ) as string[];
        setThemes(themeData);
        console.log(themeData);
      } catch (error) {
        console.error("Error fetching themes:", error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    async function inner() {
      try {
        if (!theme) return; // Don't proceed if theme is empty

        const querie = collection(db, theme);
        const q = await getDocs(querie);

        const newCount = q.size;

        if (newCount === 0) {
          const id =
            Math.random().toString(36).substring(2, 15).toString() +
            Math.random().toString(36).substring(2, 15).toString();

          // Add a document to the collection
          await addDoc(collection(db, theme), { theme: theme, idd: id });

          // Create chat metadata document
          await setDoc(doc(db, "chat_metadata", id), {
            id: id,
            // chatId: id,
            // user1: "User1's Name",
            // user2: "User2's Name", // Replace with actual user names
            theme: theme,
          });

          location.replace(`/chats/${id}`);
        } else {
          const ref = query(collection(db, theme), limit(1));
          const querySnapshot = await getDocs(ref);

          querySnapshot.forEach(async (doc) => {
            const id = doc.data().idd;

            // Delete the document
            await deleteDoc(doc.ref);

            // Update the count state
            setCount(0);

            // Navigate to a new location
            location.replace(`/chats/${id}`);
          });
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
    inner();
  }, [theme]);

  return (
    <div className="">
      <div className="flex bg-[#111111] gap-5 w-full flex-col h-screen items-center">
        <Navbar />
        <p className="text-xl md:text-3xl w-2/3 font-bold gradient">
          What topic would you like to discuss?
        </p>
        <div className="grid p-5 text-2xl w-full grid-cols-2 xl:w-2/3 content-evenly place-content-evenly gap-5 self-center overflow-auto h-full justify-center">
          {themes.map((name, index) => (
            <div
              onClick={() => {
                setTheme(name);
              }}
              key={index}
              className="hover:cursor-pointer hover:bg-[#222222] ease-in-out duration-300 rounded-lg text-center text-lg p-2 md:text-2xl w-full h-32 bg-[#191919] flex flex-col justify-evenly"
            >
              {name}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Choose;
