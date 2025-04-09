import React, { useEffect, useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import axios from "axios";

const AvailableGames = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get("http://localhost:8080/admin/games");
        setGames(response.data);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };

    fetchGames();
  }, []);

  return (
    <div className="bg-[#0a0a1a] text-white min-h-screen pt-[30px] p-4 md:p-8">
      <h2 className="text-[18px] md:text-[25px] font-bold">AVAILABLE GAMES</h2>
      <p className="text-sm md:text-[16px] text-gray-400 mt-1">
        To meet today’s challenges & earn cryptocurrency
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 gap-4 mt-6">
        {games.map((game, index) => (
          <NavLink
            to={`/${game.slug}?id=${game._id}`} // Using slug for navigation
            key={index}
            className="relative rounded-lg overflow-hidden  bg-gray-900 p-2 cursor-pointer"
          >
            <img
              src={`http://localhost:8080/images/${game.image}`} // Fetch image from backend
              alt={game.gameName}
              className="w-full hover:scale-[1.1] transition-all duration-150 h-[250px] object-cover rounded-lg"
            />
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default AvailableGames;
