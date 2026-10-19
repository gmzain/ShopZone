import {
  FaPhoneAlt,
  FaWhatsapp,
  FaEnvelope,
} from "react-icons/fa";

import { useForm } from "react-hook-form";

const ContactSection = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  // Form submit to WhatsApp
  const onSubmit = async (data) => {
    const phoneNumber = "923155722267";

    const message = `
Hello, I want to know more about your shoes.

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Message: ${data.message || "No message"}
    `;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank");

    reset();
  };
  const handleWhatsApp = () => {
    const phoneNumber = "923338885779";

    const message = "Hello, I want to know more about your shoes.";

    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <section
      className="w-full px-5  sm:px-8 lg:px-10"
      id="contact-us"
    >
      {/* Heading */}
      <div className="mb-8 flex justify-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-sm font-semibold text-slate-700">
          <span className="h-2 w-2 rounded-full bg-blue-600" />
          Contact Us
        </div>
      </div>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-2">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 sm:text-3xl">
            Send Us a Message
          </h2>
          <p className="mt-2 text-sm text-gray-600 sm:text-base">
            Have a question about our shoes? Send us a message and
            we will get back to you.
          </p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-6 space-y-4"
          >
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 3,
                    message: "Name must be at least 3 characters",
                  },
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "Name can only contain letters",
                  },
                })}
                className={`w-full rounded-md border px-4 py-3 text-sm outline-none ${
                  errors.name
                    ? "border-red-500"
                    : "border-gray-300 focus:border-blue-500"
                }`}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email",
                  },
                })}
                className={`w-full rounded-md border px-4 py-3 text-sm outline-none ${
                  errors.email
                    ? "border-red-500"
                    : "border-gray-300 focus:border-blue-500"
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="text"
                placeholder="03XXXXXXXXX"
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^03[0-9]{9}$/,
                    message: "Enter a valid Pakistani phone number",
                  },
                })}
                className={`w-full rounded-md border px-4 py-3 text-sm outline-none ${
                  errors.phone
                    ? "border-red-500"
                    : "border-gray-300 focus:border-blue-500"
                }`}
              />
              {errors.phone && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.phone.message}
                </p>
              )}
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                rows={4}
                placeholder="Write your message..."
                {...register("message", {
                  maxLength: {
                    value: 500,
                    message: "Message cannot exceed 500 characters",
                  },
                })}
                className={`w-full resize-none rounded-md border px-4 py-3 text-sm outline-none ${
                  errors.message
                    ? "border-red-500"
                    : "border-gray-300 focus:border-blue-500"
                }`}
              />
              {errors.message && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.message.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-md bg-blue-700 px-7 py-3 text-sm font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Opening WhatsApp..." : "Send on WhatsApp"}
            </button>
          </form>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800 sm:text-3xl">
            Get In Touch
          </h2>
          <p className="mt-2 text-sm text-gray-600 sm:text-base">
            Have questions about our collection? Contact us directly.
          </p>
          <div className="mt-6 space-y-4">
            <div className="flex gap-4 w-[70%] rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-700 text-white">
                <FaPhoneAlt />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">
                  Call Us
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Our team is available 24/7
                </p>
                <p className="mt-2 text-sm font-medium text-blue-700">
                  +92 3333 888 5779
                </p>
              </div>
            </div>
            <div className="flex gap-4 w-[70%] rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-green-600 text-white">
                <FaWhatsapp />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">
                  WhatsApp
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Quick responses on WhatsApp
                </p>
                <button
                  type="button"
                  onClick={handleWhatsApp}
                  className="mt-2 text-sm font-medium text-green-700 hover:underline"
                >
                  Chat on WhatsApp
                </button>
              </div>
            </div>
            <div className="flex gap-4 w-[70%] rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-orange-500 text-white">
                <FaEnvelope />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">
                  Email Us
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  For detailed inquiries
                </p>
                <a
                  href="mailto:shopzone@gmail.com"
                  className="mt-2 block text-sm font-medium text-orange-600 hover:underline"
                >
                  shopzone@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;