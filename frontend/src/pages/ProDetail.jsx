import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { productDetail, productReset } from "../features/products/productSlice";
import Header from "../component/Header";
import Navbar from "../component/Navbar";
import { useContext } from "react";
import { AppContext } from "../AppContext/AppContext";
import toast from "react-hot-toast";
import { addToCart } from "../features/cart/cartSlice";
import { useForm } from "react-hook-form";

const ProDetail = () => {
const navigate = useNavigate();
const dispatch = useDispatch();
const { cartSuccess } = useSelector((state) => state.cart);
const { product } = useSelector((state) => state.product);
const { user } = useSelector((state) => state.auth);
const {
color,
setColor,
size,
setSize,
setQuantity,
setProductId,
productId,
} = useContext(AppContext);
const [count, setCount] = useState(1);
const {
register,
handleSubmit,
formState: { errors },
} = useForm();
const { id } = useParams();
console.log(product);
useEffect(() => {
setProductId(id);
}, [id, setProductId]);
useEffect(() => {
setQuantity(count);
}, [count, setQuantity]);
const onSubmit = (data) => {
const user = JSON.parse(localStorage.getItem('user'))
if (!user) {
navigate("/login");
return;
}
setColor(data.color);
setSize(data.size);
setQuantity(count);
navigate(`/order/${id}`);
};
const handleAddToCart = (e) => {
e.preventDefault();
const user = JSON.parse(localStorage.getItem('user'))
if (!user) {
  navigate("/login");
  return;
}
dispatch(addToCart(productId));
navigate('/cart')
};

useEffect(() => {
if (cartSuccess) {
toast.success("Add to Cart Successfully");
}
}, [cartSuccess]);

useEffect(() => {
dispatch(productDetail(id));
return () => {
  dispatch(productReset());
};
}, [dispatch, id]);

return (
<> 
<Header /> 
<Navbar />
  <section className="w-full bg-white px-3 py-5 sm:px-4 sm:py-6 lg:px-6">
    <div className="mx-auto max-w-6xl">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          <div className="flex items-start justify-center">
            <div className="w-full max-w-140 overflow-hidden rounded-md">
              <img
                src={product?.image || ""}
                alt={product?.name || "Product"}
                className="h-105 w-full object-cover sm:h-130 lg:h-80"
              />
            </div>
          </div>
          <div className="flex flex-col col-span-2">
            <h1 className="text-xl font-medium leading-tight text-gray-900 sm:text-2xl">
              {product?.name || "Product Name"}
            </h1>
            <p className="mt-2 text-xs leading-5 text-gray-500 sm:text-sm">
              {product?.description ||
                "Product description will appear here. This is a comfortable and high quality product designed for everyday use."}
            </p>
            <div className="mt-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-medium text-blue-600 sm:text-3xl">
                  Rs. {product?.price || "0"}
                </span>
                {product?.discount > 0 && (
                  <span className="text-sm font-medium text-gray-600">
                    -{product.discount}%
                  </span>
                )}
              </div>
            </div>
            <div className="my-5 border-t border-gray-200"></div>
            <div className="mb-4">
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Color
              </label>
              <select
                {...register("color", {
                  required: "Please select a color",
                })}
                value={color}
                onChange={(e) => {
                  setColor(e.target.value);
                }}
                className={`w-full max-w-md rounded-md border bg-white px-3 py-2.5 text-xs text-gray-700 outline-none ${
                  errors.color
                    ? "border-red-500"
                    : "border-gray-300 focus:border-blue-500"
                }`}
              >
                <option value="" disabled>
                  Select Color
                </option>
                {product?.color?.map((item, index) => (
                  <option key={index} value={item.shoesColor}>
                    {item.shoesColor}
                  </option>
                ))}
                {!product?.color?.length && (
                  <>
                    <option value="Black">Black</option>
                    <option value="White">White</option>
                    <option value="Brown">Brown</option>
                  </>
                )}
              </select>
              {errors.color && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.color.message}
                </p>
              )}
            </div>
            <div className="mb-5">
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Size
              </label>
              <select
                {...register("size", {
                  required: "Please select a size",
                })}
                value={size}
                onChange={(e) => {
                  setSize(e.target.value);
                }}
                className={`w-full max-w-md rounded-md border bg-white px-3 py-2.5 text-xs text-gray-700 outline-none ${
                  errors.size
                    ? "border-red-500"
                    : "border-gray-300 focus:border-blue-500"
                }`}
              >
                <option value="" disabled>
                  Select Size
                </option>
                {product?.size?.map((item, index) => (
                  <option key={index} value={item.sizeNo}>
                    {item.sizeNo}
                  </option>
                ))}
                {!product?.size?.length && (
                  <>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                  </>
                )}
              </select>
              {errors.size && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.size.message}
                </p>
              )}
            </div>
            <div className="mb-5">
              <p className="mb-1.5 text-sm font-medium text-gray-700">
                Quantity
              </p>
              <div className="flex h-10 w-fit items-center">
                <button
                  type="button"
                  onClick={() =>
                    setCount((prev) => Math.max(1, prev - 1))
                  }
                  className="cursor-pointer flex h-10 w-10 items-center justify-center bg-gray-100 text-lg text-gray-500"
                >
                  −
                </button>
                <div className="flex h-10 w-12 items-center justify-center border-y border-gray-200 bg-white text-sm">
                  {count}
                </div>
                <button
                  type="button"
                  onClick={() => setCount((prev) => prev + 1)}
                  className="cursor-pointer flex h-10 w-10 items-center justify-center bg-gray-100 text-lg text-gray-500"
                >
                  +
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              <button
                type="submit"
                className="cursor-pointer h-11 rounded-md bg-blue-600 text-sm font-medium text-white transition hover:bg-blue-700"
              >
                Buy Now
              </button>
              <button
                type="button"
                onClick={handleAddToCart}
                className="cursor-pointer h-11 rounded-md bg-blue-50 text-blue-600 text-sm border-2 border-blue-500 font-semibold transition hover:bg-blue-100"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </section>
</>
);
};

export default ProDetail;
