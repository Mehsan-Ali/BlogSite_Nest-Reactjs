import { useContext } from 'react'
import { BlogCard } from '../components/BlogCard'
import { useMainContext } from '../context/mainContext'

export const HomePage = () => {
	const { user } = useMainContext()
	return (
		<>
			<h1 className='text-3xl lg:text-4xl text-black font-bold text-center'>{user?.name}</h1>
			<div className='grid py-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full px-8'>
				{
					Array.from({ length: 8 }).map((_, index) => (
						<BlogCard key={index} />
					))
				}
			</div>
		</>
	)
}
