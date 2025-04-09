import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Pagination, Autoplay } from "swiper/modules";
import { GoStarFill } from "react-icons/go";
import { NavLink } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";
const Games = () => {
  const swiperRef = useRef(null);

  const [categoires, set_categories] = useState([
    {
      id: 1,
      image:
        "https://v3.traincdn.com/resized/size179x107/sfiles/games-images/game-previews/game-360.webp",
      slug: "treasure_tomb",
      title: "Treasure Tomb",
    },
    {
      id: 1,
      image:
        "https://v3.traincdn.com/resized/size179x107/sfiles/games-images/game-previews/game-371.webp",
      slug: "treasure_tomb",
      title: "Treasure Tomb",
    },
    {
      id: 1,
      image:
        "https://v3.traincdn.com/resized/size179x107/sfiles/games-images/game-previews/game-249.webp",
      slug: "treasure_tomb",
      title: "Treasure Tomb",
    },
    {
      id: 1,
      image:
        "https://v3.traincdn.com/resized/size179x107/sfiles/games-images/game-previews/game-249.webp",
      slug: "treasure_tomb",
      title: "Treasure Tomb",
    },
    {
      id: 1,
      image:
        "https://v3.traincdn.com/resized/size179x107/genfiles/slots/games/1085/img78166.jpeg",
      slug: "treasure_tomb",
      title: "Treasure Tomb",
    },
    {
      id: 1,
      image:
        "https://v3.traincdn.com/resized/size179x107/genfiles/third-party-files/4bec9d4741694018ea3d36ef7bb829be/124262.jpg",
      slug: "treasure_tomb",
      title: "Treasure Tomb",
    },
  ]);
  const handlealert = () => {
    toast.error("Please,Connect game api!");
  };
  return (
    <section className="py-[20px] lg:pt-[20px] w-full px-[10px] border-b-[1px] border-gray-200">
      <Toaster />
      <div className="flex justify-between items-center pb-[10px]">
        <h1 className="text-gray-800 uppercase gap-[7px] lg:gap-[10px] text-[13px] lg:text-[22px] xl:text-[25px] font-[600]">
          Games
        </h1>
        <NavLink className="text-bg5 text-[13px] lg:text-[18px] flex justify-center items-center gap-[4px]">
          More Games <MdOutlineKeyboardDoubleArrowRight />
        </NavLink>
      </div>
      <section>
        <Swiper
          slidesPerView={2}
          spaceBetween={15}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            300: {
              slidesPerView: 2.4,
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 2.4,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 6,
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
          navigation={false} // Disable default navigation since we're using custom buttons
        >
          {categoires?.map((data) => (
            <SwiperSlide key={data.id} className="w-full cursor-pointer">
              <NavLink onClick={handlealert}>
                <div className="relative top-0 left-0 bg-gray-200 rounded-[5px] overflow-hidden group">
                  <img
                    className="w-full h-[100px] xl:h-[260px] lg:rounded-[10px]"
                    src={data.image}
                    alt=""
                  />
                  <div>
                    <h2 className="text-[12px] text-center py-[5px]">
                      {data.title}
                    </h2>
                  </div>
                </div>
              </NavLink>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </section>
  );
};

export default Games;
