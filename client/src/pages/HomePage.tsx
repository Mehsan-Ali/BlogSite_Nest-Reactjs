import { BlogCard } from '../components/BlogCard'
import { useMainContext } from '../context/mainContext'

export const HomePage = () => {
	const { blogs } = useMainContext()
	return (
		<>
			<div className='grid py-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full px-8'>
				{blogs?.length ? (
					blogs.map((blog, index) => (
						<BlogCard key={blog._id || index} data={blog} />
					))
				) : (
					<p className="text-center col-span-full text-gray-500">No blogs found.</p>
				)}
			</div>

		</>
	)
}
