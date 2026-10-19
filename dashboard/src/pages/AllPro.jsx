import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaPen, FaTrash } from "react-icons/fa";
import { getProducts, removeProduct } from "../features/products/productSlice";
import axios from 'axios'
import { AppContext } from "../AppContext/AppContext";

const AllPro = () => {
  const dispatch = useDispatch();
  const { products, productLoading } = useSelector((state) => state.product);
  const [pro , setPro] = useState([])
  const {socket} = useContext(AppContext)

  useEffect(()=>{
    setPro(products)
  }, [products])

  useEffect(()=>{
    if (!socket) return;
    socket.on('newProduct' , (data)=>{
      setPro((prev)=>[data , ...prev])
    })
    return ()=>{
      socket.off('newProduct')
    }
  } , [socket])

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handleDelete = async(id)=>{
    try {
      let response = axios.delete(`http://localhost:5000/del-product/${id}`)
      dispatch(removeProduct(id));
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <section className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              All Products
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage your products, prices, sizes and colors
            </p>
          </div>
          <div className="w-fit rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
            {pro?.length || 0} Products
          </div>
        </div>
        {productLoading ? (
          <div className="flex min-h-60 items-center justify-center">
            <div className="text-center">
              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"></div>

              <p className="mt-3 text-sm text-gray-500">
                Loading products...
              </p>
            </div>
          </div>
        ) : pro?.length === 0 ? (
          <div className="flex min-h-60 items-center justify-center rounded-xl border border-gray-200 bg-white">
            <div className="text-center">
              <h2 className="text-lg font-semibold text-gray-800">
                No Products Found
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Add a product to see it here.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {pro?.map((product) => (
              <div
                key={product._id}
                className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative h-60 overflow-hidden bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  {product.discount > 0 && (
                    <div className="absolute left-3 top-3 rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white shadow-sm">
                      {product.discount}% OFF
                    </div>
                  )}
                  <div className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium capitalize text-gray-700 shadow-sm backdrop-blur">
                    {product.category}
                  </div>
                </div>
                <div className="p-4">
                  <h2 className="truncate text-lg font-semibold text-gray-900">
                    {product.name}
                  </h2>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-xl font-bold text-blue-600">
                      Rs. {product.price}
                    </span>
                    {product.discount > 0 && (
                      <span className="text-sm text-gray-400 line-through">
                        Rs.{" "}
                        {Math.round(
                          product.price /
                            (1 - product.discount / 100)
                        )}
                      </span>
                    )}
                  </div>
                  <div className="mt-4">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Colors
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {product.color?.map((item, index) => (
                        <span
                          key={index}
                          className="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-700"
                        >
                          {item.shoesColor}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Sizes
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {product.size?.map((item, index) => (
                        <span
                          key={index}
                          className="rounded-md border border-gray-200 bg-white px-2.5 py-1 text-xs font-semibold text-gray-700"
                        >
                          {item.sizeNo}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="my-4 border-t border-gray-100"></div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      className="flex h-10 cursor-pointer items-center justify-center gap-2 rounded-lg border border-blue-200 bg-blue-50 text-sm font-semibold text-blue-600 transition hover:bg-blue-100"
                    >
                      <FaPen className="text-xs" />
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(product._id)
                      }
                      className="flex h-10 cursor-pointer items-center justify-center gap-2 rounded-lg border border-red-200 bg-red-50 text-sm font-semibold text-red-600 transition hover:bg-red-100"
                    >
                      <FaTrash className="text-xs" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AllPro;
