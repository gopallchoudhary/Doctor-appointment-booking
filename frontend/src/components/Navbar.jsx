import React from "react";
import { assets } from "../assets/assets.js";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate()
    return (
        <>
            <div className="flex items-center justify-between text-sm py-4 border-b mb-5 border-b-gray-400">
                <img className="w-44 cursor-pointer" src={assets.logo} alt="" />
                <ul className="hidden md:flex font-medium items-center justify-between gap-4">
                    <NavLink to="/" >
                        <li className="py-1">HOME</li>
                        <hr className="outline-none border-none m-auto w-3/4 h-0.5 bg-primary hidden" />
                    </NavLink>
                    <NavLink to="/doctors" >
                        <li className="py-1">ALL DOCTORS</li>
                        <hr className="outline-none border-none mx-auto w-3/4 h-0.5 bg-primary hidden " />
                    </NavLink>
                    <NavLink to="/about" >
                        <li className="py-1">ABOUT</li>
                        <hr className="outline-none border-none m-auto w-3/4 h-0.5 bg-primary hidden" />
                    </NavLink>
                    <NavLink to="/contact" >
                        <li className="py-1">CONTACT</li>
                        <hr className="outline-none border-none w-3/4 h-0.5 bg-primary hidden" />
                    </NavLink>
                    <div className="font-normal py-1 border rounded-full">
                        <button className="mx-4">Admin Panel</button>
                    </div>
                </ul>
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate("/login")} className="bg-primary px-8 py-3 font-light text-white rounded-full">Create Account</button>
                </div>
            </div>
        </>
    );
};

export default Navbar;
