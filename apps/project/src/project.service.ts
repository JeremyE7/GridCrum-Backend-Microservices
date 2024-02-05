import { PrismaService } from '@app/prisma'
import { Injectable } from '@nestjs/common'
import { Project, ProjectTag } from '@prisma/client'

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  async createTagProject(tag: ProjectTag): Promise<{ msg: string; tag: ProjectTag }> {
    const tagProject = await this.prisma.projectTag.create({
      data: {
        name: tag.name,
        colorBackground: tag.colorBackground,
        colorText: tag.colorText,
        project: null,
      },
    })
    return { msg: 'Tag creado', tag: tagProject }
  }

  async getAllProejcts(): Promise<{ msg: string; projects: Project[] } | { msg: string; error: any }> {
    try {
      const projects = await this.prisma.project.findMany()
      return { msg: 'Solicitud exitosa', projects }
    } catch (error) {
      return { msg: 'Error en la solicitud', error: error.errors }
    }
  }

  async createProject(
    projectAux: Omit<Project, 'id'> & {
      tags: Omit<ProjectTag, 'id' | 'colorText' | 'colorBackground' | 'projectId'>[]
    },
  ): Promise<{ msg: string; project: Project; error?: string }> {
    const tags = await this.prisma.projectTag.findMany({
      where: {
        name: {
          in: projectAux.tags.map((tag) => tag.name),
        },
      },
    })

    const project = await this.prisma.project.create({
      data: {
        name: projectAux.name,
        description: projectAux.description,
        image: projectAux.image,
        user: {
          connect: {
            id: projectAux.userId,
          },
        },
        tags: {
          connect: tags.map((tag) => ({ id: tag.id })),
        },
      },
      include: {
        tags: true,
      },
    })

    return { msg: 'Proyecto creado', project }
  }
}
