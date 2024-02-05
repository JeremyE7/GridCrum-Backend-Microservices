import { NestFactory } from '@nestjs/core'
import { GatewayModule } from './gateway.module'

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule)
  await app.listen(3001, () => {
    console.log('Gateway service is running on http://localhost:3001')
  })
}
bootstrap()
