import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import DoctorContextProvider from './context/DoctorsContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <DoctorContextProvider>
    <App />
  </DoctorContextProvider>
  </BrowserRouter>
)
