import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Carousel from "../components/home/middle/Carousel";
import Home from "../components/home/Home";
import Dashboard from "../components/dashboard/Dashboard";
import Dashboardlayout from "../layout/Dashboardlayout";
import BetHistory from "../components/dashboard/bethistory/BetHistory";
import AccountSecurity from "../components/dashboard/security/AccountSecurity";
import TransactionsPage from "../components/dashboard/transaction/TransactionsPage";
import PaymentQueries from "../components/dashboard/payment/PaymentQueries";
import AffiliatePage from "../components/dashboard/AffiliatePage";
import ProfilePage from "../components/dashboard/profile/ProfilePage";
import CashbackPage from "../components/dashboard/vip/CashbackPage";
import BonusesGifts from "../components/dashboard/bonus/BonusesGifts";
import SupportCenter from "../components/dashboard/support/SupportCenter";
import AccountSettings from "../components/dashboard/setting/AccountSettings";
import Adminlayout from "../layout/Adminlayout";
import Overview from "../components/admin/pages/Overview";
import AdminLogin from "../components/admin/pages/Adminlogin";
import Activeuser from "../components/admin/pages/users/Activeuser";
import Deactiveuser from "../components/admin/pages/users/Deactiveuser";
import Alldeposit from "../components/admin/pages/deposit/Alldeposit";
import Userdetails from "../components/admin/pages/users/userdetails.jsx/Userdetails";
import GamePopup from "../components/games/GamePopup";
// import unibetgames from "../components/games/unibetgames";
import Registration from "../components/mobile/mobile-home/pages/Registration";
import Deposit from "../components/mobile/mobile-home/pages/Deposit";
import Profile from "../components/mobile/mobile-home/pages/Profile";
import Login from "../components/mobile/mobile-home/pages/Login";
// import unibetsports from "../components/mobile/mobile-home/pages/unibetsports";
import Rockgame from "../components/games/Rockgame";
import BaccaratGame from "../components/games/BaccaratGame";
import BlackjackGame from "../components/games/BlackjackGame";
import CrashGame from "../components/games/CrashGame";
import GoalGame from "../components/games/GoalGame";
import HiloGame from "../components/games/HiloGame";
import HiloMGame from "../components/games/HiloMGame";
import MineGame from "../components/games/MineGame";
import RouletteGame from "../components/games/RouletteGame";
import SlideGame from "../components/games/SlideGame";
import VideoPoker from "../components/games/VideoPoker";

import Transactionhistory from "../components/mobile/mobile-home/pages/profile/Transactionhistory";
import Allwithdraw from "../components/admin/pages/withdraw/Allwithdraw";
import Pendingwithdraw from "../components/admin/pages/withdraw/Pendingwithdraw";
import Pendingdeposit from "../components/admin/pages/deposit/Pendingdeposit";
import Setting from "../components/admin/pages/setting/Setting";
import LogoFaviconUploader from "../components/admin/pages/setting/LogoFaviconUploader";
import Configuration from "../components/admin/pages/setting/Configuration";
import Addslider from "../components/admin/pages/slider/Addslider";
import Sliderlist from "../components/admin/pages/slider/Sliderlist";
import Errorpage from "../components/common/Errorpage";
import Dicegame from "../components/games/Dicegame";
import Gessinggame from "../components/games/Gessinggame";
import Conflip from "../components/games/Conflip";
import Spingame from "../components/games/Spingame";
import Gamelogs from "../components/admin/pages/unibetgames/Gamelogs";
import Gamesdetails from "../components/admin/pages/unibetgames/Gamesdetails";
// import unibetgames from "../components/admin/pages/unibetgames/unibetgames";
import Generalsettings from "../components/admin/pages/setting/Generalsettings";
import Addgame from "../components/admin/pages/unibetgames/Addgame";
import Dice from "../components/games/Dice";
import Leaderboard from "../components/home/leaderboard/leaderboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/leaderboard",
        element: <Leaderboard />,
      },
    ],
  },
  {
    path: "/",
    element: <Dashboardlayout />,
    children: [
      {
        path: "/en/office/recharge",
        element: <Dashboard />,
      },
      {
        path: "/en/office/history",
        element: <BetHistory />,
      },
      {
        path: "/en/office/security",
        element: <AccountSecurity />,
      },
      {
        path: "/en/office/historypay",
        element: <TransactionsPage />,
      },
      {
        path: "/en/office/requests",
        element: <PaymentQueries />,
      },
      {
        path: "/en/office/bringfriend",
        element: <AffiliatePage />,
      },
      {
        path: "/en/office/profile",
        element: <ProfilePage />,
      },
      {
        path: "/en/office/casino/vipcashback",
        element: <CashbackPage />,
      },
      {
        path: "/en/office/bonuses/deposit",
        element: <BonusesGifts />,
      },
      {
        path: "/en/office/support",
        element: <SupportCenter />,
      },
      {
        path: "/en/office/settings",
        element: <AccountSettings />,
      },
    ],
  },
  {
    path: "/admin-dashboard",
    element: <Adminlayout />,
    children: [
      {
        path: "/admin-dashboard",
        element: <Overview />,
      },
      {
        path: "/admin-dashboard/active-users",
        element: <Activeuser />,
      },
      {
        path: "/admin-dashboard/deactive-users",
        element: <Deactiveuser />,
      },
      {
        path: "/admin-dashboard/user-details/:id",
        element: <Userdetails />,
      },
      {
        path: "/admin-dashboard/all-deposits",
        element: <Alldeposit />,
      },
      {
        path: "/admin-dashboard/pending-deposits",
        element: <Pendingdeposit />,
      },
      {
        path: "/admin-dashboard/all-withdarwal",
        element: <Allwithdraw />,
      },
      {
        path: "/admin-dashboard/pending-withdarwal",
        element: <Pendingwithdraw />,
      },
      {
        path: "/admin-dashboard/settings",
        element: <Setting />,
      },
      {
        path: "/admin-dashboard/settings/logo-favicon",
        element: <LogoFaviconUploader />,
      },
      {
        path: "/admin-dashboard/settings/system-configuration",
        element: <Configuration />,
      },
      {
        path: "/admin-dashboard/add-slider",
        element: <Addslider />,
      },
      {
        path: "/admin-dashboard/slider-list",
        element: <Sliderlist />,
      },
      {
        path: "/admin-dashboard/unibethub-game-logs",
        element: <Gamelogs />,
      },
      {
        path: "/admin-dashboard/unibethub-all-games",
        element: <unibetgames />,
      },
      {
        path: "/admin-dashboard/unibethub-add-game",
        element: <Addgame />,
      },
      {
        path: "/admin-dashboard/unibethub-game-details/:id",
        element: <Gamesdetails />,
      },
      {
        path: "/admin-dashboard/setting/general-setting",
        element: <Generalsettings />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLogin />,
  },
  {
    path: "/unibet-games",
    element: <GamePopup />,
  },
  {
    path: "/registration",
    element: <Registration />,
  },
  {
    path: "/deposit",
    element: <Deposit />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/profile/transaction-history",
    element: <Transactionhistory />,
  },
  ,
  {
    path: "/login",
    element: <Login />,
  },
  ,
  {
    path: "/unibet-sports",
    element: <unibetsports />,
  },
  {
    path: "/rock_game",
    element: <Rockgame />,
  },
  {
    path: "/BaccaratGame",
    element: <BaccaratGame />,
  },
  {
    path: "/BlackjackGame",
    element: <BlackjackGame />,
  },
  {
    path: "/CrashGame",
    element: <CrashGame />,
  },
  {
    path: "/GoalGame",
    element: <GoalGame />,
  },

  {
    path: "/HiloGame",
    element: <HiloGame />,
  },
  {
    path: "/HiloMGame",
    element: <HiloMGame />,
  },
  {
    path: "/MineGame",
    element: <MineGame />,
  },

  {
    path: "/RouletteGame",
    element: <RouletteGame />,
  },
  {
    path: "/SlideGame",
    element: <SlideGame />,
  },
  {
    path: "/VideoPoker",
    element: <VideoPoker />,
  },

  {
    path: "/dice_game",
    element: <Dice />,
  },
  {
    path: "/guessing_game",
    element: <Gessinggame />,
  },
  {
    path: "/coin_flip",
    element: <Conflip />,
  },
  {
    path: "/spin_game",
    element: <Spingame />,
  },
  {
    path: "*",
    element: <Errorpage />,
  },
]);

export default router;
