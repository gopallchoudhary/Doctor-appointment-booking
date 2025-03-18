import React, { useState } from 'react'
import { assets } from '../assets/assets'

const MyProfile = () => {
  const [userData, setUserData] = useState({
    name: "Gopal Chouhdary",
    image: assets.profile_pic,
    email: "gopal121@gmail.com",
    phone: 9098570282,
    address: {
      line1: "57th cross, richmond",
      line2: "Circle, church road, London"
    },
    gender: "Male",
    dob: "2001-02-06"
  })

  const [isEdit, setIsEdit] = useState(false)

  return (
    <div>
      <img src={assets.profile_pic} alt="" />

      {
        isEdit
          ? <input type="text" value={userData.name} onChange={(e) => setUserData({ ...prev, name: e.target.value })} />
          : <p>{userData.name}</p>
      }
      <hr />
      <div>
        <p>CONTACT INFORMATION</p>
        <div>
          <p>Email Id</p>
          <p>{userData.email}</p>
          <p>Phone:</p>
          {
            isEdit
              ? <input type="text" value={userData.phone} onChange={(e) => setUserData({ ...prev, phone: e.target.value })} />
              : <p>{userData.phone}</p>
          }

          <p>Address: </p>
          {
            isEdit
              ? <p>
                <input type="text" value={userData.address.line1} onChange={(e) => setUserData({ ...prev, address: { ...prev.address, line1: e.target.value } })} />
                <br />
                <input type="text" value={userData.address.line2} onChange={(e) => setUserData({ ...prev, address: { ...prev.address, line2: e.target.value } })} />
              </p>

              : <p>
                {userData.address.line1}
                <br />
                {userData.address.line2}
              </p>
          }
        </div>
      </div>

      <div>
        <p>BASIC INFORMATION</p>
        <div>
          <p>Gender</p>
          {
            isEdit
              ? <select value={userData.gender} onChange={(e) => setUserData({ ...prev, gender: e.target.value })}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              : <p>{userData.gender}</p>
          }

          <p>Birthday:</p>
          <p>{userData.dob}</p>
        </div>
      </div>

    </div>
  )
}

export default MyProfile  