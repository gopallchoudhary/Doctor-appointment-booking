import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DoctorContext } from "../context/DoctorsContext";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useEffect } from "react";

const MyAppointment = () => {
  const navigate = useNavigate()
  const { backendUrl, token, getDoctorsData } = useContext(DoctorContext);
  const [appointments, setAppointments] = useState([]);
  const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  //, date formate
  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("-");

    return `${dateArray[0]} ${months[Number(dateArray[1])]} ${dateArray[2]}`;
  };

  //, get appointments
  const getAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
        withCredentials: true,
      });
      if (data.success) {
        setAppointments(data.appointments.reverse());
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  //, cancel appointmetns
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/cancel-appointment`,
        { appointmentId },
        { headers: { token }, withCredentials: true }
      );

      if (data.success) {
        toast.success(data.message);
        getAppointments();
        getDoctorsData();
      }
    } catch (error) {
      console.log("fe error: ", error);
      toast.error(error.message);
    }
  };

  //, razorpay 

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Appointment Payment",
      description: "Appointment Payment",
      order_id: order.id,
      receipt: order.receipt,

      handler: async (response) => {
        console.log(response);

        try {
          const { data } = await axios.post(`${backendUrl}/api/user/verify-razorpay`, response, { headers: { token }, withCredentials: true })

          if (data.success) {
            getAppointments()
            navigate("/my-appointments")
          }
        } catch (error) {
          console.error(error);
          toast.error(error.message)
        }
      }
    }

    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/payment-razorpay`,
        { appointmentId },
        { headers: { token }, withCredentials: true }
      );

      if (data.success) {
        initPay(data.order)

      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  return (
    <div>
      <p className="pb-3 font-medium text-zinc-700 border-b mt-12">
        My Appointments
      </p>
      <div>
        {appointments.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
          >
            <div>
              <img
                className="w-32 bg-indigo-50"
                src={item.docData?.image}
                alt=""
              />
            </div>
            <div className="flex-1 text-sm text-zinc-600">
              <p className="font-semibold  text-neutral-800">
                {item.docData?.name}
              </p>
              <p>{item.docData?.speciality}</p>
              <p className="text-zinc-700 font-medium mt-2 mb-1">Address:</p>
              <p className="text-xs">{item.docData?.address?.line1}</p>
              <p className="text-xs">{item.docData?.address?.line2}</p>
              <p className="my-2 text-neutral-700 font-medium">
                Date & Time:{" "}
                <span className="text-gray-500 font-normal">
                  {" "}
                  {slotDateFormat(item.slotDate)} | {item.slotTime}
                </span>
              </p>
            </div>
            <div></div>
            <div className="flex flex-col gap-4 items-center justify-end mb-2 text-stone-500 text-sm">
              {!item.cancelled && item.payment && (<button className="px-6 sm:min-w-48 border py-2 bg-primary text-white rounded-sm">Paid</button>)}
              {!item.cancelled && !item.payment && (
                <button
                  onClick={() => appointmentRazorpay(item._id)}
                  className=" sm:min-w-48 px-6 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300"
                >
                  Pay Here
                </button>
              )}
              {!item.cancelled && (
                <button
                  onClick={() => cancelAppointment(item._id)}
                  className="border sm:min-w-48 rounded  px-6 py-2 hover:bg-red-600 hover:text-white transition-all duration-300"
                >
                  Cancel Appointment
                </button>
              )}
              {item.cancelled && (
                <h1 className="my-auto text-red-600">Appointment Cancelled</h1>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointment;
