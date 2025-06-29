import React, { useContext, useState } from 'react'
import { DoctorContext } from '../context/DoctorsContext'
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets.js'

const MyProfile = () => {
  const { userData, setUserData, backendUrl, token, loadUserProfileData } = useContext(DoctorContext)
  const [isEdit, setIsEdit] = useState(false)
  const [image, setImage] = useState(false)

  const updateUserProfile = async () => {
    try {
      const formData = new FormData()
      formData.append('name', userData.name)
      formData.append('phone', userData.phone)
      formData.append('address', JSON.stringify(userData.address))
      formData.append('dob', userData.dob)
      formData.append('gender', userData.gender)

      image && formData.append('image', image)
      console.log(formData);


      const { data } = await axios.post(`${backendUrl}/api/user/update-profile`, formData, { headers: { token }, withCredentials: true })

      if (data.success) {
        console.log(image);

        loadUserProfileData()
        toast.success(data.message)
        setIsEdit(false)
        setImage(false)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  return userData && (
    <div className='max-w-lg flex flex-col gap-2 text-sm'>

      {
        isEdit
          ?
          <label htmlFor="image">
            <div className='inline-block relative cursor-pointer'>
              <img className='w-36 opacity-75 rounded' src={image ? URL.createObjectURL(image) : userData.image} alt="" />
              <img className='w-10 absolute bottom-4 right-12' src={image ? null : assets.upload_icon} alt="" />
            </div>
            <input type="file" onChange={(e) => setImage(e.target.files[0])} id='image' hidden />
          </label>
          :
          <img className='w-36 rounded' src={userData.image} alt="" />
      }

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

          <p className='font-medium'>Address:</p>
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
            ? <div>
              <button className='border border-primary rounded-full px-8 py-2 hover:bg-primary hover:text-white transition-all duration-300' onClick={(e) => setIsEdit(prev => !prev)}>Cancel</button>

              <button className='border border-primary rounded-full px-8 py-2 hover:bg-primary hover:text-white transition-all duration-300 ml-2' onClick={updateUserProfile}>Save Information</button>
            </div>

            : <button className='border border-primary rounded-full px-8 py-2 hover:bg-primary hover:text-white transition-all duration-300' onClick={() => setIsEdit(prev => !prev)}>Edit</button>
        }
      </div>

    </div>
  )
}

export default MyProfile  