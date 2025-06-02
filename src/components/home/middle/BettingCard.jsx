import { FaFutbol } from "react-icons/fa";
import BettingCard2 from "./BettingCard2";

const bets = [
  {
    title: "Accumulator Of The Day №1",
    matches: [
      {
        time: "15/02 22:00",
        teams: ["Blau-Weiß Linz", "Rheindorf Altach"],
        league: "Austria. Bundesliga",
        odds: "1.23",
        betType: "Double Chance 1X",
        flagHome: "https://v3.traincdn.com/resized/size16/sfiles/logo_teams/6388.webp",
        flagAway: "https://v3.traincdn.com/resized/size16/sfiles/logo_teams/9f488319d51c0cb13d763648a7a2a8f9.webp",
      },
      {
        time: "15/02 22:00",
        teams: ["Blau-Weiß Linz", "Rheindorf Altach"],
        league: "Austria. Bundesliga",
        odds: "1.23",
        betType: "Double Chance 1X",
        flagHome: "https://v3.traincdn.com/resized/size16/sfiles/logo_teams/6388.webp",
        flagAway: "https://v3.traincdn.com/resized/size16/sfiles/logo_teams/9f488319d51c0cb13d763648a7a2a8f9.webp",
      },
      {
        time: "15/02 22:00",
        teams: ["Blau-Weiß Linz", "Rheindorf Altach"],
        league: "Austria. Bundesliga",
        odds: "1.23",
        betType: "Double Chance 1X",
        flagHome: "https://v3.traincdn.com/resized/size16/sfiles/logo_teams/6388.webp",
        flagAway: "https://v3.traincdn.com/resized/size16/sfiles/logo_teams/9f488319d51c0cb13d763648a7a2a8f9.webp",
      },
      {
        time: "15/02 22:00",
        teams: ["Blau-Weiß Linz", "Rheindorf Altach"],
        league: "Austria. Bundesliga",
        odds: "1.23",
        betType: "Double Chance 1X",
        flagHome: "https://v3.traincdn.com/resized/size16/sfiles/logo_teams/6388.webp",
        flagAway: "https://v3.traincdn.com/resized/size16/sfiles/logo_teams/9f488319d51c0cb13d763648a7a2a8f9.webp",
      },
    ],
    bonus: "1.1",
    oddsTotal: "8.161",
  },
];

export default function BettingCard() {
  return (
    <section className="flex flex-col md:flex-row justify-center gap-4  md:px-0">
    <div className="flex flex-col gap-4 mt-4 md:mt-8 w-full md:w-1/2 h-full bg-white">
      {bets.map((bet, index) => (
        <div key={index} className="bg-gray-200 shadow-lg rounded-lg w-full md:p-4">
          <div className="bg-gray-800 text-white px-3 md:px-4 py-2 md:py-3 font-bold text-sm md:text-base">{bet.title}</div>
          <div className="p-3 md:p-4">
            {bet.matches.map((match, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center p-2 md:p-3 bg-gray-100 mb-2 rounded-[4px] border-b border-gray-300 text-xs md:text-sm"
              >
                <div className="w-full">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1 md:gap-2 mb-1 md:mb-2">
                          <p className="text-gray-500 text-[10px] md:text-xs">{match.time}</p>
                        </div>
                        <div className="flex items-center gap-1 md:gap-2">
                          <img src={match.flagHome} alt="flag" className="w-4 h-4 md:w-5 md:h-5" />
                          <span className="font-semibold text-gray-900 text-xs md:text-sm">{match.teams[0]}</span>
                        </div>
                        <div className="flex items-center gap-1 md:gap-2 mt-1 md:mt-2">
                          <img src={match.flagAway} alt="flag" className="w-4 h-4 md:w-5 md:h-5" />
                          <span className="font-semibold text-gray-900 text-xs md:text-sm">{match.teams[1]}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-bold bg-gray-200 text-gray-700 px-2 py-1 rounded-[4px] text-xs md:text-sm">{match.odds}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-2 text-[10px] md:text-sm">
                    <div className="flex items-center gap-1 md:gap-2 text-gray-700">
                      <FaFutbol />
                      <span>{match.league}</span>
                    </div>
                    <span className="text-gray-700">{match.betType}</span>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex justify-between p-2 bg-white rounded-md mt-2 border border-gray-300 text-xs md:text-sm">
              <span className="text-gray-700">BONUS from 99wiwi</span>
              <span className="font-bold text-gray-900">{bet.bonus}</span>
            </div>
            <div className="flex justify-between p-2 bg-white rounded-md mt-2 border border-gray-300 text-xs md:text-sm">
              <span className="text-gray-700">Overall odds</span>
              <span className="font-bold text-gray-900">{bet.oddsTotal}</span>
            </div>
            <button className="w-full bg-theme-color text-black font-medium text-sm md:text-[15px] py-2 md:py-3 mt-3 md:mt-4 rounded-md hover:bg-yellow-500">
              ADD TO BET SLIP
            </button>
          </div>
        </div>
      ))}
    </div>
    <BettingCard2 />
  </section>
  );
}