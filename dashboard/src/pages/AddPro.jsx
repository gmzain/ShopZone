import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  FaCloudArrowUp,
  FaImage,
  FaTag,
  FaMoneyBillWave,
  FaRuler,
  FaPalette,
  FaShoePrints,
  FaPlus,
  FaTrash,
} from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {addProduct, productReset,} from "../features/products/productSlice";

const AddPro = () => {
  const dispatch = useDispatch();
  const { productSuccess, productLoading } = useSelector(
    (state) => state.product
  );
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const [image, setImage] = useState(null);
  const [cloudImage, setCloudImage] = useState(null);
  const [size, setSize] = useState("");
  const [sizes, setSizes] = useState([]);
  const [color, setColor] = useState("");
  const [colors, setColors] = useState([]);

  const watchedPrice = watch("price") || 0;
  const watchedDiscount = watch("discount") || 0;
  const finalPrice =
    Number(watchedPrice) -
    (Number(watchedPrice) * Number(watchedDiscount)) / 100;
  useEffect(() => {
    if (productSuccess) {
      toast.success("Product added successfully!");
      reset();
      setImage(null);
      setCloudImage(null);
      setSize("");
      setSizes([]);
      setColor("");
      setColors([]);
      dispatch(productReset());
    }
  }, [productSuccess, dispatch, reset]);
  const handleSize = () => {
    if (!size.trim()) {
      toast.error("Please enter a size");
      return;
    }
    const alreadyExists = sizes.some(
      (item) => item.sizeNo.toLowerCase() === size.trim().toLowerCase()
    );
    if (alreadyExists) {
      toast.error("This size already exists");
      return;
    }
    setSizes([...sizes, { sizeNo: size.trim() }]);
    setSize("");
  };
  const removeSize = (index) => {
    setSizes(sizes.filter((_, i) => i !== index));
  };
  const handleColor = () => {
    if (!color.trim()) {
      toast.error("Please enter a color");
      return;
    }
    const alreadyExists = colors.some(
      (item) =>
        item.shoesColor.toLowerCase() === color.trim().toLowerCase()
    );
    if (alreadyExists) {
      toast.error("This color already exists");
      return;
    }
    setColors([...colors, { shoesColor: color.trim() }]);
    setColor("");
  };
  const removeColor = (index) => {
    setColors(colors.filter((_, i) => i !== index));
  };
  const handleImage = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const fileUrl = URL.createObjectURL(file);
    setImage(fileUrl);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "insta26");
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/g6c0gemp/image/upload",
        formData
      );
      setCloudImage(response.data.url);
      toast.success("Image uploaded successfully!");
    } catch (error) {
      console.log(error.message);
      toast.error("Image upload failed");
      setImage(null);
      setCloudImage(null);
    }
  };
  const handleClick = (data) => {
    if (!cloudImage) {
      toast.error("Please upload a product image");
      return;
    }
    if (sizes.length === 0) {
      toast.error("Please add at least one size");
      return;
    }
    if (colors.length === 0) {
      toast.error("Please add at least one color");
      return;
    }
    dispatch(
      addProduct({
        name: data.name,
        description: data.description,
        category: data.category,
        shoestype: data.shoestype,
        material: data.material,
        soleMaterial: data.soleMaterial,
        closureType: data.closureType,
        discount: Number(data.discount),
        price: Number(data.price),
        size: sizes,
        color: colors,
        image: cloudImage,
      })
    );
  };
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Add Product
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Add a new product to your store
          </p>
        </div>
        <form
          onSubmit={handleSubmit(handleClick)}
          className="rounded-xl bg-white p-5 shadow-sm md:p-7"
        >
          <div className="mb-7">
            <div className="mb-3 flex items-center gap-2">
              <FaImage className="text-blue-600" />
              <h2 className="font-semibold text-gray-800">
                Product Image
              </h2>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <label
                htmlFor="productImage"
                className="flex h-44 w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 transition hover:border-blue-500 sm:w-64"
              >
                {image ? (
                  <img
                    src={image}
                    alt="Product preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center text-gray-400">
                    <FaCloudArrowUp className="mb-2 text-3xl" />
                    <span className="text-sm font-medium">
                      Upload Image
                    </span>
                    <span className="mt-1 text-xs">
                      Click to browse
                    </span>
                  </div>
                )}
              </label>
              <input
                id="productImage"
                type="file"
                accept="image/*"
                onChange={handleImage}
                className="hidden"
              />
              <div>
                {cloudImage ? (
                  <p className="text-sm font-medium text-green-600">
                    Image uploaded successfully
                  </p>
                ) : (
                  <p className="text-sm text-gray-500">
                    Upload a clear product image.
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="mb-7">
            <div className="mb-4 flex items-center gap-2">
              <FaTag className="text-blue-600" />
              <h2 className="font-semibold text-gray-800">
                Product Information
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Product Name
                </label>
                <input
                  type="text"
                  placeholder="Enter product name"
                  {...register("name", {
                    required: "Product name is required",
                    minLength: {
                      value: 3,
                      message:
                        "Product name must be at least 3 characters",
                    },
                  })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500"
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  {...register("category", {
                    required: "Please select a category",
                  })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500"
                >
                  <option value="">Select Category</option>
                  <option value="Men">Men</option>
                  <option value="Female">Female</option>
                  <option value="Kids">Kids</option>
                </select>
                {errors.category && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.category.message}
                  </p>
                )}
              </div>
              <div className="md:col-span-2">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  rows="4"
                  placeholder="Enter product description"
                  {...register("description", {
                    required: "Description is required",
                    minLength: {
                      value: 10,
                      message:
                        "Description must be at least 10 characters",
                    },
                  })}
                  className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500"
                />
                {errors.description && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.description.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="mb-7">
            <div className="mb-4 flex items-center gap-2">
              <FaMoneyBillWave className="text-blue-600" />
              <h2 className="font-semibold text-gray-800">
                Pricing
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Price
                </label>
                <input
                  type="number"
                  min="1"
                  placeholder="Enter price"
                  {...register("price", {
                    required: "Price is required",
                    min: {
                      value: 1,
                      message: "Price must be greater than 0",
                    },
                  })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500"
                />
                {errors.price && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.price.message}
                  </p>
                )}
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Discount (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  placeholder="Enter discount"
                  {...register("discount", {
                    required: "Discount is required",
                    min: {
                      value: 0,
                      message: "Discount cannot be negative",
                    },
                    max: {
                      value: 100,
                      message: "Discount cannot exceed 100%",
                    },
                  })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500"
                />
                {errors.discount && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.discount.message}
                  </p>
                )}
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Final Price
                </label>
                <div className="flex h-10.5 items-center rounded-lg border border-gray-200 bg-gray-50 px-3 font-semibold text-blue-600">
                  Rs. {Number(finalPrice).toFixed(0)}
                </div>
              </div>
            </div>
          </div>
          <div className="mb-7">
            <div className="mb-4 flex items-center gap-2">
              <FaRuler className="text-blue-600" />
              <h2 className="font-semibold text-gray-800">
                Sizes
              </h2>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="text"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                placeholder="Enter size e.g. 40"
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 sm:w-72"
              />
              <button
                type="button"
                onClick={handleSize}
                className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                <FaPlus />
                Add Size
              </button>
            </div>
            {sizes.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {sizes.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-600"
                  >
                    {item.sizeNo}
                    <button
                      type="button"
                      onClick={() => removeSize(index)}
                      className="cursor-pointer text-red-500 hover:text-red-700"
                    >
                      <FaTrash className="text-xs" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="mb-7">
            <div className="mb-4 flex items-center gap-2">
              <FaPalette className="text-blue-600" />
              <h2 className="font-semibold text-gray-800">
                Colors
              </h2>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                placeholder="Enter color e.g. Black"
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 sm:w-72"
              />
              <button
                type="button"
                onClick={handleColor}
                className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                <FaPlus />
                Add Color
              </button>
            </div>
            {colors.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {colors.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-600"
                  >
                    {item.shoesColor}
                    <button
                      type="button"
                      onClick={() => removeColor(index)}
                      className="cursor-pointer text-red-500 hover:text-red-700"
                    >
                      <FaTrash className="text-xs" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="mb-7">
            <div className="mb-4 flex items-center gap-2">
              <FaShoePrints className="text-blue-600" />
              <h2 className="font-semibold text-gray-800">
                Shoe Details
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Shoe Type
                </label>
                <input
                  type="text"
                  placeholder="e.g. Sneakers"
                  {...register("shoestype", {
                    required: "Shoe type is required",
                  })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500"
                />
                {errors.shoestype && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.shoestype.message}
                  </p>
                )}
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Material
                </label>
                <input
                  type="text"
                  placeholder="e.g. Leather"
                  {...register("material", {
                    required: "Material is required",
                  })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500"
                />
                {errors.material && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.material.message}
                  </p>
                )}
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Sole Material
                </label>
                <input
                  type="text"
                  placeholder="e.g. Rubber"
                  {...register("soleMaterial", {
                    required: "Sole material is required",
                  })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500"
                />
                {errors.soleMaterial && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.soleMaterial.message}
                  </p>
                )}
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Closure Type
                </label>
                <input
                  type="text"
                  placeholder="e.g. Lace-Up"
                  {...register("closureType", {
                    required: "Closure type is required",
                  })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500"
                />
                {errors.closureType && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.closureType.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-end border-t border-gray-200 pt-5">
            <button
              type="submit"
              disabled={productLoading}
              className="flex cursor-pointer items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <FaPlus />
              {productLoading ? "Adding Product..." : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddPro;

