import { BlogCard } from '../components/BlogCard'

export const HomePage = () => {
	return (
		<>
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
