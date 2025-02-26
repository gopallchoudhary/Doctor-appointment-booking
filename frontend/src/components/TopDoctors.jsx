import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorsContext'

const TopDoctors = () => {
    const navigate = useNavigate()
    const {doctors} = useContext(DoctorContext)
    return (
        <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
            <h1 className='text-3xl font-medium'>Top Doctors to Book</h1>
            <p className='text-center text-md sm:w-1/2'>Simply browse through our extensive list of trusted doctors.</p>
            <div className='w-auto flex flex-wrap gap-4 gap-y-6 sm:px-0'>
                {
                    doctors.slice(0, 10).map((item, index) => (
                        <div onClick={() => navigate(`/appointment/${item._id}`)} key={index} className='border border-blue-200 rounded-xl overflow-hidden hover:translate-y-[-10px] transition-all duration-500 ease-in-out mx-auto hover:cursor-pointer w-[216px]'>
                            <img className=' bg-blue-50' src={item.image} alt="" />
                            <div className='p-4'>
                                <div className='flex items-center text-center gap-2 text-green-500'>
                                    <p className='w-2 h-2 bg-green-500 rounded-full'></p> <p>Availabe</p>
                                </div>
                                <div>
                                    <p className='text-lg font-medium text-gray-900 '>{item.name}</p>
                                    <p className='text-gray-600 text-sm'>{item.speciality}</p>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            <button onClick={() => { navigate("doctors"); scrollTo(0, 0) }} className='bg-blue-50 px-12  py-2 rounded-full text-gray-600 before:absolute before:inset-0 before:bg-blue-100 before:scale-x-0 before:origin-center before:transition-transform before:duration-500 hover:before:scale-x-100 mt-10 relative overflow-hidden'><span className='relative z-10'>more</span></button>
        </div >
    )
}

export default TopDoctors