import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './css/poppins.css'
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <div className='bg-[#f5f5f5] min-h-screen poppins-regular text-tertiary'>
        <ToastContainer />
        <App />
      </div>
    </BrowserRouter>
  </StrictMode>,
)
