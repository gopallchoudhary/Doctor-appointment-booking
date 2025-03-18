import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>CONTACT <span className='text-gray-700 font-semibold'>US</span></p>
      </div>

      <div className='flex flex-col md:flex-row gap-10   justify-center my-10 mb-20'>
        <img src={assets.contact_image} className='w-full md:max-w-[360px]' alt="" />
        <div className='flex flex-col gap-6 items-start justify-center text-sm'>
          <p className='text-gray-600 font-semibold text-lg'>OUR OFFICE</p>
          <p className='text-gray-500'>00000 Willms Station <br /> Suite 000, Washington, USA</p>
          <p className='text-gray-500'>Tel: (000) 000-0000 <br /> Email: greatstackdev@gmail.com</p>
          <p className='text-gray-600 font-semibold text-lg'>CAREERS AT PRESCRIPTO</p>
          <p className='text-gray-500'>Learn more about our teams and job openings.</p>
          <button className='border border-black px-8 py-4 hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs </button>
        </div>
      </div>
    </div>
  )
}

export default Contact