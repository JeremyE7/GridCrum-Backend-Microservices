import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { PrismaModule } from '@app/prisma'
import { JwtAuthModule } from '@app/jwt-auth'

@Module({
  imports: [PrismaModule, JwtAuthModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
