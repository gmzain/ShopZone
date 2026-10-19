import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaArrowRight,
  FaRightToBracket,
} from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { loginUser, userReset } from "../features/auth/authSlice";

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [fromField , setFormField] = useState({email : '' , password : ''})
    const {email , password} = fromField
    const handleChange = (e)=>{
        setFormField({
            ...fromField,
            [e.target.name] : e.target.value
        })
    }

    const handleClick = async(e)=>{
        e.preventDefault()
        dispatch(loginUser({
            email , password
        }))
    }
    useEffect(()=>{
        dispatch(userReset())
    } ,[dispatch])
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-8">
        <div className="mb-6">
          <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center mb-4">
            <FaRightToBracket className="text-sm" />
          </div>
          <h2 className="text-2xl font-semibold text-slate-900">
            Welcome Back
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            Login to your account to continue.
          </p>
        </div>
        <form className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full h-10 pl-10 pr-3 text-sm rounded-lg border border-slate-200 bg-slate-50 outline-none transition focus:border-blue-500 focus:ring-3 focus:ring-blue-500/10"
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
                name="password"
                value={password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full h-10 pl-10 pr-3 text-sm rounded-lg border border-slate-200 bg-slate-50 outline-none transition focus:border-blue-500 focus:ring-3 focus:ring-blue-500/10"
              />
            </div>
          </div>
          <button
            onClick={handleClick}
            className="w-full h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition duration-200 shadow-md shadow-blue-600/20"
          >
            Login
            <FaArrowRight className="text-xs" />
          </button>
        </form>
        <div className="relative flex items-center my-5">
          <div className="flex-1 border-t border-slate-200"></div>
          <span className="px-3 text-xs text-slate-400 bg-white">
            Don't have an account?
          </span>
          <div className="flex-1 border-t border-slate-200"></div>
        </div>
        <button
          onClick={()=>navigate('/signup')}
          className="w-full h-10 rounded-lg border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition"
        >
          Create New Account
        </button>
      </div>
    </div>
  );
};

export default Login;