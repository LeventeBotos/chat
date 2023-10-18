import React from "react";

const page = () => {
  return (
    <div className="w-full text-white p-5 text-lg md:text-xl flex justify-evenly">
      <div className="w-full md:w-2/3 self-center flex flex-col gap-5">
        <p className="gradient text-3xl md:text-5xl font-bold ">Deb8</p>
        <div>
          <p className="font-semibold text-2xl md:text-3xl">Why use Deb8?</p>
          <p>
            Deb8 is aiming to improve the debate culture in hungary. It provides
            the platform, the other party and the theme of the discussion.
          </p>
        </div>
        <div>
          <p className="font-semibold text-2xl md:text-3xl">
            Is Deb8 anonymus?
          </p>
          <p>
            No, it shows your name to the other person, further creating a bond
            between the two of you.
          </p>
        </div>
        <div>
          <p className="font-semibold text-2xl md:text-3xl">
            Will yall steal my data?
          </p>
          <p>No, we shall not.</p>
        </div>
      </div>
    </div>
  );
};

export default page;
