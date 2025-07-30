import React, { createContext, useContext, useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom' // use `react-router-dom` in web apps
import { toast } from 'react-toastify'

// Define the shape of your context
interface MainContextType {
  user: null
  LogoutHandler: () => void
}

// Provide default value for the context
const MainContext = createContext<MainContextType>({
  user: null,
  LogoutHandler: () => {},
})

// Custom hook for easier consumption
export const useMainContext = () => useContext(MainContext)

// Define props type for the provider
interface Props {
  children: ReactNode
}

const MainContextProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<any>(null) // Replace `any` with a real user type if available
  const navigate = useNavigate()

  const LogoutHandler = () => {
    setUser(null)
    navigate('/login')
    toast.success('Logout successfully')
  }

  return (
    <MainContext.Provider value={{ user, LogoutHandler }}>
      {children}
    </MainContext.Provider>
  )
}

export default MainContextProvider