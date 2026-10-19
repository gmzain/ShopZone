import { useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";

const Header = () => {
  
  return (
    <header className="flex h-15 w-full items-center justify-end border-b border-slate-200 bg-white px-6 py-2 shadow-sm">
      <div className="flex cursor-pointer items-center gap-1 px-3">
        <FaUserCircle className="text-4xl text-slate-400" />
        <span className="text-[14px] flex flex-col">
          <span className="font-semibold">Zain</span>
          <span className="text-[12px] -mt-1">admin</span>
        </span>
      </div>
    </header>
  );
};

export default Header;