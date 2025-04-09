import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { FaPlay } from 'react-icons/fa';
import { Pagination, Autoplay } from 'swiper/modules';
import toast,{Toaster} from "react-hot-toast"

const Topcard = () => {
    const swiperRef = useRef(null);
    const handlealert=()=>{
        toast.error("Please,Connect game api!")
      }
    const [categories, setCategories] = useState([
        { id: 1, image: 'https://v3.traincdn.com/genfiles/banners-admin-api/all/5096f38f1c66f0867eccae5e8e7cda6a.webp', title: 'ICC Champions Spin-Off' },
        { id: 2, image: 'https://v3.traincdn.com/genfiles/banners-admin-api/all/3cb66490572ca0d937aeb3feada3628a.webp', title: 'First deposit bonus!' },
        { id: 3, image: 'https://v3.traincdn.com/genfiles/banners-admin-api/all/32ab23268c7c60efe88b4e654ef1e592.webp', title: 'MELBET ADVENTURE PARK' },
        { id: 4, image: 'https://v3.traincdn.com/genfiles/banners-admin-api/all/bf18455c0e4f65a79c59e34b5e8c51a0.webp', title: 'Fast Games Wins' },
        { id: 5, image: 'https://v3.traincdn.com/resized/size301x180/genfiles/slots/games/1380/img88531.jpeg', title: 'Grand Slam - Grand Win' },
        { id: 6, image: 'https://v3.traincdn.com/resized/size301x180/genfiles/slots/games/1085/img78166.jpeg', title: 'Cricket legend' }
    ]);

    return (
        <section className='px-[8px]  bg-gray-200 w-full'>

            <Swiper
                slidesPerView={3}
                spaceBetween={5}
                pagination={{ clickable: true }}
                breakpoints={{
                    300: { slidesPerView: 3.5, spaceBetween: 5 },
                    640: { slidesPerView: 3.5, spaceBetween: 5 },
                    1024: { slidesPerView: 5, spaceBetween: 5}
                }}
                className='mySwiper flex  '
                autoplay
                ref={swiperRef}
            >
                {categories.map((data) => (
                    <SwiperSlide key={data.id} className='cursor-pointer h-full py-[10px]'>
                        <div onClick={handlealert} className='relative rounded-[4px] p-[8px]  bg-white shadow-md overflow-hidden group '>
                            <img className='w-[100px] h-[100px] xl:h-64 rounded-[4px]' src={data.image} alt={data.title} />
                            <div className=' text-gray-800 flex justify-center h-[40px]  items-center mt-[3px] text-center text-[10px] xl:text-lg'>
                                {data.title}
                            </div>
                      
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default Topcard;
