import { IoGameController } from "react-icons/io5";
import { IoMdFootball } from "react-icons/io";
import { Link } from "react-router-dom";

const Partners = () => {
  const partners = [
    {
      id: 1,
      img: "https://v3.traincdn.com/genfiles/cms/desktop/contact/f4087116717d59e51fa34c237bc1cce7.png",
      link: "#",
      icon: <IoGameController />,
    },
    {
      id: 2,
      img: "https://v3.traincdn.com/genfiles/cms/desktop/contact/171b5ed95d7507e36697339bf1dd1d6b.png",
      link: "#",
      icon: <IoMdFootball />,
    },
    {
      id: 3,
      img: "https://v3.traincdn.com/genfiles/cms/desktop/contact/0ac138f884de1dcc17a40887f66a49b7.png",
      link: "#",
      icon: <IoGameController />,
    },
    {
      id: 4,
      img: "https://v3.traincdn.com/genfiles/cms/desktop/contact/489db2d374e16b141b002216655001d3.png",
      link: "#",
      icon: <IoMdFootball />,
    },
  ];
  return (
    <div className="p-4 text-sm text-white bg-[#212121] rounded-md space-y-3">
      <h2 className="font-bold uppercase">Partners</h2>
      <div className="hidden lg:flex items-center justify-start flex-wrap gap-3">
        {partners.map((partner) => (
          <Link key={partner.id} to={partner.link}>
            <div className="relative p-4 py-6 w-32 h-32 flex items-center text-sm text-white bg-[#1a1a1a] rounded-md">
              <img
                className="m-auto w-14"
                src={partner.img}
                alt="Partner Logo"
              />
              <div className="absolute text-base top-1.5 right-2">
                {partner.icon}
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="grid lg:hidden grid-cols-2 gap-3">
        {partners.slice(0,2).map((partner) => (
          <Link key={partner.id} to={partner.link}>
            <div className="relative p-4 py-6 w-full h-32 flex items-center text-sm text-white bg-[#1a1a1a] rounded-md">
              <img
                className="m-auto w-14"
                src={partner.img}
                alt="Partner Logo"
              />
              <div className="absolute text-base top-1.5 right-2">
                {partner.icon}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Partners;
