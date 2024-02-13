import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common'
import { GatewayService } from './gateway.service'
import { Project, ProjectTag } from '@prisma/client'
import { Request } from 'express'
import { JwtMiddleware } from './jwt-auth/jwt-auth.middleware'

@Controller()
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Get('api/projects')
  @UseGuards(JwtMiddleware)
  getAllProjects(): Promise<Project[]> {
    return this.gatewayService.getAllProjects()
  }

  @Get('api/projects/user/:userId')
  @UseGuards(JwtMiddleware)
  getAllUserProjects(
    @Param('userId') userId: number,
  ): Promise<{ msg: string; projects: Project[] } | { msg: string; error: any }> {
    return this.gatewayService.getAllUserProjects(userId)
  }

  @Get('api/projects/tag/:userId')
  @UseGuards(JwtMiddleware)
  getAllUserProjectTags(
    @Param('userId') userId: string,
  ): Promise<{ msg: string; tags: ProjectTag[] } | { msg: string; error: any }> {
    return this.gatewayService.getAllUserProjectTags(userId)
  }

  @Post('api/projects')
  createProject(@Body() req: Request) {
    return this.gatewayService.createProject(req)
  }

  @Post('api/projects/tag/:userId')
  createTagProject(@Body() req: Request, @Param('userId') userId: number) {
    console.log(req)
    return this.gatewayService.createTagProject(req, userId)
  }

  @Delete('api/projects/tag/:tagId')
  deleteTagProject(@Param('tagId') tagId: string) {
    return this.gatewayService.deleteTagProject(tagId)
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
