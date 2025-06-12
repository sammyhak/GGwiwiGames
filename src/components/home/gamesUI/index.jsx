import { useEffect, useState } from "react";
import Card from "./_component/card";
import FeaturedCard from "./_component/featuredCard";
import GameCard from "./_component/gameCard";
import LiveCard from "./_component/liveGameCard";
import Glowcard from "../../shared/glowcard";
import IMAGES from "../../../assets/images";
import axios from "axios";

let featuredGames = [
  {
    name: "Rock, Paper",
    img: "https://script.viserlab.com/xaxino/demo/assets/templates/basic//images/play/rock.png",
    color: "bg-yellow-600 border-yellow-600",
    path: "/rock_game",
  },
  {
    name: "Coin Flip",
    img: "https://script.viserlab.com/xaxino/demo/assets/templates/basic/images/play/head.png",
    color: "bg-primary border-primary",
    path: "/coin_flip",
  },
  {
    name: "Roll",
    img: IMAGES.roll,
    color: "bg-yellow-500 border-yellow-500",
    path: "/spin_game",
  },
  {
    name: "Dice Duel",
    img: IMAGES.dice,
    color: "bg-primary border-primary",
    path: "/dice_game",
  },
  {
    name: "Guess The Number",
    img: IMAGES.bacarat,
    color: "bg-primary border-primary",
    path: "/guessing_game",
  },
];

let LiveGames = [
  {
    name: "Roulett",
    img: "https://script.viserlab.com/xaxino/assets/images/games/Roulette.jpg",
    color: "bg-yellow-600 border-yellow-600",
    path: "/rock_game",
  },
  {
    name: "BlackJack",
    img: "https://script.viserlab.com/xaxino/demo/assets/templates/basic/images/play/head.png",
    color: "bg-primary border-primary",
    path: "/coin_flip",
  },
  {
    name: "Baccarat",
    img: IMAGES.roll,
    color: "bg-yellow-500 border-yellow-500",
    path: "/spin_game",
  },
  {
    name: "Fighting Chicken",
    img: IMAGES.dice,
    color: "bg-primary border-primary",
    path: "/dice_game",
  },
  {
    name: "CrashGame",
    img: IMAGES.crash,
    color: "bg-primary border-primary",
    path: "/dice_game",
  },
];

const otherGames = [
  {
    name: "BlackjackGame",
    img: IMAGES.blackjack,
    color: "bg-black border-black",
  },
  { name: "Mines", img: IMAGES.mine, color: "bg-primary border-primary" },

  {
    name: "Case battle",
    img: IMAGES.case_battle,
    color: "bg-yellow-600 border-yellow-600",
  },
  { name: "CrashGame", img: IMAGES.crash, color: "bg-primary border-primary" },
  { name: "Roll", img: IMAGES.roll, color: "bg-yellow-500 border-yellow-500" },
  { name: "Dice Duel", img: IMAGES.dice, color: "bg-primary border-primary" },
  {
    name: "BaccaratGame",
    img: IMAGES.bacarat,
    color: "bg-primary border-primary",
  },
  {
    name: "BlackjackGame",
    img: IMAGES.blackjack,
    color: "bg-primary border-primary",
  },
  {
    name: "GoalGame",
    img: IMAGES.Glowcard,
    color: "bg-primary border-primary",
  },
  { name: "HiloGame", img: IMAGES.hero1, color: "bg-primary border-primary" },
  { name: "HiloMGame", img: IMAGES.hero2, color: "bg-primary border-primary" },
  { name: "MineGame", img: IMAGES.hero3, color: "bg-primary border-primary" },
  {
    name: "RouletteGame",
    img: IMAGES.rocket,
    color: "bg-primary border-primary",
  },
  {
    name: "SlideGame",
    img: IMAGES.case_battle,
    color: "bg-primary border-primary",
  },
  { name: "VideoPoker", img: IMAGES.roll, color: "bg-primary border-primary" },
];

const GamingUI = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Games");

  const [games, setGames] = useState();

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get(
          "https://ggwiwigamesbe.onrender.com/admin/games"
        );
        setGames(response.data);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };

    fetchGames();
  }, []);
  return (
    <div className="">
      {/* Top Promotional Banner */}
      <div className="flex overflow-x-auto gap-4 mb-6">
        <Card
          color="bg-primary text-white"
          img={IMAGES.welcome2}
          text="Real-Time Live Games"
        />
        <Card
          color="bg-purple-500 text-white"
          img={IMAGES.treasure}
          text="Instant Payouts"
        />
        <Card
          color="bg-green-500 text-white"
          img={IMAGES.welcomebonus}
          text="Gaming Community Vibes"
        />
      </div>

      {/* Search & Filters */}
      <div className="flex items-center gap-4 mb-6 text-white">
        <input
          type="text"
          placeholder="Search for games"
          className="bg-gray-800 p-3 rounded-lg w-full text-wgray-500"
        />
        <button className="bg-gray-700 px-4 py-2 rounded-lg">Sort</button>
      </div>
      <div className="flex overflow-x-auto gap-2 mb-6">
        {[
          "All Games",
          "Crash Games",
          "New Games",
          "Card Games",
          "Top Games",
          "Providers",
        ].map((category, index) => (
          // <Glowcard
          //   show={selectedCategory === category}
          //   color="bg-primary border-primary text-white"
          //   size="5rem"
          // >
          //   <button
          //     key={index}
          //     className=" px-4 py-2 rounded-lg whitespace-nowrap "
          //     onClick={() => setSelectedCategory(category)}
          //   >
          //     {category}
          //   </button>
          // </Glowcard>
          <></>
        ))}
      </div>
      <div className="uppercase mb-2 text-white">Live Casino Games</div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-6">
        {games && games.length > 0
          ? games.map((game, index) => (
              <LiveCard
                key={index}
                path={`/${game.slug}?id=${game._id}`}
                name={game.gameName}
                img={game.image}
                color={game.color}
              />
            ))
          : LiveGames.map((game, index) => <LiveCard key={index} {...game} />)}
      </div>
      <div className="uppercase mb-2 text-white">{selectedCategory}</div>
      {/* Game Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-6">
        {games && games.length > 0
          ? games.map((game, index) => (
              <FeaturedCard
                key={index}
                path={`/${game.slug}?id=${game._id}`}
                name={game.gameName}
                img={game.image}
                color={game.color}
              />
            ))
          : featuredGames.map((game, index) => (
              <FeaturedCard key={index} {...game} />
            ))}
      </div>

      <div className="uppercase mb-2 text-white">Other games</div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-6">
        {otherGames.map((game, index) => (
          <a href={`${game.name}`}>
            <GameCard key={index} {...game} />
          </a>
        ))}
      </div>
    </div>
  );
};

export default GamingUI;
