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
import Footer from "./components/Footer";
import Layout from "./Layout";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/ReactToastify.css'

function App() {
  return (
    <div className="mx-4 sm:mx-[10%]">
      <ToastContainer/>
      <Routes >
        <Route path="/" element={<Layout/>}>
            <Route path="" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="doctors" element={<Doctors />} />
            <Route path="doctors/:speciality" element={<Doctors />} />
            <Route path="login" element={<Login />} />
            <Route path="my-appointment" element={<MyAppointment />} />
            <Route path="my-profile" element={<MyProfile />} />
            <Route path="appointment/:docId" element={<Appointment />} />
            <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
