import { Metadata } from "next";
import Login from "./Login";
import "./globals.css";

export const metadata: Metadata = {
  title: "My Page Title",
};

export default function Page() {
  return (
    <main className="bg-white dark:bg-[#1f1f1f] text-black dark:text-white">
      <Login />
    </main>
  );
}
