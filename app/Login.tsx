"use client";
import { useState } from "react";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSign, setIsSign] = useState("register");

  const handleSignUp = (event: any) => {
    event.preventDefault();
  };

  const handleLogin = (event: any) => {
    event.preventDefault();
  };

  return (
    <div className=" flex flex-col md:flex-row h-screen">
      <div className="p-5 flex flex-col justify-center gap-5 text-center w-full md:w-1/2">
        <div className="text-2xl md:text-4xl">The All New Platform</div>
        <div className="text-4xl md:text-8xl font-bold gradient">CH@</div>
      </div>

      <form
        className="w-full px-10 gap-2 justify-center md:w-1/2 flex flex-col text-[#121212]"
        onSubmit={handleSignUp}
      >
        <input
          placeholder="Email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-xl p-3 bg-transparent border-2 border-[#3f3f3f] "
        />
        <input
          placeholder="Password"
          type="password"
          autoComplete="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="rounded-xl p-3 bg-transparent border-2 border-[#3f3f3f] autofill:bg-[#1f1f1f]"
        />
        <input
          placeholder="Name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded-xl p-3 bg-transparent border-2 border-[#3f3f3f] "
        />
        <input
          placeholder="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="rounded-xl p-3 bg-transparent border-2 border-[#3f3f3f] "
        />

        {isSign === "register" ? (
          <button
            onClick={handleSignUp}
            className="rounded-full bg-white self-center w-2/3 m-3 font-bold text-[#121212] py-3 px-5"
          >
            Sign Up!
          </button>
        ) : (
          <button
            onClick={handleLogin}
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
