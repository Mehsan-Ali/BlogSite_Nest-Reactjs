import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common'
import { BlogService } from './blog.service'
import { AuthGuard } from 'src/auth/auth.guard'
import { BlogIdDTO, CreateBlogDto } from './dtos/blog.dto'

@Controller('/api/v1/blog')
export class BlogController {
  constructor (private readonly blogService: BlogService) {}

  @Post('create')
  @UseGuards(AuthGuard)
  async createBlog (@Request() req, @Body() blogData: CreateBlogDto) {
    return await this.blogService.createBlog(req.userId, blogData)
  }

  @Get('get-blogs')
  async getAllBlogs () {
    const Blogs = await this.blogService.getAllBlogs()
    return Blogs
  }

  @Get('get/:slug')
  async getBlogById (@Param() data:BlogIdDTO) {
    const res = await this.blogService.getBlogById(data)
    return res
  }
}
