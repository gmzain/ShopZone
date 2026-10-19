import React from "react";
import {
  FaFacebookF,
  FaWhatsapp,
  FaLinkedinIn,
  FaTwitter,
  FaYoutube,
  FaLocationDot,
  FaPhone,
  FaAngleRight,
} from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const quickLinks = [
    {
        name: "Home",
        id: "home",
    },
    {
        name: "Category",
        id: "categories",
    },
    {
        name: "Shop",
        id: "shop",
    },
    {
        name: "About Us",
        id: "about-us",
    },
    {
        name: "Contact Us",
        id: "contact-us",
    },
    ];
    const socialLinks = [
        { icon: <FaFacebookF /> },
        { icon: <FaWhatsapp /> },
        { icon: <FaLinkedinIn /> },
        { icon: <FaTwitter /> },
        { icon: <FaYoutube /> },
    ];
    const handleNavigation = (item) => {
    if (location.pathname === "/") {
        document.getElementById(item.id)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
        });
    } else {
        navigate("/");
        setTimeout(() => {
        document.getElementById(item.id)?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
        }, 300);
    }
    };
    return (
    <footer className="bg-blue-700 text-white md:mt-10">
      <div className="relative overflow-hidden">
        <div className="absolute -left-20 top-16 h-64 w-64 rounded-full bg-blue-500 opacity-50"></div>
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-600 opacity-50"></div>
        <div className="relative mx-auto max-w-7xl px-6 py-8 lg:px-1">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-3 lg:gap-12">
            <div>
              <h2 className="text-2xl font-bold text-white">
                Shop{" "}<span className="text-black"> Zone</span>
              </h2>
              <p className="mt-4 text-[14px] leading-6 text-white/90">
                Shop Zone is a modern e-commerce shoe store offering a wide range of stylish, comfortable, and high-quality footwear for men and women & kids. We are committed to providing customers with the latest shoe designs, reliable quality, and an easy online shopping experience. From everyday casual shoes to trendy and elegant footwear, Shop Zone brings a variety of products together in one convenient place. With a focus on quality, affordability, and customer satisfaction.
              </p>
              <div className="mt-5 flex gap-2">
                {socialLinks.map((item, index) => (
                  <a
                    href="#"
                    key={index}
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-[#087ED9] text-base transition duration-300 "
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">
                Quick{" "}
                <span className="text-black">
                  Links
                </span>
              </h2>
              <ul className="mt-5 space-y-3">
                {quickLinks.map((item, index) => (
                <li key={index} onClick={() => handleNavigation(item)} className="cursor-pointer">
                    <div className="group flex items-center gap-2 text-[15px] text-white/90 transition-all duration-200 hover:text-black">
                    <FaAngleRight className="text-base transition group-hover:translate-x-1" />
                    {item.name}
                    </div>
                </li>
                ))}
                </ul>
                </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Our{" "}<span className="text-black">Branches</span>
              </h2>
              <div className="mt-5 border-b border-white/20 pb-4">
                <h3 className="text-lg font-semibold text-white">
                  Rawalpindi Branch
                </h3>
                <div className="mt-2 flex gap-2">
                  <FaLocationDot className="mt-1 shrink-0 text-sm" />

                  <p className="text-[14px] leading-6 text-white/90">
                    B-20 Murree Road, Block B, Satellite Town,
                    Rehmanabad, Metro Stop
                  </p>
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <FaPhone className="text-sm" />
                  <p className="text-[14px]">
                    0315-5722267, 0335-9350768
                  </p>
                </div>
              </div>
              <div className="border-b border-white/20 py-4">
                <h3 className="text-lg font-semibold text-white">
                  Gujrat Branch
                </h3>
                <div className="mt-2 flex gap-2">
                  <FaLocationDot className="mt-1 shrink-0 text-sm" />
                  <p className="text-[14px] leading-6 text-white/90">
                    Kachehri Chowk Aleena Center Gujrat
                  </p>
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <FaPhone className="text-sm" />
                  <p className="text-[14px]">
                    0315-5722267, 0335-9350768
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;