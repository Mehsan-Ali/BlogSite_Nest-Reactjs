import { IsNotEmpty, IsUrl } from "class-validator"

export class CreateBlogDto {
    @IsNotEmpty({ message: 'Title is required' })
    title: string
    @IsNotEmpty({ message: 'Content is required' })
    content: string
    @IsNotEmpty({ message: 'Tags is required' })
    tags: string
    @IsNotEmpty({ message: 'Image is required' })
    @IsUrl()
    image: string
}


export class BlogIdDTO{
    @IsNotEmpty({message:"Slug is Required"})
    slug: string 
}