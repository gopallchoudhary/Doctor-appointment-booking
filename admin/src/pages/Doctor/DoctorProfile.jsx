import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../contexts/DoctorContext";

const DoctorProfile = () => {
  const { profileData, getProfileData, doctorToken, setProfileData } =
    useContext(DoctorContext);

  const [isEdit, setIsEdit] = useState(false)


  useEffect(() => {
    if (doctorToken) {
      getProfileData();
    }
  }, [doctorToken]);
  return (
    profileData && (
      <div>
        <div className="flex flex-col gap-4 m-5">
          <div>
            <img
              className="w-full sm:max-w-64 rounded-lg  bg-primary/80"
              src={profileData.image}
              alt=""
            />
          </div>

          <div className="flex-1 border border-stone-100 rounded-lg p-7 py-8 bg-white">
            {/* {Doc Info: name, degree experience} */}
            <p className="flex items-center gap-2 font-medium text-3xl">{profileData.name}</p>

            <div className="flex items-center gap-2 text-gray-600">
              <p>
                {profileData.degree} - {profileData.speciality}
              </p>
              <button className="text-xs py-0.5 px-2  border rounded-full ">
                {profileData.experience}
              </button>
            </div>

            <div className="">
              <p className="text-md text-neutral-800  mt-3 font-medium flex items-center gap-1">About</p>
              <p className="text-sm text-gray-600 mt-1 max-w-[700px]">{profileData.about}</p>
            </div>

            <p className="text-gray-600 font-medium mt-4">
              Appointment Fees <span className="text-gray-800">{`$${profileData.fees}`}</span>
            </p>

            <div className="flex gap-2 py-2">
              <p>Address</p>
              <p className="text-sm">{profileData.address.line1}
                <br />
                {profileData.address.line2}
              </p>
            </div>

            <div className="flex gap-1 pt-2">
              <input type="checkbox" />
              <label htmlFor="">Available</label>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setIsEdit((prev) => !prev)} className={`py-1 px-4 text-sm border   rounded-full mt-5 border-primary hover:bg-primary hover:text-white transition-all ease-in-out duraton-500 ${isEdit ? "hover:bg-red-400" : ""}`}>{isEdit ? "Cancel" : "Edit"}</button>

              {
                isEdit && <button className="py-1 px-4 text-sm border  border-primary rounded-full mt-5 hover:bg-primary hover:text-white transition-all ease-in-out duraton-500">Save</button>
              }
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorProfile;
