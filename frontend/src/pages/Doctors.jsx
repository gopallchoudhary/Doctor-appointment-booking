import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DoctorContext } from "../context/DoctorsContext";

const Doctors = () => {
  const { speciality } = useParams();
  const {doctors} = useContext(DoctorContext);
  const navigate = useNavigate();
  const [filteredDoctor, setFilteredDoctor] = useState([]);


  const applyFilter = () => {
    if (speciality) {
      setFilteredDoctor(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setFilteredDoctor(doctors);
    }
  };

  const pref = useRef("");
  const getText = () => {
    const text = pref.current.textContent;
    // console.log(text);
  };

  useEffect(() => {
    applyFilter();
  }, [speciality, doctors]);

  const newSet = new Set();

  const uniqueData = doctors.filter((doc) => {
    if (newSet.has(doc.speciality)) return false;
    newSet.add(doc.speciality);
    return true;
  });

  // console.log(uniqueData);

  return (
    <div>
      <p className="text-gray-600">Browse through the doctors specialist.</p>
      <div className=" flex flex-col sm:flex-row items-start mt-5 gap-5">
        <div className=" flex flex-col text-sm gap-4 whitespace-nowrap">
          {uniqueData.map((doc, index) => (
            <p
              onClick={() => speciality?.trim("") === doc.speciality?.trim("")
                ? navigate("/doctors")
                : navigate(`/doctors/${doc.speciality}`)
              }
              className={`w-[94vw] sm:w-auto border border-gray-300 py-1.5 pl-3.5 pr-16 text-gray-600 hover:cursor-pointer rounded transition-all ${speciality === doc.speciality
                ? "bg-indigo-100 text-black" : ""}`}
              key={index}
            >
              {doc.speciality}
            </p>
          ))}
        </div>
        <div className="w-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4  gap-y-6 ml-auto">
          {filteredDoctor.map((item, index) => (
            <div
              onClick={() => navigate(`/appointment/${item._id}`)}
              key={index}
              className="border border-blue-200 rounded-xl overflow-hidden hover:translate-y-[-10px] transition-all duration-500 ease-in-out mx-auto hover:cursor-pointer"
            >
              <img className=" bg-blue-50" src={item.image} alt="" />
              <div className="p-4">
                <div className="flex items-center text-center gap-2 text-green-500">
                  <p className="w-2 h-2 bg-green-500 rounded-full"></p>{" "}
                  <p>Availabe</p>
                </div>
                <div>
                  <p className="text-md font-medium text-gray-900 ">
                    {item.name}
                  </p>
                  <p className="text-gray-600 text-sm">{item.speciality}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
