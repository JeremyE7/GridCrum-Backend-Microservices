import { NestFactory } from '@nestjs/core'
import { UserModule } from './user.module'
import {
  MicroserviceOptions,
  RpcException,
  Transport,
} from '@nestjs/microservices'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UserModule,
    {
      transport: Transport.TCP,
      options: {
        port: 3002,
      },
    },
  )
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory(errors) {
        const errorMessage = `Error de validación`
        const errorsArray = errors.map((error) => {
          return Object.values(error.constraints)
        })
        throw new RpcException({
          message: errorMessage,
          errors: errorsArray,
        })
      },
    }),
  )
  await app.listen().then(() => {
    console.log('Microservice user is listening')
  })
}
bootstrap()
