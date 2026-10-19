import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaChartLine,
  FaBoxOpen,
  FaClipboardList,
  FaChevronDown,
} from "react-icons/fa6";
import { useContext } from "react";
import { AppContext } from "../AppContext/AppContext";

const Sidebar = () => {
  const [productOpen, setProductOpen] = useState(false);
  const {viewOrder , setViewOrder} = useContext(AppContext)

  const navLinkClass = ({ isActive }) =>
    `flex items-center justify-between gap-3 rounded-lg px-4 py-3 text-[15px] font-medium transition ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
    }`;

  return (
    <aside className="sticky top-0 min-h-screen w-70 shrink-0 border-r border-slate-200 bg-white">  
      <div className="flex h-15 items-center border-b border-slate-200 px-6">
        <h1 className="text-2xl font-bold text-slate-800">
          Shop Zone
        </h1>
      </div>
      <nav className="space-y-2 px-4 py-6">
        <NavLink
          to="/"
          className={navLinkClass}
        >
          <div className="flex gap-2.5">
          <FaClipboardList classNam e="text-lg mt-px" />
          Dashboard
          </div>
        </NavLink>
        <div>
          <button
            onClick={() => setProductOpen(!productOpen)}
            className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-[15px] font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
          >
            <div className="flex items-center gap-3">
              <FaBoxOpen className="text-lg" />
              <span>Products</span>
            </div>

            <FaChevronDown
              className={`text-xs transition-transform duration-200 ${
                productOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          {productOpen && (
            <div className="mt-1 space-y-1 pl-10">
              <NavLink
                to="/add-product"
                className={({ isActive }) =>
                  `block rounded-lg px-4 py-2.5 text-sm font-medium transition ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                  }`
                }
              >
                Add Product
              </NavLink>

              <NavLink
                to="/pro"
                end
                className={({ isActive }) =>
                  `block rounded-lg px-4 py-2.5 text-sm font-medium transition ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                  }`
                }
              >
                All Products
              </NavLink>
            </div>
          )}
        </div>
        <NavLink
          to="/orders"
          className={navLinkClass}
          onClick={()=>setViewOrder(false)}
        >
          <div className="flex gap-2.5">
          <FaClipboardList classNam e="text-lg mt-px" />
          Orders
          </div>
          {
            viewOrder ? <div className="w-3 h-3 bg-green-500 rounded-full"></div> : ''
          }
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;