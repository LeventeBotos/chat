"use client";
import React, { useEffect, useState } from "react";
import { db } from "./Firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  getDoc,
  getDocs,
  limit,
  query,
} from "firebase/firestore";
import { randomUUID } from "crypto";

const Choose = () => {
  const [theme, setTheme] = useState("");
  const [count, setCount] = useState(0);
  let id: string;
  useEffect(() => {
    console.log(theme, count);
    async function inner() {
      try {
        const querie = collection(db, theme);
        const q = await getDocs(querie);

        // Calculate the count outside of the forEach loop
        let newCount = 0;
        q.forEach((doc) => {
          newCount++;
        });

        if (newCount === 0) {
          // Generate a random UUID
          id =
            Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15);

          // Add a document to the collection
          // Check if 'theme' and 'id' have valid values
          if (theme !== undefined && id !== undefined) {
            await addDoc(collection(db, theme), { theme: theme, idd: id });
            // location.replace(`/chats/${id}`)
          } else {
            console.error("Invalid values for theme or id:", theme, id);
          }

          // Update the count state
          setCount(newCount + 1);
        } else {
          // Query for a document and delete it
          const ref = query(collection(db, theme), limit(1));
          const querySnapshot = await getDocs(ref);

          querySnapshot.forEach((doc) => {
            id = doc.data().idd;

            deleteDoc(doc.ref);
          });

          // Update the count state
          setCount(0);
          location.replace(`/chats/${id}`);
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
      <div className="grid grid-cols-2 w-full md:grid-cols-3 lg:grid-cols-4 content-evenly place-content-evenly gap-10 self-center h-full justify-center">
        <div
          onClick={() => {
            setTheme("testers");
          }}
          className=" rounded-lg text-center text-6xl font-bold w-full h-32 bg-[#222222] flex flex-col justify-evenly"
        >
          Test
        </div>
        <div
          onClick={() => {
            setTheme("hiers");
          }}
          className=" rounded-lg text-center text-6xl font-bold w-full h-32 bg-[#222222] flex flex-col justify-evenly"
        >
          hi
        </div>
        <div className=" rounded-lg text-center text-6xl font-bold w-full h-32 bg-[#222222] flex flex-col justify-evenly">
          hi
        </div>
        <div className=" rounded-lg text-center text-6xl font-bold w-full h-32 bg-[#222222] flex flex-col justify-evenly">
          hi
        </div>
        <div className=" rounded-lg text-center text-6xl font-bold w-full h-32 bg-[#222222] flex flex-col justify-evenly">
          hi
        </div>
        <div className=" rounded-lg text-center text-6xl font-bold w-full h-32 bg-[#222222] flex flex-col justify-evenly">
          hi
        </div>
        <div className=" rounded-lg text-center text-6xl font-bold w-full h-32 bg-[#222222] flex flex-col justify-evenly">
          hi
        </div>
        <div className=" rounded-lg text-center text-6xl font-bold w-full h-32 bg-[#222222] flex flex-col justify-evenly">
          hi
        </div>
      </div>
    </div>
  );
};

export default Choose;
