import React from "react";
import {
  FaMagnifyingGlass,
  FaCartShopping,
  FaUser,
  FaBagShopping,
} from "react-icons/fa6";
import {useNavigate} from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()
  return (
    <nav className="w-full bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6  py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <FaBagShopping className="text-lg" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
              <span className="text-slate-900">Shop</span>
              <span className="text-blue-600">Zone</span>
            </h1>
          </div>
          <div className="hidden md:flex flex-1 max-w-xl mx-4">
            <div className="flex-1 h-9 border border-slate-200 rounded-l-lg bg-slate-50 flex items-center px-4">
              <FaMagnifyingGlass className="text-slate-400 text-sm shrink-0" />
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full ml-3 bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400"
              />
            </div>
            <button
              type="button"
              className="h-9 px-5 lg:px-7 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-r-lg transition"
            >
              Search
            </button>
          </div>
          <div className="flex items-center gap-4 sm:gap-7 shrink-0">
            <div onClick={()=>navigate('/cart')} className="relative flex items-center gap-2 text-slate-700 cursor-pointer md:mt-0.75">
              <div className="relative">
                <FaCartShopping className="text-xl" />
              </div>
              <span className="hidden sm:block text-[14px] font-medium">
                Cart
              </span>
            </div>
            <div onClick={()=>navigate('/login')} className="flex items-center gap-2 text-slate-800 cursor-pointer">
              <FaUser className="text-xl" />
              <span className="hidden sm:block text-sm font-semibold">
                Login
              </span>
            </div>
          </div>
        </div>

        {/* MOBILE SEARCH */}
        <div className="flex md:hidden w-full mt-3">
          <div className="flex-1 h-11 border border-slate-200 rounded-l-lg bg-slate-50 flex items-center px-3">
            <FaMagnifyingGlass className="text-slate-400 text-sm shrink-0" />
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full ml-2 bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400"
            />
          </div>
          <button
            type="button"
            className="h-11 px-4 sm:px-6 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-r-lg transition"
          >
            Search
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;