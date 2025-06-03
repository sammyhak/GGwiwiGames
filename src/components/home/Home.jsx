import React from "react";
import Carousel from "./middle/Carousel";
import Mainpage from "./middle/Mainpage";
import Leftside from "./leftside/Leftside";
import Rightside from "./rightside/Rightside";
import TopBarMenu from "./topBarMenu/TopBarMenu";
import Leaderboard from "./leaderboard/leaderboard";
import Topcard from "../mobile/mobile-home/games/Topcard";
import LiveSportsNav from "../mobile/mobile-home/games/LiveSportsNav";
import MatchEventBox from "../mobile/mobile-home/games/MatchEventBox";
import Livematch from "../mobile/mobile-home/games/Livematch";
import Games from "../mobile/mobile-home/games/Games";
import Slots from "../mobile/mobile-home/games/Slots";
import Livecasino from "../mobile/mobile-home/games/Livecasino";
import Tvgames from "../mobile/mobile-home/games/Tvgames";
import Livegames from "../mobile/mobile-home/games/Livegames";
import GamingUI from "./gamesUI";

const Home = () => {
  return (
    <section className="w-full  font-poppins">
      <TopBarMenu />
      {/* --------------computer-version---------------- */}
      <section className="xl:flex w-full justify-center">
        <div className="w-1/6 hidden md:block">
          {/* <Leftside /> */}
          <Leaderboard />
        </div>
        <Mainpage />
        <Rightside />
      </section>
      {/* ------------------mobile-version---------------------- */}
      {/* <section className="xl:hidden">
        <Topcard />
        <GamingUI />
        <LiveSportsNav />
        <Livematch />
        <Livegames />
        <Games />
        <Slots />
        <Livecasino />
        <Tvgames />
      </section> */}
    </section>
  );
};

export default Home;
