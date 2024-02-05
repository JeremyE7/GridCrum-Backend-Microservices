import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { GatewayService } from './gateway.service'
import { Item } from '@prisma/client'
import { Request } from 'express'
import { JwtMiddleware } from './jwt-auth/jwt-auth.middleware'

@Controller()
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Get('api/projects')
  @UseGuards(JwtMiddleware)
  getAllProjects(): Promise<Item[]> {
    return this.gatewayService.getAllProjects()
  }

  @Post('api/user')
  registerUser(@Body() req: Request) {
    return this.gatewayService.registerUser(req)
  }

  @Post('api/user/login')
  loginUser(@Body() req: Request) {
    return this.gatewayService.loginUser(req)
  }
}
