import React from 'react'
import { useContext, useEffect } from 'react'
import { AdminContext } from '../../contexts/AdminContext'
import { assets } from '../../assets/assets'
import DashInfo from '../../components/DashInfo'
import { AppContext } from '../../contexts/AppContext'

const Dashboard = () => {
  const { adminToken, dashData, cancelAppointment, getDashboardData } = useContext(AdminContext)
  const { slotDateFormat } = useContext(AppContext)

  useEffect(() => {
    getDashboardData()
  }, [adminToken])

  return dashData && (
    <div className='m-5'>
      <div>
        <div className='flex gap-6'>
          <DashInfo text={`Doctors`} icon={assets.doctor_icon} number={dashData.doctors} />
          <DashInfo text={`Patients`} icon={assets.patients_icon} number={dashData.patients} />
          <DashInfo text={`Appointments`} icon={assets.appointment_icon} number={dashData.appointments} />
        </div>
      </div>

      <div className='bg-white'>
        <div className='flex items-center gap-2.5 mt-10 p-4 rounded-t border'>
          <img src={assets.list_icon} alt="" />
          <p className='font-semibold'>Latest Bookings</p>
        </div>
        <div className='pt-4 border border-t-0'>
          {
            dashData.latestAppointments.map((item, index) => (
              <div key={index} className='flex items-center gap-3 px-6 py-3 hover:bg-gray-100'>
                <img className='rounded-full w-10 ' src={item.docData.image} alt="" />
                <div className='flex-1 text-sm'>
                  <p className='text-gray-800 font-medium'>{item.docData.name}</p>
                  <p className='text-gray-600'>{slotDateFormat(item.slotDate)}</p>
                </div>
                {
                  item.cancelled ?
                    <p className='text-red-400 text-xs font-medium'>Cancelled</p>
                    :
                    <img className='w-10 cursor-pointer' onClick={() => cancelAppointment(item._id)} src={assets.cancel_icon} alt="" />
                }
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Dashboard