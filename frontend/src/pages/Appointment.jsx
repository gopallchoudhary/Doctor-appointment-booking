import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DoctorContext } from "../context/DoctorsContext";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol } = useContext(DoctorContext);
  const [docInfo, setDocInfo] = useState([]);
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')

  //? days of week
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]

  //. fetch dr info
  const fetchDocInfo = () => {
    const currentDocInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(currentDocInfo);
  };

  //.available slots
  const getAvailableSlots = () => {
    setDocSlots([])


    const today = new Date() //? todays date

    //? next week days
    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)

      //? setting end time of the date with index 
      let endTime = new Date()
      endTime.setDate(today.getDate() + i)
      endTime.setHours(21, 0, 0, 0)

      //? setting hours
      if (today.getDate() === currentDate.getDate()) {
        //? for today
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() : 10)
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
      } else {
        //? for next days
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }

      let timeSlots = []


      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

        //? add slot to array
        timeSlots.push({
          dateTime: new Date(currentDate),
          time: formattedTime
        })


        //? increment current time by 30 minutes
        currentDate.setMinutes(currentDate.getMinutes() + 30)

      }
      setDocSlots((prev) => ([...prev, timeSlots]))


    } //! end of loop

  } //! end of slots function

  //? use effects
  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    getAvailableSlots()
  }, [docInfo])


  return (
    <div>

      {/* Doctor Details */}
      <div className="flex flex-col sm:flex-row gap-4">


        {/* doctor image */}
        <div className="">
          <img
            className="bg-primary rounded-lg w-full sm:max-w-72"
            src={docInfo.image}
            alt=""
          />
        </div>

        {/* Doctore information */}
        <div className="flex-1 border border-gray-400 rounded-lg mx-2 sm:mx-0 p-8 py-7 mt-[-80px] sm:mt-0 bg-white">
          <p className="flex items-center gap-2 text-3xl font-medium text-gray-900">
            {docInfo.name}
            <img className="w-5" src={assets.verified_icon} alt="" />
          </p>

          <div className="flex items-center gap-2 mt-1 text-md text-gray-600">
            <p>
              {docInfo.degree} - {docInfo.speciality}
            </p>
            <button className="border  border-gray-400 px-2 text-xs py-0.5 rounded-full">
              {docInfo.experience}
            </button>
          </div>

          <div className="my-2 mt-2">
            <p className="flex items-center mt-3 font-medium text-gray-900 gap-1 text-sm">
              About <img className="scale-90" src={assets.info_icon} alt="" />
            </p>
            <p className="text-gray-500 mt-1 max-w-[700px] text-sm">
              {docInfo.about}
            </p>
          </div>
          <p className="text-gray-500 font-medium mt-4">
            Appintment fee:{" "}
            <span className="text-gray-600">
              {currencySymbol}
              {docInfo.fees}
            </span>
          </p>
        </div>

      </div>

      {/* <== BOOKING SLOTS ==>  */}
      <div className="sm:ml-72 mt-4 sm:pl-4 font-medium text-gray-700">
        <p>Booking slots</p>
        <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
          {
            docSlots.length && docSlots.map((item, index) => (
              <div key={index} onClick={() => setSlotIndex(index)} className={`flex flex-col border hover:cursor-pointer border-gray-500 rounded-full px-3 py-4 text-center ${slotIndex == index ? "bg-primary text-white" : ""}`}>
                <p>{item[0] && daysOfWeek[item[0].dateTime.getDay()]}</p>
                <p>{item[0] && item[0].dateTime.getDate()}</p>
              </div>
            ))
          }
        </div>
        <div className="flex gap-4 py-2 mt-2  overflow-x-scroll w-full items-center">
          {
            docSlots.length && docSlots[slotIndex].map((item, index) => (
              <p onClick={() => setSlotTime(item.time)} key={index} className={`border border-gray-600 flex px-4 flex-shrink-0 font-light rounded-full text-sm py-2 hover:cursor-pointer ${item.time == slotTime ? "bg-primary text-white" : ""}`}>{item.time.toLowerCase()}</p>
            ))
          }
        </div>
        <button className="bg-primary text-white text-sm font-light px-14 py-2 my-6 rounded-full">Book An Appointment</button>
      </div>

      {/* Related Doctors */}
      <RelatedDoctors docId={docId} speciality={docInfo.speciality}/>



    </div>
  );
};

export default Appointment;
