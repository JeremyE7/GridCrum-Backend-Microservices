import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { Project, ProjectTag, User } from '@prisma/client'
import { lastValueFrom } from 'rxjs'

@Injectable()
export class GatewayService {
  constructor(
    @Inject('PROJECT_SERVICE') private clientProject: ClientProxy,
    @Inject('USER_SERVICE') private clientUser: ClientProxy,
  ) {}

  getAllProjects(): Promise<Project[]> {
    return lastValueFrom(this.clientProject.send('get_all_projects', {}))
  }

  getAllUserProjects(userId: number): Promise<{ msg: string; projects: Project[] } | { msg: string; error: any }> {
    return lastValueFrom(this.clientProject.send('get_all_user_projects', userId))
  }

  getAllUserProjectTags(userId: string): Promise<{ msg: string; tags: ProjectTag[] } | { msg: string; error: any }> {
    return lastValueFrom(this.clientProject.send('get_all_user_project_tags', userId))
  }

  async createProject(req: any): Promise<{ msg: string; project: Project }> {
    try {
      return await lastValueFrom(this.clientProject.send('create_project', req))
    } catch (error) {
      throw new HttpException({ msg: error, project: null }, HttpStatus.BAD_REQUEST)
    }
  }

  async createTagProject(req: any): Promise<{ msg: string; tag: ProjectTag }> {
    try {
      return await lastValueFrom(this.clientProject.send('create_tag_project', req))
    } catch (error) {
      throw new HttpException({ msg: error, tag: null }, HttpStatus.BAD_REQUEST)
    }
  }

  async registerUser(req: any): Promise<{ msg: string; user: User }> {
    try {
      return await lastValueFrom(this.clientUser.send('register_user', req))
    } catch (e) {
      throw new HttpException({ msg: e, user: null }, HttpStatus.BAD_REQUEST)
    }
  }

  async loginUser(req: any): Promise<{ msg: string; user: User; token?: string }> {
    try {
      const userLoged = await lastValueFrom(this.clientUser.send('login_user', req))
      if (!userLoged.user) throw new HttpException({ msg: userLoged.msg, user: null }, HttpStatus.BAD_REQUEST)

      return userLoged
    } catch (e) {
      throw new HttpException({ msg: e, user: null }, HttpStatus.BAD_REQUEST)
    }
  }
}
