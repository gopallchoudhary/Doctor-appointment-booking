import React, { useState } from 'react'
import { assets } from '../assets/assets'

const MyProfile = () => {
  const [userData, setUserData] = useState({
    name: "Gopal Chouhdary",
    image: assets.profile_pic,
    email: "gopal121@gmail.com",
    phone: 9098570282,
    address: {
      line1: "57th cross, richmond",
      line2: "Circle, church road, London"
    },
    gender: "Male",
    dob: "2001-02-06"
  })

  const [isEdit, setIsEdit] = useState(false)

  return (
    <div className='max-w-lg flex flex-col gap-2 text-sm'>

      <img className='w-36 rounded' src={assets.profile_pic} alt="" />

      {
        isEdit
          ? <input className='text-3xl font-medium bg-gray-50 max-w-64 p-1' type="text" value={userData.name} onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))} />
          : <p className='text-3xl font-medium'>{userData.name}</p>
      }
      <hr className='bg-zinc-400 h-[1px] border-none' />

      <div>
        <p className='underline text-neutral-500 mt-2'>CONTACT INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-2'>
          <p className='font-medium'>Email Id</p>
          <p className='text-blue-500'>{userData.email}</p>
          <p className='font-medium'>Phone:</p>
          {
            isEdit
              ? <input className='bg-gray-100 max-w-52' type="text" value={userData.phone} onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))} />
              : <p className='text-blue-400'>{userData.phone}</p>
          }

          <p className='font-medium'>Address: </p>
          {
            isEdit
              ? <p className=''>
                <input className='bg-gray-50' type="text" value={userData.address.line1} onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} />
                <br />
                <input className='bg-gray-50' type="text" value={userData.address.line2} onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} />
              </p>

              : <p className='text-gray-500'>
                {userData.address.line1}
                <br />
                {userData.address.line2}
              </p>
          }
        </div>

      </div>

      <div>
        <p className='underline text-neutral-500 mt-2'>BASIC INFORMATION</p>

        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-2 text-neutral-700'>
          <p className='font-medium'>Gender</p>
          {
            isEdit
              ? <select className='bg-gray-50 max-w-20' value={userData.gender} onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              : <p className='text-gray-400'>{userData.gender}</p>
          }

          <p className='font-medium'>Birthday:</p>
          {
            isEdit
              ? <input className='bg-gray-50 max-w-28' type="date" value={userData.dob} onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} />
              : <p className='text-gray-400'>{userData.dob}</p>
          }
        </div>

      </div>

      <div className='mt-10'>
        {
          isEdit
            ? <button className='border border-primary rounded-full px-8 py-2 hover:bg-primary hover:text-white transition-all duration-300' onClick={() => setIsEdit(prev => !prev)}>Save Information</button>
            : <button className='border border-primary rounded-full px-8 py-2 hover:bg-primary hover:text-white transition-all duration-300' onClick={() => setIsEdit(prev => !prev)}>Edit</button>
        }
      </div>

    </div>
  )
}

export default MyProfile  