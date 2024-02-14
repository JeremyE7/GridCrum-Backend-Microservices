import { PrismaService } from '@app/prisma'
import { Injectable } from '@nestjs/common'
import { Project, ProjectTag } from '@prisma/client'

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  async createTagProject(
    tag: Omit<ProjectTag, 'id' | 'projectId' | 'userId'>,
    userId: string,
  ): Promise<{ msg: string; tag: ProjectTag }> {
    try {
      const tagProject = await this.prisma.projectTag.create({
        data: {
          name: tag.name,
          colorBackground: tag.colorBackground,
          colorText: tag.colorText,
          user: {
            connect: {
              id: Number(userId),
            },
          },
        },
      })
      return { msg: 'Tag creado', tag: tagProject }
    } catch (error) {
      if ((error.name = 'PrismaClientKnownRequestError')) {
        console.log(error)
        return { msg: 'Ya existe un tag con ese nombre', tag: null }
      }
    }
  }

  async getAllUserProjectTags(
    userId: string,
  ): Promise<{ msg: string; tags: ProjectTag[] } | { msg: string; error: any }> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: Number(userId),
        },
      })

      if (!user) return { msg: 'Usuario no encontrado', tags: null }

      const tags = await this.prisma.projectTag.findMany({
        where: {
          user: {
            id: Number(userId),
          },
        },
      })
      return { msg: 'Solicitud exitosa', tags }
    } catch (error) {
      return { msg: 'Error en la solicitud', error: error.errors }
    }
  }

  async deleteTagProject(tagId: string): Promise<{ msg: string; tag: ProjectTag; error?: any }> {
    try {
      const tag = await this.prisma.projectTag.delete({
        where: {
          id: Number(tagId),
        },
      })
      return { msg: 'Tag eliminado', tag }
    } catch (error) {
      return { msg: 'Error en la solicitud', error: error.errors, tag: null }
    }
  }

  async getAllUserProjects(
    userId: string,
  ): Promise<{ msg: string; projects: Project[] } | { msg: string; error: any }> {
    try {
      const projects = await this.prisma.project.findMany({
        where: {
          userId: Number(userId),
        },
        include: {
          tags: true,
        },
      })
      return { msg: 'Solicitud exitosa', projects }
    } catch (error) {
      console.log('Error en la solicitud', error)

      return { msg: 'Error en la solicitud', error: error }
    }
  }

  async getAllProejcts(): Promise<{ msg: string; projects: Project[] } | { msg: string; error: any }> {
    try {
      const projects = await this.prisma.project.findMany({
        include: {
          tags: true,
        },
      })
      return { msg: 'Solicitud exitosa', projects }
    } catch (error) {
      return { msg: 'Error en la solicitud', error: error.errors }
    }
  }

  async createProject(
    projectAux: Omit<Project, 'id' | 'userId'> & {
      tags: string[]
    },
    userId: string,
  ): Promise<{ msg: string; project: Project; error?: string }> {
    console.log(projectAux.tags)

    const tags = await this.prisma.projectTag.findMany({
      where: {
        name: {
          in: projectAux.tags,
        },
      },
    })

    if (tags.length !== projectAux.tags.length) {
      return { msg: 'Error en la solicitud', project: null, error: 'No se encontraron todos los tags' }
    }

    const project = await this.prisma.project.create({
      data: {
        name: projectAux.name,
        description: projectAux.description,
        image: projectAux.image,
        h: projectAux.h,
        w: projectAux.w,
        x: projectAux.x,
        y: projectAux.y,
        user: {
          connect: {
            id: Number(userId),
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

    console.log(project)

    return { msg: 'Proyecto creado', project }
  }

  async updateUserProjects(
    projectsToUpdate: (Project & { tags: ProjectTag[] })[],
    userId: string,
  ): Promise<{ msg: string; projects: Project[] | null }> {
    try {
      console.log(projectsToUpdate, userId)

      const user = await this.prisma.user.findUnique({
        where: {
          id: Number(userId),
        },
      })

      if (!user) return { msg: 'Usuario no encontrado', projects: null }
      const updatedProjects = await Promise.all(
        projectsToUpdate.map(async (project) => {
          console.log(project.tags)

          const tags = await this.prisma.projectTag.findMany({
            where: {
              name: {
                in: project.tags.map((tag) => tag.name),
              },
            },
          })

          if (tags.length !== project.tags.length) {
            return null
          }

          const updatedProject = await this.prisma.project.update({
            where: {
              id: project.id,
            },
            data: {
              name: project.name,
              description: project.description,
              image: project.image,
              h: project.h,
              w: project.w,
              x: project.x,
              y: project.y,
              tags: {
                set: tags.map((tag) => ({ id: tag.id })),
              },
            },
            include: {
              tags: true,
            },
          })

          return updatedProject
        }),
      )

      return { msg: 'Proyectos actualizados', projects: updatedProjects as unknown as Project[] }
    } catch (error) {
      console.log('Error en la solicitud', error)

      return { msg: 'Error en la solicitud', projects: null }
    }
  }
}
