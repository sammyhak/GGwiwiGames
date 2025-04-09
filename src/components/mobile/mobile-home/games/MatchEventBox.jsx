import { FiMoreVertical } from "react-icons/fi";
import { FaPenNib } from "react-icons/fa6";

const matchData = {
  event: "Event in progress / ODI",
  league: "South Africa. One Day Cup. Division 2",
  teams: [
    {
      name: "South Africa Emerging Team",
      logo: "https://v3.traincdn.com/resized/size16/sfiles/logo_teams/624305.webp",
      score: 0,
    },
    {
      name: "Eastern Cape Linyathi",
      logo: "http://v3.traincdn.com/resized/size16/sfiles/logo_teams/9a5478b3b9e54585e986b48a388ec223.webp",
      score: 0,
    },
  ],
  odds: [
    { label: "W1", value: "2.71" },
    { label: "DRAW", value: "50" },
    { label: "W2", value: "1.475" },
    { label: "1", value: "2.696" },
    { label: "2", value: "1.465" },
  ],
};

const MatchEventBox = () => {
  return (
    <div className="max-w-sm mx-auto bg-white shadow-md rounded-lg p-3 text-gray-800">
      <div className="flex justify-between items-center border-b pb-2 text-gray-600 text-xs font-semibold">
        <div className="flex items-center gap-2">
          <FaPenNib className="text-gray-500" /> {matchData.event}
        </div>
        <FiMoreVertical className="cursor-pointer text-gray-500" />
      </div>
      
      <p className="text-gray-500 text-xs mt-2">{matchData.league}</p>
      
      <div className="mt-2">
        {matchData.teams.map((team, index) => (
          <div key={index} className="flex justify-between items-center mt-1">
            <div className="flex items-center gap-2 font-semibold text-sm">
              <img src={team.logo} alt={team.name} className="w-5 h-5" />
              {team.name}
            </div>
            <span className="font-semibold text-sm">{team.score}</span>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-5 gap-1 mt-3 text-center text-xs">
        {matchData.odds.map((odd, index) => (
          <div key={index} className="bg-gray-100 p-2 rounded-md">
            <p className="font-semibold text-gray-600">{odd.label}</p>
            <p className="text-gray-800 font-bold">{odd.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchEventBox;