import React from 'react'
import TopBarMenu from '../home/topBarMenu/TopBarMenu'
const games = [
    {
      title: "Head & Tail",
      image: "https://script.viserlab.com/xaxino/demo/assets/images/game/6592b9b5aace01704114613.png",
    },
    {
      title: "Rock Paper Scissors",
      image: "https://script.viserlab.com/xaxino/demo/assets/images/game/610515f76a27a1627723255.jpg",
    },
    {
      title: "Spin Wheel",
      image: "https://script.viserlab.com/xaxino/demo/assets/images/game/61051d8469d731627725188.jpg",
    },
    {
      title: "Number Guessing",
      image: "https://script.viserlab.com/xaxino/demo/assets/images/game/61051a9ed28511627724446.jpg",
    },
  ];
  
  const GameBox = ({ title, image }) => {
    return (
      <div className="bg-[#0f172a] rounded-lg overflow-hidden shadow-lg p-4 w-full max-w-[250px]">
        <img src={image} alt={title} className="w-full h-40 object-cover rounded-md" />
        <h3 className="text-white text-lg font-semibold mt-3">{title}</h3>
        <button className="mt-3 w-full bg-yellow-500 text-black py-2 rounded-md font-bold hover:bg-yellow-600 transition">
          PLAY NOW
        </button>
      </div>
    );
  };
  
const unibetgames = () => {
  return (
    <section className='bg-[#01162F] '>
        <TopBarMenu/>
       <section className='w-full h-screen px-[10px] lg:px-[30px] py-[30px]'>
       <div className=' w-[100%] md:w-[80%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%] m-auto text-center font-[500] text-white'>
            <h1 className=' text-[22px] lg:text-[25px] xl:text-[30px] mb-[10px]'>Our Awesome Games</h1>
            <p className='text-[12px] xl:text-[14px] font-[400] '>Get ready for endless fun and excitement with Xaxino’s incredible selection of games! Whether you’re a fan of classic casino games or looking for something new, we’ve got you covered.</p>
        </div>
        <div className="w-full flex flex-wrap gap-6 justify-center p-6 mt-[50px]">
      {games.map((game, index) => (
        <GameBox key={index} title={game.title} image={game.image} />
      ))}
    </div>
       </section>
    </section>
  )
}

export default unibetgames
