import { Link } from 'react-router'

export const BlogCard = ({ data }: { data: any }) => {
    const id = data.slug
    console.log(data.slug)
    return (
        <Link to={`/blog/${id}`} className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg">
            <div className="relative h-56 m-2.5 overflow-hidden text-white rounded-md object-center">
                <img src={data?.image} alt="card-image" className='w-full h-full object-cover transition-all duration-300 hover:scale-110' />
            </div>
            <div className="p-4">
                <h6 className="mb-2 capitalize text-slate-800 text-xl font-semibold">
                    {data.title}
                </h6>
                <p className="text-slate-600 leading-normal font-light">
                    The place is close to Barceloneta Beach and bus stop just 2 min by walk
                    and near to &quot;Naviglio&quot; where you can enjoy the main night life in
                    Barcelona.
                </p>
            </div>
            <ul className="flex items-center poppins-medium flex-wrap gap-2 m-4">
                {
                    data.tags.map((tags: any) => (
                        <li key={tags.id} className='px-4 py-2 text-sm text-tertiary border border-tertiary rounded-md bg-white/90'>
                            {tags}
                        </li>
                    ))
                }
            </ul>
            <div className="px-4 pb-4 pt-0 mt-2">
                <button className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                    Read more
                </button>
            </div>
        </Link>
    )
}