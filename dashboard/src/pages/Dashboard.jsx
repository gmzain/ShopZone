import React, { useEffect } from "react";
import {
  FaBoxOpen,
  FaCartShopping,
  FaMoneyBillWave,
  FaClipboardList,
  FaChartLine,
  FaArrowTrendUp,
} from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { getOrder } from "../features/order/orderSlice";
import { getProducts } from "../features/products/productSlice";

const Dashboard = () => {

  const { orders } = useSelector((state) => state.order);
  const { products } = useSelector((state) => state.product);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrder());
    dispatch(getProducts())
  }, [dispatch]);

  const totalOrder = orders.length
  const totalPro = products.length

  const ordersValue = orders?.reduce((total , item)=>total + Number(item.subtotal || 0) , 0)

  const today = new Date()

  const todayOrderList = orders.filter(order=>{
    const orderCreated = new Date(order.createdAt)
    return (
      today.getDate() === orderCreated.getDate() &&
      today.getMonth() === orderCreated.getMonth() &&
      today.getFullYear() === orderCreated.getFullYear()
    )
  })

  const todayOrder = todayOrderList.length
  const todaySales = todayOrderList.reduce((total , order)=> total + Number(order.subtotal || 0) , 0)

  const MonthlyOrderList = orders.filter(order=>{
    const orderCreated = new Date(order.createdAt)
    return (
      today.getMonth() === orderCreated.getMonth() && 
      today.getFullYear() === orderCreated.getFullYear()
    )
  })

  const monthlySales = MonthlyOrderList.reduce((total , order)=> total + Number(order.subtotal || 0) , 0)

  const cards = [
    {
      title: "Total Products",
      value: totalPro,
      icon: FaBoxOpen,
      bg: "bg-blue-50",
      iconBg: "bg-blue-100",
      text: "text-blue-600",
    },
    {
      title: "Total Orders",
      value: totalOrder,
      icon: FaCartShopping,
      bg: "bg-purple-50",
      iconBg: "bg-purple-100",
      text: "text-purple-600",
    },
    {
      title: "Total Order Value",
      value: `Rs. ${ordersValue}`,
      icon: FaMoneyBillWave,
      bg: "bg-green-50",
      iconBg: "bg-green-100",
      text: "text-green-600",
    },
    {
      title: "Today Orders",
      value: todayOrder,
      icon: FaClipboardList,
      bg: "bg-orange-50",
      iconBg: "bg-orange-100",
      text: "text-orange-600",
    },
    {
      title: "Today Sales",
      value: `Rs. ${todaySales}`,
      icon: FaMoneyBillWave,
      bg: "bg-cyan-50",
      iconBg: "bg-cyan-100",
      text: "text-cyan-600",
    },
    {
      title: "Monthly Sales",
      value: `Rs. ${monthlySales}`,
      icon: FaChartLine,
      bg: "bg-indigo-50",
      iconBg: "bg-indigo-100",
      text: "text-indigo-600",
    },
  ];


  return (
    <div className="min-h-screen w-full bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Dashboard
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Overview of your business performance
        </p>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className={`rounded-xl border border-gray-200 ${card.bg} p-4 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-500">
                    {card.title}
                  </p>

                  <h2
                    className={`mt-2 text-xl font-bold ${card.text}`}
                  >
                    {card.value}
                  </h2>
                </div>

                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ${card.iconBg} ${card.text}`}
                >
                  <Icon className="text-lg" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Sections */}
      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="mb-4">
            <h2 className="text-base font-bold text-gray-800">
              Sales Overview
            </h2>
            <p className="mt-1 text-xs text-gray-500">
              Your current sales performance
            </p>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-lg bg-orange-50 px-4 py-3">
              <div className="flex items-center gap-2">
                <FaArrowTrendUp className="text-sm text-orange-500" />
                <span className="text-xs font-medium text-orange-600">
                  Today Order
                </span>
              </div>
              <span className="text-sm font-bold text-orange-600">
                {totalOrder}
              </span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3">
              <div className="flex items-center gap-2">
                <FaMoneyBillWave className="text-sm text-cyan-600" />

                <span className="text-xs font-medium text-gray-500">
                  Today Sales
                </span>
              </div>
              <span className="text-sm font-bold text-gray-800">
                {`Rs. ${todaySales}`}
              </span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3">
              <div className="flex items-center gap-2">
                <FaChartLine className="text-sm text-indigo-600" />

                <span className="text-xs font-medium text-gray-500">
                  Monthly Sales
                </span>
              </div>
              <span className="text-sm font-bold text-gray-800">
                {`Rs. ${monthlySales}`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;