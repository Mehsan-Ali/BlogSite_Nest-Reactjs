import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { User } from './schemas/user.schema'
import { Model } from 'mongoose'
import { RegisterUserDto } from './dtos/auth.dto'

@Injectable()
export class AuthService {
  constructor (@InjectModel(User.name) private userModel: Model<User>) {}

  // -------- Signup --------  
  async registerUser (userData: RegisterUserDto) {
    const existUser = await this.userModel.findOne({ email: userData.email })
    if(existUser) {
      throw new BadRequestException('User already exists')
    }
    const user = await this.userModel.create(userData)
    return user
  }
}
