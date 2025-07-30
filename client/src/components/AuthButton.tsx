import { ArrowRight, LoaderCircle } from 'lucide-react'
import React from 'react'

export const AuthButton = ({ loading, text, className, ...props }: any) => {
    return (
        <>
            <button disabled={loading} {...props} className={`w-full flex items-center justify-center gap-x-2 text-white disabled:bg-accent-diabled bg-accent py-2 rounded-md cursor-pointer ${className}`}>
                <span>{text}</span>
                {
                    loading ? <LoaderCircle className='animate-spin'/> : <ArrowRight size={20} />
                }
            </button>
        </>
    )
}
