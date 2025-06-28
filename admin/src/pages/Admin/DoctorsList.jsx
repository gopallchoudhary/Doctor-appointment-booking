import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../contexts/AdminContext";

const DoctorsList = () => {
  const { doctors, adminToken, getAllDoctors, changeAvailability } =
    useContext(AdminContext);

  useEffect(() => {
    getAllDoctors();
  }, [adminToken]);
  return (
    <div className="m-5 overflow-y-scroll max-h-[90vh]">
      <h1 className="text-lg font-medium">All Doctors </h1>
      <div className="w-full flex flex-wrap gap-4 gap-y-6 pt-5">
        {doctors.map((item, index) => (
          <div
            className="border border-indigo-500 rounded-xl group max-w-56 overflow-hidden cursor-pointer"
            key={index}
          >
            <img
              className="bg-indigo-50 group-hover:bg-primary duration-500 transition-all"
              src={item.image}
              alt=""
            />
            <div className="p-4">
              <p className="text-neutral-800 font-medium text-lg">
                {item.name}
              </p>
              <p className="text-zinc-600 text-sm">{item.speciality}</p>
              <div className="flex mt-2 text-sm gap-1 items-center">
                <input
                  onChange={() => changeAvailability(item._id)}
                  type="checkbox"
                  checked={item.available}
                />
                <p>Available</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;
