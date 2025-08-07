import React, { useContext, useState } from 'react'
import Login from './pages/Login'

import { ToastContainer} from 'react-toastify';
import 'react-toastify/ReactToastify.css'
import { AdminContext } from './contexts/AdminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard';
import Appointments from './pages/Admin/AllAppointments';
import AddDoctors from './pages/Admin/AddDoctors';
import DoctorsList from './pages/Admin/DoctorsList';
import Home from './pages/Admin/Home';
import { DoctorContext } from './contexts/DoctorContext';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import DoctorAppointments from './pages/Doctor/DoctorAppointments';
import DoctorProfile from './pages/Doctor/DoctorProfile';

function App() {

  const { adminToken } = useContext(AdminContext)
  const { doctorToken } = useContext(DoctorContext)


  return adminToken || doctorToken ? (
    <div className='bg-[#F8F9FD]'>
      <ToastContainer />
      <Navbar />
      <div className='flex items-start'>
        <Sidebar />
        <Routes>
          {/* Admin Routes */}
          <Route path='/' element={<Home />} />
          <Route path='/admin-dashboard' element={<Dashboard />} />
          <Route path='/all-appointments' element={<Appointments />} />
          <Route path='/add-doctor' element={<AddDoctors />} />
          <Route path='/doctors-list' element={<DoctorsList />} />

          {/* Doctor Routes */}
          <Route path='/doctor-dashboard' element={<DoctorDashboard/>}/>
          <Route path='/doctor-appointments' element={<DoctorAppointments/>}/>
          <Route path='/doctor-profile' element={<DoctorProfile/>}/>
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  )
}

export default App