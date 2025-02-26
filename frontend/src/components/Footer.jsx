import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>

      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr]  gap-14 text-sm mt-40 my-10'>
        {/* left side */}
        <div>
          <img className='w-40 mb-5' src={assets.logo} alt="" />
          <p className='text-gray-600 w-full md:w-2/3 leading-6'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
        </div>

        {/* center */}
        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='text-gray-600  flex flex-col gap-2'>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        {/* right side */}
        <div>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='text-gray-600 flex flex-col gap-2'>
            <li>+0-000-000-000</li>
            <li>greatstackdev@gmail.com</li>
          </ul>
        </div>
      </div>
      <div className=''>
        <hr />
        <p className='py-6 text-sm text-center'>Copyright 2024 @ Greatstack.dev - All Right Reserved.</p>
      </div>
    </div>
  )
}

export default Footer