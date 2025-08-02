import React from 'react'

const DashInfo = ({ icon, number, text }) => {
    return (
        <div className='flex items-center gap-2 bg-white p-4 cursor-pointer hover:scale-105 transition-all min-w-52 rounded  border-2'>
            <img src={icon} alt="" className='mx-auto w-14' />
            <div className=''>
                <p className='text-xl font-semibold text-gray-600'>{number}</p>
                <p className='text-gray-400'>{text}</p>
            </div>
        </div>
    )
}

export default DashInfo