import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
// import { config } from 'dotenv'
// config({
//   path: '.env',
// })
async function bootstrap () {
  const app = await NestFactory.create(AppModule)
  const port = process.env.PORT ?? 3000
  app.useGlobalPipes(new ValidationPipe())
  app.enableCors()
  await app.listen(port, () =>
    console.log(`Server running on port http://localhost:${port}`),
  )
}
bootstrap()
