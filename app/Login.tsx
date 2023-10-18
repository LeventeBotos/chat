"use client";
import { useState } from "react";
import { auth } from "./Firebase";
import { db } from "./Firebase";
import { app } from "./Firebase";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { GrGoogle } from "react-icons/gr";
import { AiOutlineGoogle } from "react-icons/ai";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSign, setIsSign] = useState("login");

  const handleSignUp = async () => {
    console.log("signup");
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (e) {
      console.error(e);
    }

    handleLogin();
  };

  const handleLogin = async () => {
    console.log("login");
    const signinres = await signInWithEmailAndPassword(auth, email, password);
    console.log(signinres);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log("submit");

    if (isSign === "login") {
      handleLogin();
    } else if (isSign === "register") {
      handleSignUp();
    }
  };

  const googleLogin = async () => {
    console.log("google");
    signInWithPopup(auth, new GoogleAuthProvider());
    //   const signinres = await signInWithEmailAndPassword(auth, email, password);
    //   console.log(signinres);
  };

  return (
    <div className=" flex flex-col md:flex-row h-screen">
      <div className="p-5 flex flex-col justify-center gap-5 text-center w-full md:w-1/2">
        <p className="text-2xl md:text-4xl">The All New Platform</p>
        <p className="text-4xl md:text-8xl font-bold gradient">Deb8</p>
        <a href="/about" className=" w-36 self-center">
          Learn more
        </a>
      </div>

      <form
        className="w-full px-10 items-center flex flex-col gap-2  self-center md:w-1/2 "
        onSubmit={handleSubmit}
      >
        <button
          className="w-full h-12 flex flex-row hover:bg-[#f1f1f1] ease-in-out duration-200 items-center justify-center gap-5 bg-white text-black rounded-xl"
          onClick={googleLogin}
          type="button"
        >
          <GrGoogle /> <p>Sign In With Google</p>
        </button>
        {isSign === "login" ? (
          <div className="flex flex-col gap-2 w-full self-center justify-center">
            <input
              placeholder="Email"
              required
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-xl p-3 bg-transparent border-2 border-[#3f3f3f] autofill:bg-[#1f1f1f]"
            />
            <input
              placeholder="Password (6+)"
              type="password"
              required
              autoComplete="password"
              value={password}
              pattern=".{6,}"
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-xl p-3 bg-transparent border-2 border-[#3f3f3f] autofill:bg-[#1f1f1f]"
            />
          </div>
        ) : (
          <div className="flex flex-col gap-2 w-full self-center justify-center">
            <input
              placeholder="Email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-xl p-3 bg-transparent border-2 border-[#3f3f3f] autofill:bg-[#1f1f1f]"
            />
            <input
              placeholder="Password (6+)"
              type="password"
              required
              autoComplete="password"
              value={password}
              pattern=".{6,}"
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-xl p-3 bg-transparent border-2 border-[#3f3f3f] autofill:bg-[#1f1f1f]"
            />
            <input
              placeholder="Name"
              type="text"
              autoComplete="name"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
              className="rounded-xl p-3 bg-transparent border-2 border-[#3f3f3f] autofill:bg-[#1f1f1f]"
            />
            <input
              placeholder="Username"
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="rounded-xl p-3 bg-transparent border-2 border-[#3f3f3f] autofill:bg-[#1f1f1f]"
            />
          </div>
        )}
        {isSign === "register" ? (
          <button
            type="submit"
            className="rounded-full bg-white self-center w-2/3 m-3 font-bold text-[#121212] py-3 px-5"
          >
            Sign Up!
          </button>
        ) : (
          <button
            type="submit"
            className="rounded-full bg-white self-center w-2/3 m-3 font-bold text-[#121212] py-3 px-5"
          >
            Log In!
          </button>
        )}
        <div className="text-white text-center flex gap-3 self-center flex-row ">
          {isSign === "register" ? "Already a user? " : "New here? "}
          {isSign === "register" ? (
            <div
              className="gradLink"
              onClick={() => {
                setIsSign("login");
              }}
            >
              Log In!
            </div>
          ) : (
            <div
              className="gradLink "
              onClick={() => {
                setIsSign("register");
              }}
            >
              Sign up!
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default App;
