import React from 'react'
import axios from 'axios'
import { useContext } from 'react'
import { AdminContext } from '../../contexts/AdminContext'
import { useEffect } from 'react'
import { AppContext } from '../../contexts/AppContext'
import { assets } from '../../assets/assets.js'

const Appointments = () => {
  const { getAllAppointments, appointments, adminToken, cancelAppointment } = useContext(AdminContext)
  const { calculateAge, slotDateFormat } = useContext(AppContext)




  useEffect(() => {
    if (adminToken) {
      getAllAppointments()
    }
  }, [adminToken])
  return (
    <div className='w-full m-5 max-w-6xl'>
      <p className='mb-3 text-lg font-medium'>All Appointments</p>

      <div className='bg-white max-h-[80vh] min-h-[60vh] border rounded overflow-y-scroll text-sm'>
        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] border-b px-6 py-3 '>
          <p>#</p>
          <p>patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>
        {appointments.map((item, index) => (
          <div className='flex flex-wrap justify-between max-sm:gap-2 sm:grid items-center sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] text-gray-500 hover:bg-gray-50 px-3 py-6 border-b' key={index}>
            <p className='max-sm:hidden ml-3'>{index + 1}</p>

            <div className='flex items-center gap-2'>
              <img className='aspect-square object-cover w-8 rounded-full' src={item.userData.image} alt="" />
              <p>{item.userData.name}</p>
            </div>
            <p className='max-sm:hidden'>{calculateAge(`${item.userData.dob}`)}</p>
            <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>

            <div className='flex items-center gap-2'>
              <img className='aspect-square object-cover bg-gray-50 w-8 rounded-full' src={item.docData.image} alt="" />
              <p>{item.docData.name}</p>
            </div>

            <p>{`$${item.amount}`}</p>

            {
              item.cancelled ?
                <p className='text-red-400 text-xs font-medium'>Cancelled</p>
                :
                <img className='w-10 cursor-pointer' onClick={() => cancelAppointment(item._id)} src={assets.cancel_icon} alt="" />
            }
          </div>
        ))}
      </div>
    </div>
  )
}

export default Appointments