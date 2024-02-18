import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common'
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
    console.log('obteniendo proyectos')

    return this.gatewayService.getAllUserProjects(userId)
  }

  @Get('api/projects/tag/:userId')
  @UseGuards(JwtMiddleware)
  getAllUserProjectTags(
    @Param('userId') userId: string,
  ): Promise<{ msg: string; tags: ProjectTag[] } | { msg: string; error: any }> {
    return this.gatewayService.getAllUserProjectTags(userId)
  }

  @Post('api/projects/:userId')
  createProject(@Body() req: Request, @Param('userId') userId: string) {
    console.log(req, userId)
    console.log('creando proyecto')

    return this.gatewayService.createProject(req, userId)
  }

  @Put('api/projects/:userId')
  updateProjects(@Body() req: Request, @Param('userId') userId: string) {
    return this.gatewayService.updateProjects(req, userId)
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

  @Post('api/user/validate')
  validateToken(@Req() req: Request) {
    console.log(req.headers.authorization)

    return this.gatewayService.validateToken(req.headers.authorization)
  }

  @Post('api/project/spring')
  createSpring(@Body() req: Request) {
    console.log('creando spring')
    return this.gatewayService.createSpring(req)
  }

  @Post('api/project/spring/task')
  createTask(@Body() req: Request) {
    console.log('creando tarea')
    return this.gatewayService.createTask(req)
  }

  @Post('api/project/spring/task/item')
  createTaskItem(@Body() req: Request) {
    console.log('creando item')
    return this.gatewayService.createItem(req)
  }

  @Put('api/project/spring/task/item')
  updateTaskItem(@Body() req: Request) {
    console.log('actualizando item')
    return this.gatewayService.updateItems(req)
  }
}
