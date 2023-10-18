import React from "react";
import { Navbar } from "../Navbar";

const page = () => {
  return (
    <div className="w-full text-white p-5 h-screen overflow-hidden text-lg md:text-xl flex flex-col justify-evenly">
      <Navbar />
      <div className="w-full h-full md:w-2/3 self-center flex flex-col gap-5">
        <div>
          <p className="gradient text-3xl md:text-5xl font-bold ">
            {" "}
            About Deb8
          </p>
        </div>
        <div className="h-full flex flex-col justify-evenly gap-5">
          <p>
            Welcome to Deb8, your gateway to fostering a thriving debate culture
            in Hungary. Our platform is designed with one core objective in mind
            – to enhance the art of constructive discourse. Whether you&apos;re
            a regular debater or just starting out, Deb8 equips you with the
            stage, the interlocutors, and the stimulating topics to engage in
            meaningful conversations.
          </p>
          <p>
            At Deb8, we value the importance of genuine human connection.
            That&apos;s why we don&apos;t keep your identity shrouded in
            anonymity. Instead, we proudly display your name, facilitating a
            personal and authentic connection between you and your fellow
            debaters.
          </p>
          <p>
            Concerned about your data&apos;s security? Rest assured, your trust
            in us is of paramount importance. Deb8 is committed to safeguarding
            your privacy. We have no intention of prying into your personal
            information or misusing your data. Your privacy is respected, and
            your information is safe with us.
          </p>
          <p>
            Join us at Deb8 and experience a debate platform that encourages
            open dialogue, upholds transparency, and, above all, promotes a
            culture of respectful discourse.
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
