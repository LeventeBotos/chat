import React from "react";

const page = () => {
  return (
    <div className="w-full text-white pt-36 p-5 h-screen overflow-hidden text-lg md:text-xl flex justify-evenly">
      <div className="w-full h-full md:w-2/3 self-center flex flex-col gap-5">
        <div>
          <p className="gradient text-3xl md:text-5xl font-bold ">Deb8-ről</p>
        </div>
        <div className="h-full flex flex-col justify-evenly gap-5">
          <p>
            Üdvözölünk a Deb8 platformon, amelynek célja a vita kultúrájának
            fejlesztése Magyarországon. Oldalunk egyetlen lényeges szándékkal
            jött létre: a konstruktív párbeszéd művészetének erősítése. Legyen
            szó rutinos vitapartnerről vagy a viták világába való kezdőről, a
            Deb8 felkínálja a színpadot, a párbeszéd partnerét és az ösztönző
            témákat, hogy értékes beszélgetéseket folytathass.
          </p>
          <p>
            A Deb8-nál fontosnak tartjuk az emberi kapcsolatok valódi értékét.
            Ezért nálunk nem rejtőzik az anonimitás homályában a te neved.
            Inkább büszkén mutatjuk be a nevedet, így elősegítve egy személyes
            és hiteles kapcsolat kialakítását közted és a vitapartnereid között.
          </p>
          <p>
            Aggódsz az adataid biztonsága miatt? Nyugodj meg, nálunk a bizalmad
            az elsődleges szempont. A Deb8 elkötelezett azért, hogy megőrizze a
            magánéletedet. Nincs szándékunk belekukkantani a személyes
            információidba vagy visszaélni az adataiddal. A magánszférádat
            tiszteletben tartjuk, és adataid nálunk biztonságban vannak.
          </p>
          <p>
            Csatlakozz hozzánk a Deb8-on, és tapasztald meg azt a vita
            platformot, amely ösztönzi a nyílt párbeszédet, elkötelezett a
            transzparencia mellett, és mindenekelőtt tiszteletteljes beszélgetés
            kultúráját népszerűsíti.
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
