import { Module } from '@nestjs/common'
import { ProjectController } from './project.controller'
import { ProjectService } from './project.service'
import { PrismaModule } from '@app/prisma'
import { JwtAuthModule } from '@app/jwt-auth'

@Module({
  imports: [PrismaModule, JwtAuthModule],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
