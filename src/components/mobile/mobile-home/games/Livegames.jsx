import React, { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Pagination,Autoplay} from 'swiper/modules';
import { GoStarFill } from "react-icons/go";
import { NavLink } from 'react-router-dom';
import { FaPlay } from "react-icons/fa";
import { PiGameController } from "react-icons/pi";
import { FiMoreVertical } from "react-icons/fi";
import { FaPenNib } from "react-icons/fa6";
import { MdOutlineSportsCricket } from "react-icons/md"
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import toast,{Toaster} from "react-hot-toast"

const Livegames = () => {
    const swiperRef = useRef(null);
        const handlealert=()=>{
          toast.error("Please,Connect game api!")
        }
    const matchData = [
        {
            event: "Event in progress / ODI",
            league: "South Africa. One Day Cup. Division 2",
            teams: [
              {
                name: "South Africa Emerging Team",
                logo: "https://v3.traincdn.com/resized/size16/sfiles/logo_teams/53587.webp",
                score: 0,
              },
              {
                name: "Eastern Cape Linyathi",
                logo: "https://v3.traincdn.com/resized/size16/sfiles/logo_teams/d60921c47cb14acb69d939f85154852a.webp",
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
          },
          {
            event: "Event in progress / ODI",
            league: "South Africa. One Day Cup. Division 2",
            teams: [
              {
                name: "South Africa Emerging Team",
                logo: "https://v3.traincdn.com/resized/size16/sfiles/logo_teams/52901.webp",
                score: 0,
              },
              {
                name: "Eastern Cape Linyathi",
                logo: "https://v3.traincdn.com/resized/size16/sfiles/logo_teams/52901.webp",
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
          }
          ,    {
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
          },
          {
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
          }
    ];
  return (
    <section className='pb-[20px] w-full bg-gray-300 p-2'>
      <Toaster/>
        <div className='flex justify-between items-center pb-[10px]'>
               <h1 className='flex justify-center items-center text-gray-800 gap-[7px] lg:gap-[10px] text-[15px] lg:text-[22px] xl:text-[25px] font-[600]'>
                         
                     Sports (270)
                     </h1>
           <NavLink className="text-bg5 text-[13px] lg:text-[18px] flex justify-center items-center gap-[4px]">
                                        More Live <MdOutlineKeyboardDoubleArrowRight/>
                                    </NavLink>
        </div>
       <section>
       <Swiper
        slidesPerView={3}
        spaceBetween={15}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          300: {
            slidesPerView: 1.2,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 1.2,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 7,
            spaceBetween: 10,
          },
          1300: {
            slidesPerView: 7,
            spaceBetween: 10,
          },
          1440: {
            slidesPerView: 7,
            spaceBetween: 10,
          },
        }}
        className="mySwiper"

        ref={swiperRef}
        navigation={false}  // Disable default navigation since we're using custom buttons
      >
        {matchData?.map((matchData) => (
          <SwiperSlide key={matchData.id} className='w-full cursor-pointer'>
                        <div className="w-full bg-white shadow-sm  p-3 text-gray-800">
                          <div className="flex justify-between items-center border-b border-gray-200 pb-2 text-gray-600 text-xs font-semibold">
                            <div className="flex items-center gap-2">
                              <MdOutlineSportsCricket className="text-gray-500 text-[15px]" /> {matchData.event}
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
                              <div key={index} onClick={handlealert} className="bg-gray-200 p-2 rounded-md">
                                <p className="font-[500] text-gray-600">{odd.label}</p>
                                <p className="text-gray-800 font-bold">{odd.value}</p>
                              </div>
                            ))}
                          </div>
                        </div>
          </SwiperSlide>
        ))}
      </Swiper>
       </section>
    </section>
  )
}

export default Livegames
