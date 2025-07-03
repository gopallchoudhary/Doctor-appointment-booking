import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify";


export const DoctorContext = createContext()

const DoctorContextProvider = ({ children }) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [doctors, setDoctors] = useState([])
    const [token, setToken] = useState(localStorage.getItem("userToken") ? localStorage.getItem("userToken") : false)
    const [userData, setUserData] = useState(false)
    const currencySymbol = '$'


    //. get doctors data 
    const getDoctorsData = async (req, res) => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/doctor/list`)


            if (data.success) {
                setDoctors(data.doctors)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log("error: ", error.message);
            toast.error(error.message)
            res.json({ success: false, message: "failed to get the data" })

        }
    }

    //. load userProfile 
    const loadUserProfileData = async (req, res) => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/user/get-profile`, { headers: { token }, withCredentials: true },)


            if (data.success) {
                setUserData(data.userData)
            } else {
                toast.error(data.message)

            }
        } catch (error) {
            console.log(error.message);
            toast.error(error.message)
        }
    }

    //. values 
    const value = {
        currencySymbol,
        doctors,
        token, setToken,
        backendUrl,
        userData, setUserData,
        loadUserProfileData,
        getDoctorsData
    }

    useEffect(() => {
        getDoctorsData()
    }, [])


    useEffect(() => {
        loadUserProfileData()
    }, [token])

    return (
        <DoctorContext.Provider value={value}>
            {children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider