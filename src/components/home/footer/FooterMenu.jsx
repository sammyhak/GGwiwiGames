import { useState } from "react";
import { FaAndroid, FaApple, FaEllipsisH } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo.png";

const FooterMenu = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      name: "Android",
      icon: <FaAndroid className="inline-block mr-2" />,
      content: {
        qr: "https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg",
        title: "Mobile application",
        downloadLink: "#android-download",
        downloadText: "Download",
      },
    },
    {
      name: "iOS",
      icon: <FaApple className="inline-block mr-2" />,
      content: {
        qr: "https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg",
        title: "Mobile application",
        downloadLink: "#ios-download",
        downloadText: "Instructions",
      },
    },
    {
      name: "Others",
      icon: <FaEllipsisH className="inline-block mr-2" />,
      content: {
        // qr: "https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg",
        title: "Other apps",
        downloadLink: "#other-download",
        downloadText: "Instructions",
      },
    },
  ];

  return (
    <div className="p-4 text-sm text-white bg-[#212121] rounded-md">
      <div className="flex justify-around flex-wrap gap-6 w-full">
        <div className="space-y-2 hidden md:block">
          <h2 className="text-md font-bold">MelBet</h2>
          <div className="">
            <Link>
              <div className="p-0.5 text-sm hover:text-[#c2c2c2] duration-300">
                About us
              </div>
            </Link>
            <Link>
              <div className="p-0.5 text-sm hover:text-[#c2c2c2] duration-300">
                Terms and Conditions
              </div>
            </Link>
            <Link>
              <div className="p-0.5 text-sm hover:text-[#c2c2c2] duration-300">
                Affiliate Program
              </div>
            </Link>
            <Link>
              <div className="p-0.5 text-sm hover:text-[#c2c2c2] duration-300">
                Become an agent
              </div>
            </Link>
            <Link>
              <div className="p-0.5 text-sm hover:text-[#c2c2c2] duration-300">
                Сookie Policy
              </div>
            </Link>
            <Link>
              <div className="p-0.5 text-sm hover:text-[#c2c2c2] duration-300">
                Contacts
              </div>
            </Link>
            <Link>
              <div className="p-0.5 text-sm hover:text-[#c2c2c2] duration-300">
                How to place a bet
              </div>
            </Link>
          </div>
        </div>

        <div className="space-y-2 hidden md:block">
          <h2 className="text-md font-bold">Betting</h2>
          <div className="">
            <Link>
              <div className="p-0.5 text-sm hover:text-[#c2c2c2] duration-300">
                Sports
              </div>
            </Link>
            <Link>
              <div className="p-0.5 text-sm hover:text-[#c2c2c2] duration-300">
                Multi-LIVE
              </div>
            </Link>
            <Link>
              <div className="p-0.5 text-sm hover:text-[#c2c2c2] duration-300">
                Live
              </div>
            </Link>
            <Link>
              <div className="p-0.5 text-sm hover:text-[#c2c2c2] duration-300">
                Toto
              </div>
            </Link>
          </div>
        </div>

        <div className="space-y-2 hidden md:block">
          <h2 className="text-md font-bold">Games</h2>
          <div className="">
            <Link>
              <div className="p-0.5 text-sm hover:text-[#c2c2c2] duration-300">
                Slots
              </div>
            </Link>
            <Link>
              <div className="p-0.5 text-sm hover:text-[#c2c2c2] duration-300">
                Fast Games
              </div>
            </Link>
            <Link>
              <div className="p-0.5 text-sm hover:text-[#c2c2c2] duration-300">
                Live Casino
              </div>
            </Link>
          </div>
        </div>

        <div className="space-y-2 hidden md:block">
          <h2 className="text-md font-bold">Statistics</h2>
          <div className="">
            <Link>
              <div className="p-0.5 text-sm hover:text-[#c2c2c2] duration-300">
                Statistics
              </div>
            </Link>
            <Link>
              <div className="p-0.5 text-sm hover:text-[#c2c2c2] duration-300">
                Results
              </div>
            </Link>
          </div>
        </div>

        <div className="space-y-2 hidden md:block">
          <h2 className="text-md font-bold">Useful links</h2>
          <div className="">
            <Link>
              <div className="p-0.5 text-sm hover:text-[#c2c2c2] duration-300">
                Mobile version
              </div>
            </Link>
            <Link>
              <div className="p-0.5 text-sm hover:text-[#c2c2c2] duration-300">
                Registration
              </div>
            </Link>
            <Link>
              <div className="p-0.5 text-sm hover:text-[#c2c2c2] duration-300">
                Partnership
              </div>
            </Link>
          </div>
        </div>

        <div className="space-y-2 w-full lg:w-auto">
          <h2 className="text-md font-bold">Apps</h2>
          <div className="w-full">
            {/* Tab Buttons */}
            <div className="flex bg-[#1a1a1a] rounded-md overflow-hidden">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  className={`w-full flex items-center justify-center px-4 py-2 text-sm font-medium outline-0 transition-all duration-200 cursor-pointer ${
                    activeTab === index
                      ? "text-white bg-[#2b2b2b]"
                      : "border-transparent text-[#c2c2c2]"
                  }`}
                  onClick={() => setActiveTab(index)}
                >
                  {tab.icon} {tab.name}
                </button>
              ))}
            </div>

            {/* Dynamic Content */}
            <div className="p-4 mt-2 flex items-center gap-3 bg-[#1a1a1a] rounded-md">
              {tabs[activeTab].content.qr && (
                <img
                  className="bg-amber-50 w-20"
                  src={tabs[activeTab].content.qr}
                  alt="QR Code"
                />
              )}

              <div className="w-full text-center space-y-2">
                <img className="m-auto w-20" src={logo} alt="App Logo" />
                <h2 className="text-[12px] font-bold uppercase">
                  {tabs[activeTab].content.title}
                </h2>
                <a
                  href={tabs[activeTab].content.downloadLink}
                  className="p-1 block text-center w-full bg-[#212121] hover:bg-sky-600 duration-300 rounded-md"
                >
                  {tabs[activeTab].content.downloadText}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterMenu;
