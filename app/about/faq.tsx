const page = () => {
  return (
    <div className="w-full text-white p-5 text-lg md:text-xl flex justify-evenly">
      <div className="w-full md:w-2/3 self-center flex flex-col gap-5">
        <p className="gradient text-3xl md:text-5xl font-bold ">FAQ</p>
        <div>
          <p className="font-semibold text-2xl md:text-3xl">
            Why should I use Deb8?
          </p>
          <p>
            Deb8 is committed to enhancing the culture of debate in Hungary. We
            provide the platform, facilitate connections with debate partners,
            and curate discussion topics to foster meaningful discourse.
          </p>
        </div>
        <div>
          <p className="font-semibold text-2xl md:text-3xl">
            Is Deb8 an anonymous platform?
          </p>
          <p>
            No, it does not operate anonymously. In fact, it discloses your
            identity to your debate partner, thereby promoting a deeper
            connection between the participants.
          </p>
        </div>
        <div>
          <p className="font-semibold text-2xl md:text-3xl">
            Will my data be compromised?
          </p>
          <p>
            Rest assured, your data will remain secure. We have no intentions of
            engaging in any unauthorized data collection or misuse.
          </p>
        </div>
        <div>
          <p className="font-semibold text-2xl md:text-3xl">
            How can I get in touch with the support team for assistance?
          </p>
          <p>
            If you have inquiries or encounter any issues while utilizing Deb8,
            you may contact our dedicated support team via email at the
            following address:{" "}
            <a href="mailto:botos.levente2007@gmail.com">
              Botos.Levente2007@gmail.com
            </a>
            . We are here to address any concerns or questions you may have.
          </p>
        </div>
        <div>
          <p className="font-semibold text-2xl md:text-3xl">
            Is Deb8 only for experienced debaters?
          </p>
          <p>
            Deb8 welcomes individuals of all skill levels. Whether you are a
            seasoned debater or just embarking on your debating journey, our
            platform offers a hospitable environment for you to partake in
            discussions. We firmly believe that every participant possesses
            valuable insights, and we encourage both novices and experts to
            participate in the discourse.
          </p>
        </div>
        <div>
          <p className="font-semibold text-2xl md:text-3xl">
            Is Deb8 planning to expand to other languages?
          </p>
          <p>
            While our primary focus is on English, we do have aspirations for
            multilingual support in the future. Our objective is to promote a
            culture of constructive debate on a global scale.
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
