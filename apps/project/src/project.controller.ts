import { Controller } from '@nestjs/common'
import { ProjectService } from './project.service'
import { Item, Project, ProjectTag, Spring } from '@prisma/client'
import { MessagePattern } from '@nestjs/microservices'
import { CreateItemDTO, CreateTaskDTO, ProjectTagDto, SpringDto, createProjectDto } from './dto/project_schemas'

@Controller()
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @MessagePattern('get_all_projects')
  async getAllProjects(): Promise<{ msg: string; projects: Project[] } | { msg: string; error: any }> {
    return await this.projectService.getAllProejcts()
  }

  @MessagePattern('get_all_user_project_tags')
  async getAllUserProjectTags(
    userId: string,
  ): Promise<{ msg: string; tags: ProjectTag[] } | { msg: string; error: any }> {
    return await this.projectService.getAllUserProjectTags(userId)
  }

  @MessagePattern('get_all_user_projects')
  async getAllUserProjects(
    userId: string,
  ): Promise<{ msg: string; projects: Project[] } | { msg: string; error: any }> {
    console.log('obteniendo proyectos')

    return await this.projectService.getAllUserProjects(userId)
  }

  @MessagePattern('create_project')
  async createProject(req: {
    project: createProjectDto
    userId: string
  }): Promise<{ msg: string; project: Project; error?: string }> {
    console.log('create_project', req.project, req.userId)
    return await this.projectService.createProject(req.project, req.userId)
  }

  @MessagePattern('update_projects')
  async updateProjects(req: {
    projects: (Project & { tags: ProjectTag[] })[]
    userId: string
  }): Promise<{ msg: string; projects: Project[]; error?: string }> {
    console.log('update_projects', req.projects, req.userId)

    return await this.projectService.updateUserProjects(req.projects, req.userId)
  }

  @MessagePattern('create_tag_project')
  async createTagProject({
    tag,
    userId,
  }: {
    tag: ProjectTagDto
    userId: string
  }): Promise<{ msg: string; tag: ProjectTag; error?: string }> {
    return await this.projectService.createTagProject(tag, userId)
  }

  @MessagePattern('delete_tag_project')
  async deleteTagProject(tagId: string): Promise<{ msg: string; tag: ProjectTag; error?: string }> {
    return await this.projectService.deleteTagProject(tagId)
  }

  @MessagePattern('create_spring')
  async createSpring(req: SpringDto): Promise<{ msg: string; spring: Spring }> {
    console.log(req)

    return await this.projectService.createSpring({
      ...req,
      proyectId: Number(req.proyectId),
      startDate: new Date(req.startDate),
      endDate: new Date(req.endDate),
    })
  }

  @MessagePattern('create_task')
  async createTask(req: CreateTaskDTO): Promise<{ msg: string; task: any }> {
    console.log(req)

    return await this.projectService.createTask(req)
  }

  @MessagePattern('create_item')
  async createItem(req: CreateItemDTO): Promise<{ msg: string; item: any }> {
    console.log(req)

    return await this.projectService.createItem(req)
  }

  @MessagePattern('update_item')
  async updateItem(req: Item[]): Promise<{ msg: string; items: Item[] }> {
    console.log(req)
    return await this.projectService.updateItems(req)
  }
}
