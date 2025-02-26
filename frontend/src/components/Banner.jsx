import React from "react";
import { assets } from "../assets/assets.js";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();
  return (
    <div className="flex bg-primary rounded-lg my-20 md:mx-10 px-6 sm:px-10 md:px-12 lg:px-14">
      {/* <==left side==> */}
      <div className="flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5 ">
        <div className="text-white text-xl font-bold sm:text-2xl md:text-3xl lg:text-5xl">
          <p>Book Appointment</p>
          <p className="mt-4 ">With 100+ Trusted Doctors</p>
        </div>
        <button
          onClick={() => { navigate("/login"); scrollTo(0, 0) }}
          className="text-gray-600 bg-white px-8 py-2 rounded-full mt-8 text-sm sm:text-base hover:scale-110 transition-all duration-300 ease-in font-light"
        >
          Create Account
        </button>


      </div>

      {/* <==right side==> */}
      <div className="hidden md:block md:w-1/2 lg:w-[370px] relative">
        <img
          className="absolute right-0 bottom-0 w-full"
          src={assets.appointment_img}
          alt=""
        />
      </div>
    </div>
  );
};

export default Banner;
