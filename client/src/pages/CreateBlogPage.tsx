import { Form, Formik, ErrorMessage, Field, type FormikHelpers } from 'formik'
import * as yup from 'yup'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import Editor from '../components/Editor'
import { AuthButton } from '../components/AuthButton'
import { axiosClient } from '../utils/AxiosClient'
import { ReplyAll } from 'lucide-react'
type FormValues = {
	title: string;
	content: string;
	tags: Array<string>;
	image: string;
}
export const CreateBlogPage = () => {
	const [loading, setLoading] = useState(false)
	const initialValues: FormValues = {
		title: '',
		content: '',
		tags: [''],
		image: '',
	}
	const validateSchema = yup.object({
		title: yup.string().required('Title is required'),
		content: yup.string().required('Content is required'),
		tags: yup.string().required('Tags is required'),
		image: yup.string().required('Image is required').url('Invalid URL'),
	})

	const onSubmitHandler = async (values: FormValues, { resetForm }: FormikHelpers<FormValues>) => {
		try {
			const resp = await axiosClient.post('/blog/create', values, {
				headers: {
					'Authorization': `Bearer ${localStorage.getItem('token')}`
				}
			})
			const data = resp.data
			console.log(data)
			toast.success(data.message || 'User created successfully')
			resetForm()
		} catch (error: any) {
			toast.error(error?.data?.message)
			console.log(error)
		}
	}
	return (
		<>
			<div className='py-10 mx-auto'>
				<div className="mb-3">
					<h1 className='text-3xl lg:text-4xl font-bold text-center'>Hi, Your Name <span className="wave">👋</span>
					</h1>
				</div>
				<Formik initialValues={initialValues} validationSchema={validateSchema} onSubmit={onSubmitHandler}>
					{({ handleSubmit, values, setFieldValue }) => (
						<form onSubmit={handleSubmit} className='w-[96%] xl:w-[80%] mx-auto bg-white p-10 rounded-md shadow-2xs'>
							<div className='mb-3'>
								<label htmlFor="title" className='poppins-medium'>Title <span className='text-red-500 text-x s'>*</span></label>
								<Field type="text" name='title' id='title' placeholder='Enter Blog Title' className='border border-gray-300 rounded-md py-2 px-4 bg-transparent outline-none w-full' />
								<ErrorMessage name='title' component={'span'} className='text-red-500 text-xs mt-1' />
							</div>
							<div className='mb-3'>
								<label htmlFor="image" className='poppins-medium'>Image <span className='text-red-500 text-x s'>*</span></label>
								<Field type="text" name='image' id='image' placeholder='Enter Blog Image URL' className='border border-gray-300 rounded-md py-2 px-4 bg-transparent outline-none w-full' />
								<ErrorMessage name='image' component={'span'} className='text-red-500 text-xs mt-1' />
							</div>
							<div className='mb-3'>
								<label htmlFor="tags">Tags <span className='text-red-500 text-x s'>*</span> <span className='text-xs text-gray-500'>
									(separated by comma)</span></label>
								<Field type="text" name='tags' id='tags' placeholder='Enter Your Blog Tags' className='border border-gray-300 rounded-md py-2 px-4 bg-transparent outline-none w-full' />
								<ErrorMessage name='tags' component={'span'} className='text-red-500 text-xs mt-1' />
							</div>

							<div className='mb-3'>
								<label htmlFor="content" className='poppins-medium'>Content <span className='text-red-500 text-x s'>*</span></label>
								<Editor value={values.content} setFieldValue={setFieldValue} />
								<ErrorMessage name='content' component={'span'} className='text-red-500 text-xs mt-1' />
							</div>
							<div>
								<AuthButton text='Create Blog' loading={false} type='submit' />
							</div>
						</form>
					)}
				</Formik>
			</div>
		</>
	)
}