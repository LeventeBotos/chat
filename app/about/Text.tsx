import React from "react";

const Text = () => {
  return (
    <div className="w-full md:w-2/3 self-center h-screen flex flex-col gap-5">
      <div>
        <p className="gradient text-3xl md:text-5xl font-bold ">
          An Introduction to Deb8
        </p>
      </div>
      <div className="h-full flex flex-col justify-evenly gap-5">
        <p>
          Welcome to Deb8, your gateway to fostering a thriving debate culture
          in Hungary. Our platform is designed with one core objective in mind –
          to enhance the art of constructive discourse. Whether you&apos;re a
          regular debater or just starting out, Deb8 equips you with the stage,
          the interlocutors, and the stimulating topics to engage in meaningful
          conversations.
        </p>
        <p>
          This platform utilizes formal English language to engage individuals
          with a higher level of education, aiming to contribute to a brighter
          and more enlightened future characterized by eloquent discourse. We
          kindly request that you keep this in mind during the debate.
        </p>
        <p>
          At Deb8, we hold genuine human connection in high regard. That&apos;s
          why we prioritize transparency over anonymity. We proudly display your
          name, fostering a personal and authentic link between you and your
          fellow debaters. This practice ensures that both parties can engage
          with each other in a more personable manner.
        </p>

        <p>
          Concerned about your data&apos;s security? Rest assured, your trust in
          us is of paramount importance. Deb8 is committed to safeguarding your
          privacy. We have no intention of prying into your personal information
          or misusing your data. Your privacy is respected, and your information
          is safe with us.
        </p>

        <p>
          Join us at Deb8 and experience a debate platform that encourages open
          dialogue, upholds transparency, and, above all, promotes a culture of
          respectful discourse.
        </p>
      </div>
    </div>
  );
};

export default Text;
