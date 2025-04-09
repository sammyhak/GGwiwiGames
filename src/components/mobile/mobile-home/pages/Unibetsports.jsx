import { useState } from "react";
import { FaArrowLeft, FaEnvelope, FaBolt, FaLock, FaEye, FaPhone, FaUsers,FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import TopBarMenu from "../../../home/topBarMenu/TopBarMenu";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { MdInfo } from "react-icons/md";
import Footer from "../../../shared/Footer";
import { NavLink, useNavigate } from "react-router-dom";
import toast,{Toaster} from "react-hot-toast"
import Swal from "sweetalert2";
import AvailableGames from "../games/AvailableGames";
export default function unibetsports() {
  return (
    <section className="bg-gray-100">
        <TopBarMenu/>
        <AvailableGames/>
        <Footer/>
    </section>
  );
}
