import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
    return (
        <div className='flex flex-col md:flex-row flex-wrap rounded-lg bg-primary px-6 md:px-10 lg:px-20'>


            {/* {left side} */}
            <div className='md:w-1/2 flex flex-col gap-4 items-start  py-10 m-auto md:py-[10vw] md:mb-[-30px] text-white'>
                <p className='font-semibold  text-3xl md:text-4xl lg:text-5xl'>
                    Book Appointment <br /> With Trusted Doctors
                </p>
                <div className='flex flex-col md:flex-row gap-3 text-sm font-light items-center mt-2 mb-2'>
                    <img className='w-28' src={assets.group_profiles} alt="" />
                    <p className='text-sm font-normal'>
                        Simply browse through our extensive list of trusted doctors, <br className='hiddern sm:block' />
                        schedule your appointment hassle-free.
                    </p>
                </div>
                <a className='flex gap-2 items-center bg-white text-gray-600 text-sm py-3 px-8 rounded-full m-auto md:m-0 transform hover:scale-105 translate-all ease-in-out duration-300' href="#speciality">
                    Book Appointment <img className='w-3' src={assets.arrow_icon} alt="" />
                </a>
            </div>

            {/* {right side} */}
            <div className='md:w-1/2 relative'>
                <img className='w-full md:absolute bottom-0 h-auto rounded-lg' src={assets.header_img} alt="" />
            </div>
        </div>
    )
}

export default Header