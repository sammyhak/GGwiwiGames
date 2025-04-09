import { BiSupport } from "react-icons/bi";
import {
  FaFacebookF,
  FaInstagram,
  FaTelegramPlane,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import FooterFaq from "../home/footerFaq/FooterFaq";
import FooterFaqBottom from "../home/footerFaq/FooterFaqBottom";
import FooterMenu from "../home/footer/FooterMenu";
import Partners from "../home/footer/Partners";

const Footer = () => {
  // social link
  const socialLinks = [
    { id: 1, icon: <FaFacebookF />, url: "https://facebook.com" },
    { id: 2, icon: <FaTwitter />, url: "https://twitter.com" },
    { id: 3, icon: <FaInstagram />, url: "https://instagram.com" },
    { id: 3, icon: <FaYoutube />, url: "https://youtube.com" },
    { id: 3, icon: <FaTelegramPlane />, url: "https://telegram.com" },
  ];

  return (
    <div>
      <div className="p-3 space-y-3 lg:pb-2 pb-[100px] bg-[#1A1A1A]">
        <FooterFaq />
        <FooterFaqBottom />
        <FooterMenu />
        <Partners />

        {/* <p className="p-4 text-sm text-[#c2c2c2] bg-[#212121] rounded-md">
          melbet.com is owned and operated by Pelican Entertainment B.V. as a
          License Holder (Curacao Egaming License No. 8048/JAZ2020-060) with a
          registered office located at Dr. H. Fergusonweg 1, Curaсao and Edric
          Ltd (with registration number HE446653 and registered office located
          at Dimostheni Severi, 23, office 11, 1080, Limassol, Cyprus) and Faren
          Ltd (with registration number HE446654 and registered office located
          at Dimostheni Severi, 23, office 11, 1080, Limassol, Cyprus) act as
          Billing Agents for the website. All rights reserved and protected by
          law.
        </p> */}

        <div className="flex lg:flex-row flex-col gap-3 w-full text-[#c2c2c2]">
          <div className="p-4 text-[12px] lg:text-sm bg-[#212121] rounded-md">
            <p>
              GGwiwiuses cookies to ensure the best user experience. By
              remaining on the website, you consent to the use of your cookie
              files on Melbet.{" "}
              <Link>
                <span className="font-bold underline">Find out more</span>
              </Link>
            </p>
            <p>© 2015 - 2025, All rights reserved and protected by law.</p>
            <p>
              The platform{"'"}s interface and code are protected by copyright
              laws and are registered with the UK{"'"}s Copyright House as of
              July 5, 2024, under Certificate of Registration IDs WS972540219
              and WS972540218. Unauthorized use, reproduction, or distribution
              of any content from the website is strictly prohibited and may
              result in legal action.
            </p>
          </div>

          <div className="p-4 hidden lg:flex gap-3 items-center justify-center bg-[#212121] rounded-md">
            <BiSupport className="text-5xl" />
            <div className="">
              <p className="text-white text-md font-bold uppercase">Support</p>
              <Link>
                <p className="text-xl hover:text-white duration-300">
                  442038077601
                </p>
              </Link>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex xl:flex-row flex-col items-center gap-1 xl:gap-2">
              <div className="w-full p-4 bg-[#212121] rounded-md">
                <div className="hidden lg:flex  justify-center gap-2 items-center">
                  {socialLinks.map((social) => (
                    <Link key={social.id} href={social.url} target="_blank">
                      <div className="p-1.5 text-black bg-white hover:bg-amber-300 rounded-full duration-300">
                        {social.icon}
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="grid lg:hidden grid-cols-5 gap-2 items-center">
                  {socialLinks.map((social) => (
                    <Link key={social.id} href={social.url} target="_blank">
                      <div className="p-1.5 py-[12px] text-white flex justify-center items-center bg-[#2E2E2E] hover:bg-amber-300 hover:text-gray-800 rounded-[3px] text-[17px] duration-300">
                        {social.icon}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="p-4 lg:flex hidden w-full xl:w-auto text-2xl text-center font-semibold bg-[#212121] rounded-md">
                18+
              </div>
            </div>
            <Link>
              <div className="py-1.5 px-2 lg:flex hidden text-sm font-medium text-center bg-[#212121] hover:bg-[#424141] duration-300 rounded-md uppercase">
                Mobile version
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
