import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {deleteOrder, getOrder} from "../features/order/orderSlice";
import axios from 'axios'
import {
  FaBoxOpen,
  FaLocationDot,
  FaPhone,
  FaUser,
  FaPenToSquare,
  FaTrash,
  FaCreditCard,
  FaPalette,
  FaRulerCombined,
  FaLayerGroup,
} from "react-icons/fa6";
import { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../AppContext/AppContext";

const Orders = () => {
  const [ordeer , setOrdeer] = useState([])
  const { orders, orderLoading } = useSelector((state) => state.order);
  const {viewOrder , setViewOrder , socket , setSocket} = useContext(AppContext)
  useEffect(() => {
    if (!socket) return;
  socket.on("newOrder", (order) => {
    setOrdeer((prev) => [order, ...prev]);
    setViewOrder(true)
  });
  return () => {
    socket.off("newOrder");
  };
}, []);
  useEffect(() => {
    setOrdeer(orders);
  }, [orders]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrder());
  }, [dispatch]);
  const handleDelete = async(id)=>{
    try {
      await axios.delete(`http://localhost:5000/del-order/${id}`)
      dispatch(deleteOrder(id))
    } catch (error) {
      console.log(error.message)
    }
  }
  
  if (orderLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-lg font-semibold text-gray-600">
          Loading orders...
        </p>
      </div>
    );
  }
  return (
    <section className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-7">
          <div className="mb-2 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-blue-600"></span>

            <span className="text-sm font-semibold text-blue-600">
              Order Management
            </span>
          </div>
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Orders
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage customer orders and delivery information
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white px-4 py-2 shadow-sm">
              <span className="text-sm text-gray-500">
                Total Orders
              </span>
              <span className="ml-2 font-bold text-blue-600">
                {ordeer?.length || 0}
              </span>
            </div>
          </div>
        </div>
        {ordeer?.length > 0 ? (
          <div className="space-y-5">
            {ordeer.map((order, index) => {
              const product = order.productId;
              return (
                <div
                  key={order._id || index}
                  className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:shadow-md"
                >
                  <div className="flex flex-col justify-between gap-3 border-b border-gray-100 bg-gray-50 px-5 py-4 sm:flex-row sm:items-center">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                        Order #{index + 1}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-gray-800">
                        {order._id.slice(0 , 5)}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDelete(order._id)}
                        className="flex cursor-pointer items-center gap-2 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-600 transition-all hover:bg-red-100"
                      >
                        <FaTrash size={12} />
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-6 p-5 lg:grid-cols-[240px_1fr]">
                    <div>
                      <div className="h-56 w-full overflow-hidden rounded-lg bg-gray-100 sm:h-60 lg:h-52">
                        <img
                          src={product?.image}
                          alt={product?.name}
                          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                      <div className="mt-3">
                        <h2 className="truncate text-lg font-bold text-gray-900">
                          {product?.name || "Product"}
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                          Product Order
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                      <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                        <div className="mb-4 flex items-center gap-2">
                          <FaBoxOpen className="text-blue-600" />

                          <h3 className="font-semibold text-gray-800">
                            Product Details
                          </h3>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2 text-gray-500">
                              <FaRulerCombined size={13} />
                              <span className="text-sm">Size</span>
                            </div>
                            <span className="text-sm font-semibold text-gray-800">
                              {order.size}
                            </span>
                          </div>
                          <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2 text-gray-500">
                              <FaPalette size={13} />
                              <span className="text-sm">Color</span>
                            </div>
                            <span className="text-sm font-semibold text-gray-800">
                              {order.color}
                            </span>
                          </div>
                          <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2 text-gray-500">
                              <FaLayerGroup size={13} />
                              <span className="text-sm">Quantity</span>
                            </div>
                            <span className="text-sm font-semibold text-gray-800">
                              {order.quantity}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                        <div className="mb-4 flex items-center gap-2">
                          <FaUser className="text-blue-600" />
                          <h3 className="font-semibold text-gray-800">
                            Customer
                          </h3>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <p className="text-xs text-gray-400">
                              Name
                            </p>
                            <p className="mt-0.5 text-sm font-semibold text-gray-800">
                              {order.name}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <FaPhone
                              size={13}
                              className="text-gray-400"
                            />
                            <span className="text-sm text-gray-700">
                              {order.phone}
                            </span>
                          </div>
                          <div>
                            <p className="text-xs text-gray-400">
                              Label
                            </p>
                            <span className="mt-1 inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold capitalize text-blue-600">
                              {order.label}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                        <div className="mb-4 flex items-center gap-2">
                          <FaLocationDot className="text-blue-600" />
                          <h3 className="font-semibold text-gray-800">
                            Delivery
                          </h3>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <p className="text-xs text-gray-400">
                              Province
                            </p>
                            <p className="mt-0.5 text-sm font-semibold text-gray-800">
                              {order.province}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-400">
                              City
                            </p>
                            <p className="mt-0.5 text-sm font-semibold text-gray-800">
                              {order.city}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-400">
                              Address
                            </p>
                            <p className="mt-0.5 text-sm leading-5 text-gray-700">
                              {order.address}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 border-t border-gray-100 bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2">
                      <FaCreditCard className="text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-400">
                          Payment Method
                        </p>
                        <p className="text-sm font-semibold capitalize text-gray-800">
                          {order.paymentmethod}
                        </p>
                      </div>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="text-xs text-gray-400">
                        Sub Total
                      </p>
                      <p className="text-xl font-bold text-blue-600">
                        Rs. {order.subtotal}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex min-h-100 items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white">
            <div className="text-center">
              <FaBoxOpen
                size={40}
                className="mx-auto text-gray-300"
              />
              <h2 className="mt-4 text-lg font-semibold text-gray-700">
                No Orders Found
              </h2>
              <p className="mt-1 text-sm text-gray-400">
                There are no orders available right now.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Orders;