import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../component/Header";
import Navbar from "../component/Navbar";
import {useNavigate} from 'react-router-dom'
import { getCart } from "../features/cart/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { cart, cartLoading, cartError, cartMessage } = useSelector(
    (state) => state.cart
  );

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  if (cartLoading) {
    return (
      <>
        <Header />
        <Navbar />
        <div className="w-full flex justify-center items-center py-20">
          <p className="text-slate-500 font-semibold">
            Loading cart...
          </p>
        </div>
      </>
    );
  }
  if (cartError) {
    return (
      <>
        <Header />
        <Navbar />

        <div className="w-full flex justify-center items-center py-20">
          <p className="font-semibold">
            {cartMessage || "Your Cart is Empty"}
          </p>
        </div>
      </>
    );
  }
  return (
    <>
      <Header />
      <Navbar />

      <section className="w-full px-3 sm:px-5 lg:px-8 py-5">
        <div className="mx-auto max-w-7xl">

          {/* Heading */}
          <div className="mb-4">
            <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
              My Cart
            </h2>

            <p className="mt-0.5 text-[10px] text-slate-500 sm:text-xs md:text-[13.5px]">
              Products added to your cart
            </p>
          </div>
          {/* Empty Cart */}
          {!cart || !cart.items || cart.length === 0 || cart.items.length === 0 ? (
            <div className="w-full border border-gray-200 rounded-md py-16 flex justify-center items-center shadow shadow-gray-100">
              <p className="text-slate-500 font-semibold">
                Your cart is empty
              </p>
            </div>
          ) : (
            /* Products */
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-5 lg:grid-cols-6">
            {cart.items.map((item, index) => {
              const product = item.productId;
              return (
                <div
                  key={product?._id || index}
                  className="flex h-auto w-full flex-col rounded-md border border-gray-200 shadow shadow-gray-200 transition-all duration-200 hover:-translate-y-0.5"
                >
                  <div className="relative h-30 w-full overflow-hidden rounded-t-md  lg:h-35">
                    <img
                      src={product?.image}
                      alt={product?.name}
                      className="h-full w-full object-cover transition-all duration-300 hover:scale-105"
                    />
                    {product?.discount > 0 && (
                      <div className="absolute left-2 top-2 rounded-full bg-red-500 px-2 py-1 text-[10px] font-bold text-white shadow-sm">
                        -{product.discount}%
                      </div>
                    )}
                    <div className="absolute right-2 top-2 max-w-20 truncate rounded-full bg-white/90 px-2 py-1 text-[10px] font-semibold capitalize text-gray-700 shadow-sm backdrop-blur">
                      {product?.category}
                    </div>
                  </div>
                  <div className="flex flex-col gap-0.5 px-3 py-2">
                    <h1 className="truncate font-semibold">
                      {product?.name}
                    </h1>
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-blue-600">
                        Rs. {product?.price}
                      </p>
                      {product?.discount > 0 && (
                      <span className="text-sm text-gray-400 line-through">
                        Rs.{" "}
                        {Math.round(
                          product.price /
                            (1 - product.discount / 100)
                        )}
                      </span>
                      )}
                    </div>
                    <button
                      onClick={() =>
                        navigate(`/product-detail/${product?._id}`)
                      }
                      className="my-1 cursor-pointer rounded-md border-[1.5px] border-blue-500 bg-blue-50 text-sm font-semibold text-blue-600 transition-all duration-200 hover:bg-blue-100"
                    >
                      View Detail
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Cart;

