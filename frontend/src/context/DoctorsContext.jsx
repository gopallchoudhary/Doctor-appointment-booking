import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify";


export const DoctorContext = createContext()

const DoctorContextProvider = ({ children }) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [doctors, setDoctors] = useState([])
    const [token, setToken] = useState(localStorage.getItem("userToken")? localStorage.getItem("userToken") : false)
    const currencySymbol = '$'
    

    //. get doctors data 
    const getDoctorsData = async (req, res) => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/doctor/list`)
            console.log(data.doctors);

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

    //. values 
    const value = {
        currencySymbol,
        doctors,
        token, setToken,
        backendUrl
    }

    useEffect(() => {
        getDoctorsData()
    }, [])

    return (
        <DoctorContext.Provider value={value}>
            {children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider