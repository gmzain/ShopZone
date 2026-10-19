import React, { useState } from "react";
import { FaBars, FaXmark } from "react-icons/fa6";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selected, setSelected] = useState("Home");

  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: "Home", id: "home" },
    { name: "Categories", id: "categories" },
    { name: "Shop", id: "shop" },
    { name: "About Us", id: "about-us" },
    { name: "Contact Us", id: "contact-us" },
  ];

  const handleNavigation = (item) => {
    setSelected(item.name);
    setMenuOpen(false);
    if (location.pathname === "/") {
      document.getElementById(item.id)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } 
    else {
      navigate("/");

      // Home page load hone ke baad section par scroll
      setTimeout(() => {
        document.getElementById(item.id)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  };

  return (
    <nav className="w-full bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-9 sm:h-12 flex items-center justify-between">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-slate-800 text-lg p-2"
          >
            {menuOpen ? <FaXmark /> : <FaBars />}
          </button>
          <div className="hidden md:flex w-full items-center justify-center">
            {navItems.map((item) => (
              <div
                key={item.name}
                onClick={() => handleNavigation(item)}
                className={`relative shrink-0 px-4 lg:px-6 py-3 text-sm font-semibold cursor-pointer transition-colors duration-200 ${
                  selected === item.name
                    ? "text-blue-600"
                    : "text-slate-700 hover:text-blue-600"
                }`}
              >
                {item.name}
                {selected === item.name && (
                  <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-blue-600 rounded-full" />
                )}
              </div>
            ))}
          </div>
          <div className="md:hidden text-lg sm:text-xl font-bold">
            <span className="text-slate-900">Shop</span>
            <span className="text-blue-600">Zone</span>
          </div>
          <div className="md:hidden w-9"></div>
        </div>
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            menuOpen ? "max-h-96 pb-2" : "max-h-0"
          }`}
        >
          <div className="border-t border-slate-100 pt-1">
            {navItems.map((item) => (
              <div
                key={item.name}
                onClick={() => handleNavigation(item)}
                className={`px-4 py-2.5 text-sm font-semibold cursor-pointer rounded-md transition-colors duration-200 ${
                  selected === item.name
                    ? "text-blue-600 bg-blue-50"
                    : "text-slate-700 hover:text-blue-600 hover:bg-slate-50"
                }`}
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;