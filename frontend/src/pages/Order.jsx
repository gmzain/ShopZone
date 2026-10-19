import React, { useContext, useEffect } from "react";
import Header from "../component/Header";
import Navbar from "../component/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { AppContext } from "../AppContext/AppContext";
import { userOrder } from "../features/orders/orderSlice";
import {productDetail,productReset} from "../features/products/productSlice";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const Order = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { product } = useSelector((state) => state.product);
  const { orderSuccess } = useSelector((state) => state.order);
  const { color, size, quantity } = useContext(AppContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  useEffect(() => {
    if (id) {
      dispatch(productDetail(id));
    }
    return () => {
      dispatch(productReset());
    };
  }, [dispatch, id]);
  const delivery = 150;
  const total = quantity * (product?.price || 0) + delivery;
  const onSubmit = async (data) => {
    if (!product) {
      toast.error("Product not found");
      return;
    }
    dispatch(
      userOrder({
        id: id,
        orderData: {
          size,
          productId: id,
          color,
          quantity,
          name: data.name,
          province: data.province,
          phone: data.phone,
          city: data.city,
          address: data.address,
          label: data.label,
          paymentmethod: data.paymentmethod,
        },
      })
    );
    reset();
  };
  useEffect(() => {
    if (orderSuccess) {
      toast.success("Order Submitted Successfully!");
      navigate("/");
    }
  }, [orderSuccess, navigate]);
  if (!product) {
    return (
      <>
        <Header />
        <Navbar />
        <section className="flex min-h-[60vh] items-center justify-center bg-gray-50 px-4">
          <div className="text-center">
            <p className="text-lg font-medium text-gray-700">
              Loading product...
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Please wait a moment
            </p>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <Header />
      <Navbar />
      <section className="w-full bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-start"
          >
            <div>
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">
                  Delivery Information
                </h2>
                <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                  Enter your details to complete your order
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      {...register("name", {
                        required: "Full name is required",

                        minLength: {
                          value: 3,
                          message:
                            "Name must be at least 3 characters",
                        },

                        pattern: {
                          value: /^[A-Za-z\s]+$/,
                          message:
                            "Name can only contain letters",
                        },
                      })}
                      className={`h-10 w-full rounded-md border bg-white px-3 text-sm text-gray-800 outline-none transition ${
                        errors.name
                          ? "border-red-500 focus:ring-2 focus:ring-red-100"
                          : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      }`}
                    />

                    {errors.name && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      placeholder="03XXXXXXXXX"
                      {...register("phone", {
                        required:
                          "Phone number is required",
                        pattern: {
                          value: /^03[0-9]{9}$/,
                          message:
                            "Enter a valid Pakistani phone number",
                        },
                      })}
                      className={`h-10 w-full rounded-md border bg-white px-3 text-sm text-gray-800 outline-none transition ${
                        errors.phone
                          ? "border-red-500 focus:ring-2 focus:ring-red-100"
                          : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      }`}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      Province
                    </label>
                    <input
                      type="text"
                      placeholder="Enter province"
                      {...register("province", {
                        required: "Province is required",
                      })}
                      className={`h-10 w-full rounded-md border bg-white px-3 text-sm text-gray-800 outline-none transition ${
                        errors.province
                          ? "border-red-500 focus:ring-2 focus:ring-red-100"
                          : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      }`}
                    />
                    {errors.province && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.province.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      City
                    </label>
                    <input
                      type="text"
                      placeholder="Enter city"
                      {...register("city", {
                        required: "City is required",
                      })}
                      className={`h-10 w-full rounded-md border bg-white px-3 text-sm text-gray-800 outline-none transition ${
                        errors.city
                          ? "border-red-500 focus:ring-2 focus:ring-red-100"
                          : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      }`}
                    />
                    {errors.city && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.city.message}
                      </p>
                    )}
                  </div>
                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      Complete Address
                    </label>
                    <textarea
                      rows="3"
                      placeholder="House no, street, area..."
                      {...register("address", {
                        required:
                          "Complete address is required",

                        minLength: {
                          value: 10,
                          message:
                            "Address must be at least 10 characters",
                        },
                      })}
                      className={`w-full resize-none rounded-md border bg-white px-3 py-2.5 text-sm text-gray-800 outline-none transition ${
                        errors.address
                          ? "border-red-500 focus:ring-2 focus:ring-red-100"
                          : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      }`}
                    />
                    {errors.address && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.address.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      Address Label
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Home, Office"
                      {...register("label", {
                        required:
                          "Address label is required",
                      })}
                      className={`h-10 w-full rounded-md border bg-white px-3 text-sm text-gray-800 outline-none transition ${
                        errors.label
                          ? "border-red-500 focus:ring-2 focus:ring-red-100"
                          : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      }`}
                    />
                    {errors.label && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.label.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      Payment Method
                    </label>
                    <select
                      defaultValue=""
                      {...register("paymentmethod", {
                        required:
                          "Please select a payment method",
                      })}
                      className={`h-10 w-full rounded-md border bg-white px-3 text-sm text-gray-700 outline-none transition ${
                        errors.paymentmethod
                          ? "border-red-500 focus:ring-2 focus:ring-red-100"
                          : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      }`}
                    >
                      <option value="" disabled>
                        Select payment method
                      </option>
                      <option value="cod">
                        Cash on Delivery
                      </option>
                      <option value="jazzcash">
                        JazzCash
                      </option>
                      <option value="easypaisa">
                        EasyPaisa
                      </option>
                      <option value="bank">
                        Bank Transfer
                      </option>
                    </select>
                    {errors.paymentmethod && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.paymentmethod.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 lg:mt-0 lg:pt-18">
              <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm sm:p-3">
                <h2 className="text-xl font-medium text-gray-900 sm:text-2xl">
                  Order Summary
                </h2>
                <div className="mt-6 flex items-center gap-4">
                  <img
                    src={product?.image || ""}
                    alt={product?.name || "Product"}
                    className="h-20 w-20 rounded-md object-cover"
                  />
                  <div>
                    <h3 className="font-medium text-gray-800">
                      {product?.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Size: {size}
                    </p>
                    <p className="text-sm text-gray-500">
                      Color: {color}
                    </p>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-base text-gray-500">
                    Items Total ({quantity} items)
                  </span>
                  <span className="text-base font-medium text-gray-900 sm:text-lg">
                    Rs. {quantity * product.price}
                  </span>
                </div>
                <div className="mt-2.5 flex items-center justify-between">
                  <span className="text-base text-gray-500">
                    Delivery Fee
                  </span>
                  <span className="text-base font-medium text-gray-900 sm:text-lg">
                    Rs. {delivery}
                  </span>
                </div>
                <div className="my-4 border-t border-gray-200"></div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-medium text-gray-900 sm:text-xl">
                    Total:
                  </span>
                  <span className="text-2xl font-medium text-blue-600 sm:text-3xl">
                    Rs. {total}
                  </span>
                </div>
                <p className="mt-2 text-right text-xs text-gray-500 sm:text-sm">
                  VAT included, where applicable
                </p>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-6 h-12 w-full cursor-pointer rounded-md bg-blue-600 text-base font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 sm:text-lg"
                >
                  {isSubmitting
                    ? "Submitting..."
                    : "Confirm Order"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};
export default Order;