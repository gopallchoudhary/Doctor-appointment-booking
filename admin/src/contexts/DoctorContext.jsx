import { createContext, useState } from "react";
import { toast } from 'react-toastify'
import axios from 'axios'


export const DoctorContext = createContext()

const DoctorContextProvider = ({ children }) => {
    const backendURL = import.meta.env.VITE_BACKEND_URL;
    const [doctorToken, setDoctorToken] = useState('')
    const [appointments, setAppointments] = useState([])
    const [dashData, setDashData] = useState(false)
    const [profileData, setProfileData] = useState(false)

    //. get appointments 
    const getAppointments = async () => {
        try {
            const { data } = await axios.get(`${backendURL}/api/doctor/appointments`, { withCredentials: true })

            if (data.success) {
                setAppointments(data.appointments.reverse())
                console.log(data.appointments);
            } else {
                toast.error(data.messsage)
            }
        } catch (error) {
            console.log(error.messsage);
            toast.error(error.messsage)
        }
    }

    //. complete appointment 
    const completeAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(`${backendURL}/api/doctor/appointment-completed`, { appointmentId }, { withCredentials: true })

            console.log(data);

            if (data.success) {
                toast.success(data.messsage)
                getAppointments()
            } else {
                toast.error(data.messsage)
            }
        } catch (error) {
            console.error(error);
            toast.error(error.messsage)
        }
    }

    //. cancel appointment 
    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(`${backendURL}/api/doctor/appointment-cancelled`, { appointmentId }, { withCredentials: true })

            if (data.success) {
                toast.success(data.messsage)
                getAppointments()
            } else {
                toast.error(data.messsage)
            }
        } catch (error) {
            console.error(error);
            toast.error(error.messsage)
        }
    }


    //. dashboard data 
    const getDoctorDashboard = async () => {
        try {
            const { data } = await axios.get(`${backendURL}/api/doctor/dashboard`, { withCredentials: true })
            if (data.success) {
                setDashData(data.docData)
                console.log(data.docData);

                toast.success(data.messsage)
            } else {
                toast.error(data.messsage)
            }
        } catch (error) {
            console.error(error.messsage);
            toast.error(error.messsage)
        }
    }

    //. get profile data 
    const getProfileData = async () => {
        try {
            const { data } = await axios.get(`${backendURL}/api/doctor/profile`, { withCredentials: true })
            if (data.success) {
                setProfileData(data.doctorProfileData)

            } else {
                toast.error(data.messsage)
            }
        } catch (error) {
            console.error("Error: ", error.messsage);
            toast.error(error.messsage)
        }
    }


    //, Values 
    const value = {
        doctorToken, setDoctorToken, backendURL,
        appointments, getAppointments,
        completeAppointment, cancelAppointment,
        dashData, setDashData, getDoctorDashboard, getProfileData,
        profileData, setProfileData
    }

    return (
        <DoctorContext.Provider value={value}>
            {children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider