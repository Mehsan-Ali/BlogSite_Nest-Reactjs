import { useParams } from "react-router"
import { BlogArticle } from "../components/BlogArticle"
import { axiosClient } from "../utils/AxiosClient"
import { useEffect, useState } from "react"

export const BlogPage = () => {
    const [blog, setBlog] = useState<any | null>(null)
    const slug = useParams().slug
    const fetchBlog = async () => {
        try {
            const resp = await axiosClient.get(`/blog/get/${slug}`)
            const data = resp.data
            setBlog(data.blog)
            console.log(data.blog)
        } catch (error: any) {
            console.log(error)
        }
    }
    useEffect(() => {
        if (slug) {
            fetchBlog()
        }
    }, [slug])
    return (
        <>
            <div className='px-3 lg:px-20'>
                <div className='relative mx-auto shadow-md m-2.5 h-96 overflow-hidden text-white rounded-md object-center '>
                    <img src={blog?.image} alt="card-image" className='transition-all duration-300 hover:scale-110 object-cover w-full h-full' />
                </div>
                <div className='poppins-bold space-y-5 py-5'>
                    <h1 className='text-4xl sm:text-5xl capitalize text-tertiary'>{blog?.title}</h1>
                    <h3 className='text-lg sm:text-xl capitalize'>Posted by: {blog?.user?.name} &nbsp; <span className='text-accent'>{blog?.createdAt.split('T')[0]}</span></h3>
                    <p className="text-justify poppins-regular">{blog?.content}</p>
                </div>
            </div>
        </>
    )
}