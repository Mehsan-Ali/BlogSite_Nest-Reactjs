// MainContextProvider.tsx
import React, { createContext, useContext, useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

interface UserType {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

interface MainContextType {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  LogoutHandler: () => void;
}

const MainContext = createContext<MainContextType>({
  user: null,
  setUser: () => { },
  loading: false,
  setLoading: () => { },
  LogoutHandler: () => { },
})

export const useMainContext = () => useContext(MainContext)

interface Props {
  children: ReactNode
}

const MainContextProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<UserType | null>(null)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const LogoutHandler = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('userData')
    setUser(null)
    navigate('/login')
    toast.success('Logged out successfully')
  }

  return (
    <MainContext.Provider value={{ user, setUser, loading, setLoading, LogoutHandler }}>
      {children}
    </MainContext.Provider>
  )
}

export default MainContextProvider