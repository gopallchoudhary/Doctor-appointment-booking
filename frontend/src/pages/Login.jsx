import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../context/DoctorsContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'


const Login = () => {
  const [state, setState] = useState("Sign up")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { backendUrl, token, setToken } = useContext(DoctorContext)
  const navigate = useNavigate()

  const submintHandler = async (e) => {
    e.preventDefault()

    try {

      if (state === "Sign up") {
        const { data } = await axios.post(`${backendUrl}/api/user/signup`, { name, email, password })
        alert(data.message)
      } else {
        const { data } = await axios.post(`${backendUrl}/api/user/signin`, { email, password }, { withCredentials: true })

        if (data.success) {
          localStorage.setItem("userToken", data?.userToken)
          setToken(data?.userToken)
          toast.success(data.message)
        } else {
          toast.error(data.message)
        }

      }
    } catch (error) {
      toast.error(error.message)
    }



    // setName("")
    // setEmail("")
    // setPassword("")
  }

  useEffect(() => {
    if (token) {
      navigate("/")
    }
  }, [token])

  return (
    <form onSubmit={submintHandler} className='min-h-[80vh] flex items-center'>

      <div className='flex flex-col items-start m-auto gap-3  border border-zinc-300 min-[340px] sm:min-w-96 rounded-lg shadow-lg p-8 text-sm text-gray-500'>
        <p className='text-2xl font-semibold text-gray-600'>{state === "Sign up" ? "Create Account" : "Login"}</p>
        <p>{state === "Sign up" ? "Please sign up to book appointment" : "Please log in to book appointment"}</p>

        {
          state === "Sign up" && <div className='w-full'>
            <p>Full Name</p>
            <input className='w-full border border-zinc-300 p-2 mt-1 rounded-md' type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
        }

        <div className='w-full'>
          <p>Email</p>
          <input className='w-full border border-zinc-300 p-2 mt-1 rounded-md' type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className='w-full'>
          <p>Password</p>
          <input className='w-full border border-zinc-300 p-2 mt-1 rounded-md' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <button type='submit' className='bg-primary text-white rounded-md  py-2 my-2 text-base w-full'>{state === "Sign up" ? "Create Account" : "Login"}</button>

        {
          state === "Sign up"
            ? <p>Already have an account? <span onClick={(e) => setState("Login")} className='text-primary underline hover:cursor-pointer'>Login Here</span></p>
            : <p>Create an new account? <span onClick={(e) => setState("Sign up")} className='text-primary underline hover:cursor-pointer'>Click Here</span></p>
        }

      </div>
    </form>
  )
}

export default Login