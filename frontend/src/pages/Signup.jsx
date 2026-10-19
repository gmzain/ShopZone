import React, { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'
import {useDispatch , useSelector} from 'react-redux'
import toast from 'react-hot-toast'
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaLocationDot,
  FaArrowRight,
  FaUserPlus,
} from "react-icons/fa6";
import { resgisterUser, userReset } from "../features/auth/authSlice";


const Signup = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {userSuccess , userError} = useSelector(state=>state.auth )
    const [formField , setFormField] = useState({name : '' , email : '' , password : '' , phone : '' , address : ''})
    const {name , email , phone , address , password} = formField
    const handleChange = (e)=>{
        setFormField({
            ...formField,
            [e.target.name] : e.target.value
        })
    }

    const handleClick = async (e) => {
    e.preventDefault();

    dispatch(
        resgisterUser({
            name,
            email,
            phone,
            address,
            password
        })
    );
};

    useEffect(() => {
    if (userSuccess) {
        toast.success("Signup Successfully");
        dispatch(userReset());
        navigate("/");
    }
}, [userSuccess, dispatch, navigate]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-8">
        <div className="mb-6">
          <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center mb-4">
            <FaUserPlus className="text-sm" />
          </div>
          <h2 className="text-2xl font-semibold text-slate-900">
            Create Account
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            Fill in your details to create your account.
          </p>
        </div>
        <form className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <FaUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
              <input
                type="text"
                value={name}
                onChange={handleChange}
                name="name"
                placeholder="Enter your full name"
                className="w-full h-10 pl-10 pr-3 text-sm rounded-lg border border-slate-200 bg-slate-50 outline-none transition focus:border-blue-500 focus:ring-3 focus:ring-blue-500/10 placeholder:text-[13px]"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
              <input
                type="email"
                value={email}
                onChange={handleChange}
                name="email"
                placeholder="you@example.com"
                className="w-full h-10 pl-10 pr-3 text-sm rounded-lg border border-slate-200 bg-slate-50 outline-none transition focus:border-blue-500 focus:ring-3 focus:ring-blue-500/10 placeholder:text-[13px]"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Phone Number
            </label>
            <div className="relative">
              <FaPhone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
              <input
                type="tel"
                name="phone"
                value={phone}
                onChange={handleChange}
                placeholder="03XX XXXXXXX"
                className="w-full h-10 pl-10 pr-3 text-sm rounded-lg border border-slate-200 bg-slate-50 outline-none transition focus:border-blue-500 focus:ring-3 focus:ring-blue-500/10 placeholder:text-[12px]"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
              <input
                type="password"
                value={password}
                onChange={handleChange}
                name="password"
                placeholder="Create a strong password"
                className="w-full h-10 pl-10 pr-3 text-sm rounded-lg border border-slate-200 bg-slate-50 outline-none transition focus:border-blue-500 focus:ring-3 focus:ring-blue-500/10 placeholder:text-[13px]"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Address
            </label>
            <div className="relative">
              <FaLocationDot className="absolute left-3.5 top-3 text-slate-400 text-sm" />
              <textarea
                name="address"
                value={address}
                onChange={handleChange}
                rows="2"
                placeholder="Enter your complete address"
                className="w-full pl-10 pr-3 py-2.5 text-sm rounded-lg border border-slate-200 bg-slate-50 outline-none resize-none transition focus:border-blue-500 focus:ring-3 focus:ring-blue-500/10 placeholder:text-[13px]"
              ></textarea>
            </div>
          </div>
          <button
            onClick={handleClick}
            className="w-full h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition duration-200 shadow-md shadow-blue-600/20"
          >
            Create Account
            <FaArrowRight className="text-xs" />
          </button>
        </form>
        <div className="relative flex items-center my-5">
          <div className="flex-1 border-t border-slate-200"></div>
          <span className="px-3 text-xs text-slate-400 bg-white">
            Already have an account?
          </span>
          <div className="flex-1 border-t border-slate-200"></div>
        </div>
        <button
          onClick={()=>navigate('/login')}
          className="w-full h-10 rounded-lg border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition"
        >
          Login to your account
        </button>
      </div>
    </div>
  );
};

export default Signup;