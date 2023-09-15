"use client";

import Login from "./Login";
import "./globals.css";
import { auth } from "./Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Chat } from "./Chat";

export default function Page() {
  const [user] = useAuthState(auth);
  return (
    <main className="bg-white dark:bg-[#1f1f1f] text-black dark:text-white">
      {user ? <Chat /> : <Login />}
    </main>
  );
}
