import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
    const [adminToken, setAdminToken] = useState(
        localStorage.getItem("adminToken") ? localStorage.getItem("adminToken") : ""
    );
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [doctors, setDoctors] = useState([])
    //, get all doctors 
    const getAllDoctors = async () => {
        const { data } = await axios.get(`${backendUrl}/api/admin/all-doctors`)
        setDoctors(data.doctors)
        console.log(data.doctors);
    }

    //, change availability 
    const changeAvailability = async (docId) => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/admin/change-availability`, { docId }, { headers: { adminToken } })

            if (data.success) {
                toast.success(data.message)
                getAllDoctors()
            }


        } catch (error) {
            toast.error(error.message)
            res.json({ success: false, message: "failed" })
        }
    }

    const value = {
        adminToken,
        setAdminToken,
        backendUrl,
        doctors,
        getAllDoctors,
        changeAvailability
    };

    return (
        <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
    );
};

export default AdminContextProvider;
