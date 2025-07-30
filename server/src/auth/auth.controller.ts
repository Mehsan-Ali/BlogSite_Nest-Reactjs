import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginUserDto, RegisterUserDto } from './dtos/auth.dto'
import { AuthGuard } from './auth.guard'

@Controller('/api/v1/auth')
export class AuthController {
  constructor (private readonly authService: AuthService) {}

  @Post('signup')
  async signup (@Body() userData: RegisterUserDto) {
    const res_Obj = await this.authService.registerUser(userData)
    return res_Obj
  }

  @Post('login')
  async login (@Body() userData: LoginUserDto) {
    const res_Obj = await this.authService.loginUser(userData)
    return res_Obj
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async getcurrentUser (@Req() req) {
    const userId = req['userId']
    const user = await this.authService.findUserById(userId)
    return user
  }
}
