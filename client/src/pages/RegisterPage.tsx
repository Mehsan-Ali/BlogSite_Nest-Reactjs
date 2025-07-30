import React, { useState } from 'react'
import * as yup from 'yup'
import { Formik, Form, ErrorMessage, Field } from 'formik'
import { EyeClosed, EyeIcon } from 'lucide-react'
import { AuthButton } from '../components/AuthButton'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

export const RegisterPage = () => {
	const [isHide, setIsHide] = useState(true)
	const [loading, setLoading] = useState(false)
	const validationSchema = yup.object({
		name: yup.string().required('Name is required'),
		email: yup.string().email('Invalid email').required('Email is required'),
		password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
	})
	const initialValues = {
		name: '',
		email: '',
		password: '',
	}

	const onSubmitHandler = async (values, helpers) => {
		try {
			toast.success('User created successfully')
			helpers.resetForm()
		} catch (error: any) {
			toast.error(error?.data?.message)
		}
	}
	return (
		<>
			<div className="min-h-screen flex justify-center items-center w-full ">
				<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmitHandler}>
					<Form className='w-[96%] md:w-1/2 xl:w-1/3 bg-white transition-all duration-300 hover:shadow-md p-10 rounded-md border-primary border cursor-pointer'>
						{/* --------- Name ---------- */}
						<div className='mb-3'>
							<label htmlFor="name">Name <span className='text-red-500'>*</span></label>
							<Field type="text" name="name" id="name" placeholder='Enter Your Name' className='outline-none w-full p-3 border border-primary rounded-md text-tertiary' />
							<ErrorMessage name="name" component="div" className='text-red-500 text-xs mt-1' />
						</div>

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
							<p className='text-end capitalize'>Already have an account?
								<Link to="/login" className='font-semibold poppins-medium text-accent'> Login</Link>
							</p>
						</div>
					</Form>
				</Formik>
			</div>
		</>
	)
}
