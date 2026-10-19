import React from "react";
import {
  FaTruck,
  FaHeadphones,
  FaShieldHalved,
  FaArrowsRotate,
} from "react-icons/fa6";

const Features = () => {
  const features = [
    {
      icon: <FaTruck />,
      title: "Free Shipping",
      text: "On orders over 250",
      iconColor: "text-blue-500",
    },
    {
      icon: <FaHeadphones />,
      title: "24/7 Support",
      text: "We are here to help",
      iconColor: "text-green-500",
    },
    {
      icon: <FaShieldHalved />,
      title: "Secure Payment",
      text: "100% secure payment",
      iconColor: "text-yellow-500",
    },
    {
      icon: <FaArrowsRotate />,
      title: "Money Back",
      text: "10 days return policy",
      iconColor: "text-pink-500",
    },
  ];
  return (
    <section className="w-full bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`flex items-center gap-5 px-6 py-6 ${
                index !== features.length - 1
                  ? "lg:border-r border-slate-100"
                  : ""
              }`}
            >
              <div
                className={`shrink-0 sm:text-2xl text-3xl   ${feature.iconColor}`}
              >
                {feature.icon}
              </div>
              <div>
                <h3 className=" text-[12px] md:text-sm font-bold text-slate-800">
                  {feature.title}
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  {feature.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;