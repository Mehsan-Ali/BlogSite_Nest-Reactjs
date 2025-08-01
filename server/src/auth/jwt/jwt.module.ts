import { Global, Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [JwtModule],
})
export class JwtGlobalModule {}