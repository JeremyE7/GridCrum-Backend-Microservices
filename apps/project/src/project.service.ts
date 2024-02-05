import { PrismaService } from '@app/prisma'
import { Injectable } from '@nestjs/common'
import { Item } from '@prisma/client'

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  async getAllProejcts(): Promise<
    { msg: string; projects: Item[] } | { msg: string; error: any }
  > {
    try {
      const projects = await this.prisma.item.findMany({
        where: {
          type: {
            name: 'project',
          },
        },
      })
      return { msg: 'Solicitud exitosa', projects }
    } catch (error) {
      return { msg: 'Error en la solicitud', error: error.errors }
    }
  }
}
