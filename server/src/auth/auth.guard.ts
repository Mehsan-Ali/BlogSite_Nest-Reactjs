import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express'
import { JwtService } from '@nestjs/jwt'


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(request)
    if (!token) throw new UnauthorizedException('Invalid Token')

    try {
      const payload = this.jwtService.verify(token)
      request['userId'] = payload.userId
    } catch (error) {
      Logger.error(error.message)
      throw new UnauthorizedException('Invalid Token')
    }
    return true;
  }
  private extractTokenFromHeader (request: Request): string | undefined {
    return request.headers.authorization?.split(' ')[1]
  }
}
