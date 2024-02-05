import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { Item, User } from '@prisma/client'
import { lastValueFrom } from 'rxjs'

@Injectable()
export class GatewayService {
  constructor(
    @Inject('PROJECT_SERVICE') private clientProject: ClientProxy,
    @Inject('USER_SERVICE') private clientUser: ClientProxy,
  ) {}

  getAllProjects(): Promise<Item[]> {
    return lastValueFrom(this.clientProject.send('get_all_projects', {}))
  }

  async registerUser(req: any): Promise<{ msg: string; user: User }> {
    try {
      return await lastValueFrom(this.clientUser.send('register_user', req))
    } catch (e) {
      throw new HttpException({ msg: e, user: null }, HttpStatus.BAD_REQUEST)
    }
  }

  async loginUser(
    req: any,
  ): Promise<{ msg: string; user: User; token?: string }> {
    try {
      const userLoged = await lastValueFrom(
        this.clientUser.send('login_user', req),
      )
      if (!userLoged.user)
        throw new HttpException(
          { msg: userLoged.msg, user: null },
          HttpStatus.BAD_REQUEST,
        )

      return userLoged
    } catch (e) {
      throw new HttpException({ msg: e, user: null }, HttpStatus.BAD_REQUEST)
    }
  }
}
