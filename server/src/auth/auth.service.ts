import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { User } from './schemas/user.schema'
import { Model } from 'mongoose'
import { LoginUserDto, RegisterUserDto } from './dtos/auth.dto'
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor (
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtSecret: JwtService,
  ) {}

  // -------- Signup --------
  async registerUser (userData: RegisterUserDto) {
    const existUser = await this.userModel.findOne({ email: userData.email })
    if (existUser) {
      throw new BadRequestException('User already exists')
    }
    const user = await this.userModel.create(userData)
    return { user, message: 'User created successfully' }
  }

  // -------- Login --------
  async loginUser (userData: LoginUserDto) {
    const { email, password } = userData
    const existUser = await this.userModel.findOne({ email })
    if (!existUser) {
      throw new BadRequestException('User not found')
    }
    const isPasswordMatch = await bcrypt.compare(password, existUser.password)
    if (!isPasswordMatch) {
      throw new BadRequestException('Invalid credentials')
    }
    const { password: hashedPassword, ...userDta } = existUser.toObject()
    const token = await this.generateJWT(existUser._id)
    return { userData: userDta, token, message: 'Login successful' }
  }

  // generate JWT Token
  async generateJWT (userId) {
    const accessToken = await this.jwtSecret.sign(
      { userId },
      { expiresIn: '1d' },
    )
    return { accessToken }
  }

  async findUserById (userId) {
    const user = await this.userModel.findById(userId)
    return user
  }
}
