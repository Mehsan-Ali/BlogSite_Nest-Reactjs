// MainContextProvider.tsx
import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { axiosClient } from '../utils/AxiosClient';

interface UserType {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

interface MainContextType {
  user: UserType | null;
  loading: boolean;
  setUser: (user: UserType | null) => void;
  blogs: Array<any> | null;
  fetchBlogs: () => void;
  setLoading: (loading: boolean) => void;
  LogoutHandler: () => void;
}

const MainContext = createContext<MainContextType>({
  user: null,
  blogs: null,
  setUser: () => { },
  loading: false,
  fetchBlogs: () => { },
  setLoading: () => { },
  LogoutHandler: () => { },
})

export const useMainContext = () => useContext(MainContext)

interface Props {
  children: ReactNode
}

const MainContextProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<UserType | null>(null)
  const [blogs, setBlogs] = useState<any | null>(null)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token") || ''
      if (!token) return
      const response = await axiosClient.get("/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const data = await response.data;
      setUser(data)
      console.log(data)
    } catch (error) {
      navigate("/login")
    }
  }
  const fetchBlogs = async () => {
    try {
      const resp = await axiosClient.get('/blog/get-blogs')
      const data = await resp.data
      setBlogs(data.blogs)
      console.log(data)
    } catch (error: any) {
      console.log(error)
    }
  }
  const LogoutHandler = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userData')
    setUser(null)
    navigate('/login')
    toast.success('Logged out successfully')
  }
  useEffect(() => {
    fetchBlogs()
    fetchProfile()
  }, [])
  return (
    <MainContext.Provider value={{ user, setUser,loading, setLoading, LogoutHandler, fetchBlogs, blogs }}>
      {children}
    </MainContext.Provider>
  )
}

export default MainContextProvider