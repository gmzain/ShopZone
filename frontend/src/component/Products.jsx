import React from "react";
import {useDispatch , useSelector} from 'react-redux'
import { useEffect } from "react";
import { useState } from "react";
import {useNavigate} from 'react-router-dom'
import { getProducts, productReset } from "../features/products/productSlice";
import { useContext } from "react";
import { AppContext } from "../AppContext/AppContext";

const Products = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {products} = useSelector(state=>state.product)
    const [pro , setPro] = useState([])
    const {socket , setSocket} = useContext(AppContext)

    useEffect(()=>{
        dispatch(getProducts())
        return () => {
            dispatch(productReset());
          };
    },[dispatch])

    useEffect(()=>{
      setPro(products)
    } , [products])

    useEffect(()=>{
      if(!socket){
        return
      }
      socket.on('newProduct' , (data)=>{
        setPro((prev)=> [data , ...prev])
      })

      socket.on('del-pro' , (data)=>{
        setPro((prev)=> prev.filter(item=> item._id != data._id))
      })

      return ()=>{
        socket.off('newProduct')
        socket.off('del-pro')
      }
    } , [socket])


  return (
    <section className="w-full px-3  sm:px-5  lg:px-8" id="shop">
      <div className="mx-auto max-w-7xl">
        <div className="mb-4">
          <h2 className="text-lg font-bold text-slate-900 sm:text-xl md:text-xl">
            Best Selling Products
          </h2>
          <p className="mt-0.5 text-[10px] text-slate-500 sm:text-xs md:text-[13.5px]">
            Explore our latest collections
          </p>
        </div>
        {/* Products */}

        {
          pro.length == 0 ? (
            <>
              <div className="w-full border border-gray-200 rounded-md py-16 flex justify-center items-center shadow shadow-gray-100">
              <p className="text-slate-500 font-semibold">
                No Products Available
              </p>
            </div>
            </>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-5 lg:grid-cols-6">
          {pro?.map((item, index) => (
            <div
              key={item._id || index}
              className="flex h-auto w-full flex-col rounded-md border border-gray-200 shadow shadow-gray-200 transition-all duration-200 hover:-translate-y-0.5"
            >
              <div className="relative h-30 w-full overflow-hidden rounded-t-md lg:h-35">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover transition-all duration-300 hover:scale-105"
                />
                {item.discount > 0 && (
                  <div className="absolute left-2 top-2 rounded-full bg-red-500 px-2 py-1 text-[10px] font-bold text-white shadow-sm">
                    -{item.discount}%
                  </div>
                )}
                <div className="absolute right-2 top-2 max-w-20 truncate rounded-full bg-white/90 px-2 py-1 text-[10px] font-semibold capitalize text-gray-700 shadow-sm backdrop-blur">
                  {item.category}
                </div>
              </div>
              <div className="flex flex-col gap-0.5 px-3 py-2">
                <h1 className="truncate font-semibold overflow-hidden">
                  {item.name}
                </h1>
                <div className="flex items-center gap-2">
                  <p className="font-bold text-blue-600">
                    Rs. {item.price}
                  </p>
                  {item.discount > 0 && (
                      <span className="text-sm text-gray-400 line-through">
                        Rs.{" "}
                        {Math.round(
                          item.price /
                            (1 - item.discount / 100)
                        )}
                      </span>
                    )}
                </div>
                <button
                  onClick={() => {
                    navigate(`/product-detail/${item._id}`);
                  }}
                  className="my-1 cursor-pointer rounded-md border-[1.5px] border-blue-500 bg-blue-50 text-sm font-semibold text-blue-600 transition-all duration-200 hover:bg-blue-100"
                >
                  Detail
                </button>
              </div>
            </div>
          ))}
        </div>
            </>
          )
        }
      </div>
    </section>
  );
};

export default Products;