import { NestFactory } from '@nestjs/core'
import { ProjectModule } from './project.module'
import { MicroserviceOptions, RpcException, Transport } from '@nestjs/microservices'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(ProjectModule, {
    transport: Transport.TCP,
  })
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
    console.log('Microservice projects is listening')
  })
}
bootstrap()
