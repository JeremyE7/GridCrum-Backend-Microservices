import { Controller } from '@nestjs/common'
import { ProjectService } from './project.service'
import { Project } from '@prisma/client'
import { MessagePattern } from '@nestjs/microservices'
import { createProjectDto } from './dto/project_schemas'

@Controller()
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @MessagePattern('get_all_projects')
  async getAllProjects(): Promise<{ msg: string; projects: Project[] } | { msg: string; error: any }> {
    return await this.projectService.getAllProejcts()
  }

  @MessagePattern('create_project')
  async createProject(project: createProjectDto): Promise<{ msg: string; project: Project; error?: string }> {
    return await this.projectService.createProject(project)
  }
}
