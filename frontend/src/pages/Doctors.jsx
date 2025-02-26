import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorsContext'

const Doctors = () => {
  const { speciality } = useParams()
  const doctors = useContext(DoctorContext)
  const navigate = useNavigate()
  const [filteredDoctor, setFilteredDoctor] = useState([])

  const applyFilter = () => {
    if (speciality) {
      setFilteredDoctor(doctors.filter((doc) => doc.speciality === speciality))
    } else {
      setFilteredDoctor(doctors)
    }
  }

  const pref = useRef("")
  const getText = () => {
    const text = pref.current.textContent
    console.log(text);
  }

  useEffect(() => {
    applyFilter()
  }, [speciality, doctors])

  const newSet = new Set()

  const uniqueData = doctors.filter((doc) => {
    if (newSet.has(doc.speciality)) return false
    newSet.add(doc.speciality)
    return true
  })

  console.log(uniqueData);




  return (
    <div>
      <p>Browse through the doctors specialist.</p>
      <div>
        <div>
          {
            uniqueData.map((doc, index) => (
              <p key={index}>{doc.speciality}</p>
            ))
          }
        </div>
        <div>
          {
            filteredDoctor.map((item, index) => (
              <div onClick={() => navigate(`/appointment/${item._id}`)} key={index} className='border border-blue-200 rounded-xl overflow-hidden hover:translate-y-[-10px] transition-all duration-500 ease-in-out mx-auto'>
                <img className='sm:w-52 bg-blue-50' src={item.image} alt="" />
                <div className='p-4'>
                  <div className='flex items-center text-center gap-2 text-green-500'>
                    <p className='w-2 h-2 bg-green-500 rounded-full'></p> <p>Availabe</p>
                  </div>
                  <div>
                    <p className='text-md font-medium text-gray-900 '>{item.name}</p>
                    <p className='text-gray-600 text-sm'>{item.speciality}</p>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Doctors