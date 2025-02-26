import { createContext } from "react";
import { doctors } from "../assets/assets";

export const DoctorContext = createContext()

const DoctorContextProvider = ({ children }) => {
    const currencySymbol = '$'
    const value = {
        doctors,
        currencySymbol
    }

    return (
        <DoctorContext.Provider value={{ doctors, currencySymbol }}>
            {children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider