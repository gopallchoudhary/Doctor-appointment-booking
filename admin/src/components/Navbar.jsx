import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets.js'
import { AdminContext } from '../contexts/AdminContext'
import Cookies from 'js-cookie'
import axios from 'axios';

const Navbar = () => {
    const { adminToken, setAdminToken, backendUrl} = useContext(AdminContext)
    const navigate = useNavigate()

    const logout = async () => {
        navigate('/')
        adminToken && setAdminToken('')
        await axios.get(`${backendUrl}/api/admin/logout`)

    }
    return (
        <div className='flex items-center justify-between px-4 sm:px-10 py-3 border-b bg-white'>
            <div className='flex items-center gap-2 text-xs'>
                <img onClick={() => navigate('/')} className='w-36 sm:w-40 cursor-pointer' src={assets.admin_logo} alt="" />
                <p className='border border-gray-500 rounded-full px-2.5 py-0.5 text-gray-600'>{adminToken ? 'Admin' : 'Doctor'}</p>
            </div>
            <button onClick={logout} className='bg-primary text-sm text-white px-8 py-2 rounded-full'>Logout</button>
        </div>
    )
}

export default Navbar