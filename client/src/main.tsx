import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className='bg-[#f5f5f5] min-h-screen text-tertiary'>
    <App />
    </div>
  </StrictMode>,
)
