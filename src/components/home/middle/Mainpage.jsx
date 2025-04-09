import React from "react";
import Carousel from "./Carousel";
import Topmenu from "./Topmenu";
import SportsBetting from "./SportsBetting";
import BettingCard from "./BettingCard";
import GamingUI from "../gamesUI";

const Mainpage = () => {
  return (
    <section className="px-[5px] w-full lg:w-[80%] h-[100vh] bg-[#1A1A1A]  overflow-y-auto custom-scrollbar">
      <Carousel />
      <GamingUI />
      <section>
        <Topmenu />
        <SportsBetting />
        <BettingCard />
      </section>
    </section>
  );
};

export default Mainpage;
