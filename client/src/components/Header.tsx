import { ArrowRightCircle } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import { useMainContext } from '../context/maincontext'

export const Header = () => {
    const { LogoutHandler, user } = useMainContext()
    return (
        <div className='py-8 px-10 bg-black flex justify-between text-white'>
            <div className='flex items-center gap-x-2'>
                <Link to={'/'}>
                    <h1 className='text-3xl font-bold'>Blog <span className='bg-accent py-1 px-2 rounded-xs shadow-md'>App</span></h1>
                </Link>
            </div>
            <ul className='flex justify-center gap-5 items-center'>
                {
                    user ? (
                        <>
                            <li className='cursor-pointer transition-all duration-150 py-1 hover:scale-105'>
                                <Link to={'/create-blog'}>
                                    Create
                                </Link>
                            </li>
                            <button onClick={LogoutHandler} className='cursor-pointer'>
                                <ArrowRightCircle />
                            </button>
                        </>
                    ) : (
                        <li className='cursor-pointer transition-all duration-150 py-1 hover:scale-105'>
                            <Link to={'/login'}>
                                Login
                            </Link>
                        </li>
                    )
                }
            </ul >
        </div >
    )
}
