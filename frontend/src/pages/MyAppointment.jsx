import React, { useContext } from 'react'
import { DoctorContext } from '../context/DoctorsContext'

const MyAppointment = () => {
  const { doctors } = useContext(DoctorContext)
  return (
    <div>
      <p className='pb-3 font-medium text-zinc-700 border-b mt-12'>My Appointments</p>
      <div>
        {
          doctors.slice(0, 2).map((item, index) => (
            <div key={index} className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b'>
              <div>
                <img className='w-32 bg-indigo-50' src={item.image} alt="" />
              </div>
              <div className='flex-1 text-sm text-zinc-600'>
                <p className='font-semibold  text-neutral-800'>{item.name}</p>
                <p>{item.speciality}</p>
                <p className='text-zinc-700 font-medium mt-2 mb-1'>Address:</p>
                <p className='text-xs'>{item.address.line1}</p>
                <p className='text-xs'>{item.address.line2}</p>
                <p className='my-2 text-neutral-700 font-medium'>Date & Time:  <span className='text-gray-500 font-normal'>25 July 2025 | 8:30 PM</span></p>
              </div>
              <div></div>
              <div className='flex flex-col gap-4 items-center justify-end mb-2 text-stone-500 text-sm'>
                <button className=' sm:min-w-48 px-6 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300'>Pay Here</button>
                <button className='border sm:min-w-48 rounded  px-6 py-2 hover:bg-red-600 hover:text-white transition-all duration-300'>Cancel Appointment</button>
              </div>
            </div>
          ))
        }

      </div>
    </div>
  )
}

export default MyAppointment