import { NestFactory } from '@nestjs/core'
import { ProjectModule } from './project.module'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ProjectModule,
    {
      transport: Transport.TCP,
    },
  )
  await app.listen().then(() => {
    console.log('Microservice projects is listening')
  })
}
bootstrap()
