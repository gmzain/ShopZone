import heroImage from "../assets/img.png";

const Hero = () => {
  return (
    <section className="w-full px-5 py-16 sm:px-8 lg:px-10 lg:py-12" id="about-us">
      <div className="mb-3 flex justify-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-sm font-semibold text-slate-700">
          <span className="h-2 w-2 rounded-full bg-blue-600" />
            About Us
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col items-center gap-10 lg:flex-row lg:justify-between lg:gap-10">
        {/* Left Content */}
        <div className="w-full lg:w-1/2">
          <h1 className="mb-5 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
            <span className="text-blue-700">
              Shop
            </span>{" "}
            Zone
          </h1>
          <p className="mb-5 text-sm leading-7 text-gray-700 sm:text-base">
            At our shoe store, we offer a wide range of stylish and comfortable footwear designed for every lifestyle. From everyday sneakers to trendy casual shoes, our collection combines quality materials, modern designs, and lasting comfort to give you the perfect pair.
          </p>
          <p className="mb-5 text-sm leading-7 text-gray-700 sm:text-base">
            We believe great shoes should look good and feel comfortable. That’s why we carefully select footwear that matches different styles and occasions, helping our customers find the right pair for everyday wear, special events, and an active lifestyle.
          </p>
          {/* Features */}
          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-3 font-semibold text-gray-800">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm text-white">
                ✓
              </span>
              <span>
                Premium Quality Shoes
              </span>
            </div>
            <div className="flex items-center gap-3 font-semibold text-gray-800">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm text-white">
                ✓
              </span>
              <span>
                Trendy & Modern Designs
              </span>
            </div>
            <div className="flex items-center gap-3 font-semibold text-gray-800">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm text-white">
                ✓
              </span>

              <span>
                Fast & Reliable Delivery
              </span>
            </div>

          </div>
        </div>
        {/* Right Image */}
        <div className="w-full  lg:w-1/2">
          <img
            src={heroImage}
            alt="EWX Professional Training Institute"
            className="w-full mt-5 rounded-xl object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;