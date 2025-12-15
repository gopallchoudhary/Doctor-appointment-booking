import React, { useContext, useState } from "react";
import { assets } from "../assets/assets.js";
import { NavLink, useNavigate } from "react-router-dom";
import { DoctorContext } from "../context/DoctorsContext.jsx";
import axios from "axios";

const Navbar = () => {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const { token, setToken, backendUrl, userData } = useContext(DoctorContext);

    const logout = async () => {
        localStorage.removeItem("userToken");
        setToken(false);
        const { data } = await axios.get(`${backendUrl}/api/user/logout`, {
            withCredentials: true,
        });
        console.log(data?.message);
    };

    return (
        <>
            <div className="flex items-center justify-between text-sm py-4 border-b mb-5 border-b-gray-400">
                <img
                    onClick={() => navigate("/")}
                    className="w-44 cursor-pointer"
                    src={assets.logo}
                    alt=""
                />

                {/* navbar lists */}
                <ul className="hidden md:flex font-medium items-center justify-between gap-6">
                    <NavLink className={`relative group`} to="/">
                        <li className="py-1">HOME</li>
                        <hr className="outline-none border-none m-auto w-3/4 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                    </NavLink>
                    <NavLink className={`relative group`} to="/doctors">
                        <li className="py-1">ALL DOCTORS</li>
                        <hr className="outline-none border-none mx-auto w-3/4 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                    </NavLink>
                    <NavLink className={`relative group`} to="/about">
                        <li className="py-1">ABOUT</li>
                        <hr className="outline-none border-none m-auto w-3/4 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                    </NavLink>
                    <NavLink className={`relative group`} to="/contact">
                        <li className="py-1">CONTACT</li>
                        <hr className="outline-none border-none w-3/4 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                    </NavLink>
                    <div className="font-semibold text-xs py-1 border rounded-full">
                        <button className="mx-4">Admin Panel</button>
                    </div>
                </ul>
                <div className="flex items-center gap-4">
                    {token && userData ? (
                        <div className="flex items-center gap-2 cursor-pointer  group relative">
                            <img
                                className="w-10 aspect-square object-cover rounded-full"
                                src={userData.image}
                                alt=""
                            />
                            <img
                                className="w-2.5"
                                src={assets.dropdown_icon}
                                alt=""
                            />
                            <div className="absolute top-0 right-0 pt-14 z-20 text-gray-600 text-base font-medium hidden group-hover:block">
                                <div className="bg-stone-100 min-w-48 rounded flex flex-col gap-2 p-4">
                                    <p
                                        className="hover:text-black cursor-pointer transform scale-95 hover:scale-105 transition-all duration-300 ease-in-out"
                                        onClick={() => navigate("my-profile")}
                                    >
                                        My Profile
                                    </p>
                                    <p
                                        className="hover:text-black cursor-pointer  transform scale-95 hover:scale-105 transition-all duration-300 ease-in-out"
                                        onClick={() =>
                                            navigate("my-appointments")
                                        }
                                    >
                                        My Appointment
                                    </p>
                                    <p
                                        className="hover:text-black cursor-pointer transform scale-95 hover:scale-105 transition-all duration-300 ease-in-out"
                                        onClick={logout}
                                    >
                                        Logout
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <button
                            onClick={() => navigate("login")}
                            className="bg-primary px-8 py-3 font-normal text-sm  text-white rounded-full"
                        >
                            Create Account
                        </button>
                    )}

                    <img
                        onClick={() => setShowMenu(true)}
                        src={assets.menu_icon}
                        className="w-6 md:hidden"
                        alt=""
                    />

                    {/* Mobile Menu */}
                    <div
                        className={`${
                            showMenu ? "fixed w-full" : "w-0 h-0"
                        } bg-white top-0 bottom-0 right-0 transition-all duration-300 overflow-hidden z-20 `}
                    >
                        <div className="flex justify-between px-5 py-6 items-center">
                            <img src={assets.logo} className="w-36" alt="" />
                            <img
                                onClick={() => setShowMenu(false)}
                                src={assets.cross_icon}
                                className="w-7"
                                alt=""
                            />
                        </div>

                        <ul className="flex flex-col items-center gap-5 mt-5 px-5 text-lg font-medium">
                            <NavLink
                                className={({ isActive }) =>
                                    `${
                                        isActive
                                            ? "bg-primary text-white px-4 py-2 rounded"
                                            : ""
                                    }`
                                }
                                onClick={() => setShowMenu(false)}
                                to="/"
                            >
                                HOME
                            </NavLink>

                            <NavLink
                                className={({ isActive }) =>
                                    `${
                                        isActive
                                            ? "bg-primary text-white px-4 py-2 rounded"
                                            : ""
                                    }`
                                }
                                onClick={() => setShowMenu(false)}
                                to="/doctors"
                            >
                                ALL DOCTORS
                            </NavLink>

                            <NavLink
                                className={({ isActive }) =>
                                    `${
                                        isActive
                                            ? "bg-primary text-white px-4 py-2 rounded"
                                            : ""
                                    }`
                                }
                                onClick={() => setShowMenu(false)}
                                to="/about"
                            >
                                ABOUT
                            </NavLink>

                            <NavLink
                                className={({ isActive }) =>
                                    `${
                                        isActive
                                            ? "bg-primary text-white px-4 py-2 rounded"
                                            : ""
                                    }`
                                }
                                onClick={() => setShowMenu(false)}
                                to="/contact"
                            >
                                CONTACT
                            </NavLink>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
