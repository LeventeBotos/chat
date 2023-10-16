import React, { useEffect, useState } from "react";
import { db } from "./Firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  query,
  limit,
} from "firebase/firestore";

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
          const id = theme + Math.random().toString(36).substring(2, 15);

          // Add a document to the collection
          await addDoc(collection(db, theme), { theme: theme, idd: id });
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
    <div className="flex p-5 gap-5 w-full flex-col h-screen justify-center items-center">
      <p className="text-xl md:text-3xl w-2/3 font-bold gradient">
        What do you want to talk about?
      </p>
      <div className="grid grid-cols-1 text-2xl w-full md:grid-cols-2 xl:grid-cols-4 content-evenly place-content-evenly gap-10 self-center h-full justify-center">
        {themes.map((name, index) => (
          <div
            onClick={() => {
              setTheme(name);
            }}
            key={index}
            className="hover:cursor-pointer hover:bg-[#323232] ease-in-out duration-300 rounded-lg text-center text-2xl w-full h-32 bg-[#222222] flex flex-col justify-evenly"
          >
            {name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Choose;
