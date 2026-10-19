import React from "react";
import menImage from "../assets/men.png";
import womenImage from "../assets/women.png";
import kidsImage from "../assets/kids.png";
import {useDispatch , useSelector} from 'react-redux'
import { useEffect } from "react";
import { useState } from "react";
import { getByCategory } from "../features/products/productSlice";
import {useNavigate} from 'react-router-dom'

const Categories = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [selectedCategory , setSelectedCategory] = useState('')
  const categories = [
    {
      title: "Men",
      image: menImage,
    },
    {
      title: "Female",
      image: womenImage,
    },
    {
      title: "Kids",
      image: kidsImage,
    },
  ];

  useEffect(() => {
  if (selectedCategory) {
    dispatch(getByCategory(selectedCategory));
  }
  }, [dispatch, selectedCategory]);

  return (
    <section className="w-full px-3 py-6 sm:px-5 sm:py-7 lg:px-8" id="categories">
      <div className="mx-auto max-w-7xl">
        <div className="mb-4">
          <h2 className="text-lg font-bold text-slate-900 sm:text-xl md:text-xl">
            Shop By Categories
          </h2>
          <p className="mt-0.5 text-[10px] text-slate-500 sm:text-xs md:text-[13.5px]">
            Explore our latest collections
          </p>
        </div>
        {/* Categories */}
        <div className="w-full sm:w-130 h-28 flex gap-2 sm:gap-5 justify-center">
          {categories.map((item, index) => {
            return (
              <div
                key={index}
                onClick={()=>{
                    setSelectedCategory(item.title)
                    navigate(`/category/${item.title}`)
                }}
                className="flex justify-center items-center flex-col w-full h-full bg-gray-100 rounded-md border border-gray-200 cursor-pointer transition-all duration-200 hover:-translate-y-0.5">
                <img src={item.image} alt="" className="h-20" />
                <h1 className="bg-white w-full py-1 text-center text-sm font-semibold rounded-b-md">
                  {item.title}
                </h1>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories;