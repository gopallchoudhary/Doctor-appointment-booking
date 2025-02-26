import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DoctorContext } from "../context/DoctorsContext";
import { assets } from "../assets/assets";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol } = useContext(DoctorContext);
  const [docInfo, setDocInfo] = useState([]);

  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')

  const fetchDocInfo = () => {
    const currentDocInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(currentDocInfo);
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

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
    </div>
  );
};

export default Appointment;
