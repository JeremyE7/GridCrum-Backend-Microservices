import { Controller } from '@nestjs/common'
import { ProjectService } from './project.service'
import { Item } from '@prisma/client'
import { MessagePattern } from '@nestjs/microservices'

@Controller()
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @MessagePattern('get_all_projects')
  async getAllProjects(): Promise<
    { msg: string; projects: Item[] } | { msg: string; error: any }
  > {
    return await this.projectService.getAllProejcts()
  }
}
