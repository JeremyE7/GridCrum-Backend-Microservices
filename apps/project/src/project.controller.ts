import { Controller } from '@nestjs/common'
import { ProjectService } from './project.service'
import { Project, ProjectTag } from '@prisma/client'
import { MessagePattern } from '@nestjs/microservices'
import { ProjectTagDto, createProjectDto } from './dto/project_schemas'

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
    return await this.projectService.getAllUserProjects(userId)
  }

  @MessagePattern('create_project')
  async createProject(project: createProjectDto): Promise<{ msg: string; project: Project; error?: string }> {
    console.log('create_project', project)
    return await this.projectService.createProject(project)
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
}
