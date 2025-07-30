import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Blog } from './schema/blog.schema'
import { BlogIdDTO, CreateBlogDto } from './dtos/blog.dto'

@Injectable()
export class BlogService {
  constructor (@InjectModel(Blog.name) private blogModel: Model<Blog>) {}

  // -------- create blog --------
  async createBlog (user: string, blogData: CreateBlogDto) {
    const tags = blogData.tags.split(',').map(tag => tag.trim())
    const newBlog = await this.blogModel.create({
      tags: tags,
      user: user,
      title: blogData.title,
      content: blogData.content,
      image: blogData.image,
    })
    return { message: 'Blog created successfully', blog: newBlog }
  }

  // -------- get all blog --------

  async getAllBlogs () {
    const blogs = await this.blogModel.find({})
    return { blogs }
  }

  // -------- get blog by ID --------
  async getBlogById (data: BlogIdDTO) {
    const blog = await this.blogModel
      .findOne({
        slug: new RegExp(data.slug, 'i'),
        isPublic: true,
      })
      .select('-_id -updatedAt -isPublic')
      .populate('user', 'name -_id')
    if (!blog) {
      throw new NotFoundException('Blog Not Found')
    }
    return { blog }
  }
}
