import { BlogArticle } from "../components/BlogArticle"

export const BlogPage = () => {
    return (
        <>
            <div className='px-3 lg:px-20'>
                <div className='relative mx-auto shadow-md m-2.5 h-96 overflow-hidden text-white rounded-md object-center '>
                    <img src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8" alt="card-image" className='transition-all duration-300 hover:scale-110 object-cover w-full h-full' />
                </div>
                <div className='poppins-bold space-y-5 py-5'>
                    <h1 className='text-4xl sm:text-5xl capitalize text-tertiary'>this is sunday</h1>
                    <h3 className='text-lg sm:text-xl'>Posted by: Krishna <span className='text-accent'>{new Date().toDateString()}</span></h3>
                </div>
                <BlogArticle />
            </div>
        </>
    )
}