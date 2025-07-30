import { useState } from 'react'
import { Formik, Form, ErrorMessage, Field, type FormikHelpers } from 'formik'
import { EyeClosed, EyeIcon } from 'lucide-react'
import { AuthButton } from '../components/AuthButton'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { axiosClient } from '../utils/AxiosClient'
import { useMainContext } from '../context/mainContext'
type FormValues = {
    email: string
    password: string
}
export const LoginPage = () => {
    const { setUser } = useMainContext()
    const navg = useNavigate()
    const [isHide, setIsHide] = useState(true)
    const [loading, setLoading] = useState(false)
    const validationSchema = yup.object({
        email: yup.string().email('Invalid email').required('Email is required'),
        password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    })

    const initialValues: FormValues = {
        email: '',
        password: '',
    }

    const onSubmitHandler = async (values: FormValues, helpers: FormikHelpers<FormValues>) => {
        try {
            setLoading(true)
            const resp = await axiosClient.post('/auth/login', values)
            const { accessToken } = resp.data.token
            const userData = resp.data.userData
            localStorage.setItem('accessToken', accessToken)
            localStorage.setItem('userData', JSON.stringify(resp.data.userData))
            setUser(userData)
            toast.success(resp?.data?.message || 'User logged in successfully')
            navg('/')
            helpers.resetForm()
        } catch (error: any) {
            console.log(error?.response?.data?.message || "Error in Login")
            toast.error(error?.response?.data?.message || "Error in Login")
        } finally {
            setLoading(false)
        }
    }
    return (
        <>

            <div className="min-h-screen flex justify-center items-center w-full ">
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmitHandler}>
                    <Form className='w-[96%] md:w-1/2 xl:w-1/3 bg-white transition-all duration-300 hover:shadow-md p-10 rounded-md border-primary border cursor-pointer'>

                        {/* --------- Email ---------- */}
                        <div className='mb-3'>
                            <label htmlFor="email">Email <span className='text-red-500'>*</span></label>
                            <Field type="text" name="email" id="email" placeholder='Enter Your Email' className='outline-none w-full p-3 border border-primary rounded-md text-tertiary' />
                            <ErrorMessage name="email" component="div" className='text-red-500 text-xs mt-1' />
                        </div>

                        {/* --------- Password ---------- */}
                        <div className='mb-3'>
                            <label htmlFor="password">Password <span className='text-red-500'>*</span></label>
                            <div className='flex items-center px-2 border border-primary rounded-md'>
                                <Field type={isHide ? 'password' : 'text'} name="password" id="password" placeholder='Enter Your Password' className='outline-none w-full p-3 text-tertiary bg-transparent' />
                                {
                                    isHide ? (
                                        <EyeIcon onClick={() => setIsHide(!isHide)} />
                                    ) : (
                                        <EyeClosed onClick={() => setIsHide(!isHide)} />
                                    )
                                }
                            </div>
                            <ErrorMessage name="password" component="div" className='text-red-500 text-xs mt-1' />
                        </div>
                        <div className='mb-3'>
                            <AuthButton text='Register' loading={loading} className />
                        </div>
                        <div className='mb-3'>
                            <p className='text-end capitalize'>Don&apos;t have an account?
                                <Link to="/register" className='font-semibold poppins-medium text-accent'> Register</Link>
                            </p>
                        </div>
                    </Form>
                </Formik>
            </div>
        </>
    )
}
