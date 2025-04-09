import { Outlet } from "react-router-dom";
import TopBarMenu from "../components/home/topBarMenu/TopBarMenu";
import Footer from "../components/shared/Footer";
import BottomNav from "../components/mobile/mobile-home/games/BottomNav";

const MainLayout = () => {
  return (
    <div className="xl:bg-[#1a1a1a]">
      <Outlet />
      <Footer />
      <BottomNav/>
    </div>
  );
};

export default MainLayout;
