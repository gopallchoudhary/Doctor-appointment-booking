import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Doctors from "./pages/Doctors";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MyAppointment from "./pages/MyAppointment";
import MyProfile from "./pages/MyProfile";
import Appointment from "./pages/Appointment";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="mx-4 sm:mx-[10%]">
      <Navbar />
      <Routes path="/">
        <Route path="" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="doctors" element={<Doctors />} />
        <Route path="login" element={<Login />} />
        <Route path="my-appointment" element={<MyAppointment />} />
        <Route path="my-profile" element={<MyProfile />} />
        <Route path="appointment/:docId" element={<Appointment />} />
        <Route path="contact" element={<Contact />} />
      </Routes>
    </div>
  );
}

export default App;
