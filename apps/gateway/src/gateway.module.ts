import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common'
import { GatewayController } from './gateway.controller'
import { GatewayService } from './gateway.service'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { JwtAuthModule } from '@app/jwt-auth'
import { JwtMiddleware } from './jwt-auth/jwt-auth.middleware'

@Module({
  imports: [
    ClientsModule.register([
      { name: 'PROJECT_SERVICE', transport: Transport.TCP },
      {
        name: 'USER_SERVICE',
        transport: Transport.TCP,
        options: { port: 3002 },
      },
    ]),
    JwtAuthModule,
  ],
  controllers: [GatewayController],
  providers: [GatewayService],
})
export class GatewayModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes({ path: 'api/projects', method: RequestMethod.ALL })
  }
}
