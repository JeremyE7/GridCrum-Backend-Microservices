import { PrismaService } from '@app/prisma'
import { Injectable } from '@nestjs/common'
import { Document, Img, Item, Project, ProjectTag, Spring, Task, Video } from '@prisma/client'

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
          springs: {
            include: {
              tasks: {
                include: {
                  tags: true,
                  items: {
                    include: {
                      document: true,
                      img: true,
                      video: true,
                    },
                  },
                },
              },
            },
          },
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

  async createSpring(spring: Omit<Spring, 'tasks' | 'id'>): Promise<{ msg: string; spring: Spring }> {
    console.log('Dawdas')

    try {
      const newSpring = await this.prisma.spring.create({
        data: {
          name: spring.name,
          description: spring.description,
          proyect: {
            connect: {
              id: spring.proyectId,
            },
          },
          startDate: spring.startDate,
          endDate: spring.endDate,
          state: spring.state,
        },
      })

      return { msg: 'Sprint creado', spring: newSpring }
    } catch (error) {
      console.log('Error en la solicitud', error)

      return { msg: 'Error en la solicitud', spring: null }
    }
  }

  async createTask(
    task: Omit<Task, 'id' | 'spring' | 'board' | 'reminders' | 'tags'>,
  ): Promise<{ msg: string; task: Task }> {
    try {
      const newTask = await this.prisma.task.create({
        data: {
          name: task.name,
          description: task.description,
          startDate: task.startDate,
          endDate: task.endDate,
          state: task.state,
          spring: {
            connect: {
              id: task.springId,
            },
          },
        },
      })

      return { msg: 'Tarea creada', task: newTask }
    } catch (error) {
      console.log('Error en la solicitud', error)

      return { msg: 'Error en la solicitud', task: null }
    }
  }

  async createItem(
    item: Omit<
      Item & {
        document?: Omit<Document, 'id' | 'itemId'>
      } & {
        img?: Omit<Img, 'id' | 'itemId'>
      } & {
        video?: Omit<Video, 'id' | 'itemId'>
      },
      'id' | 'spring' | 'board' | 'reminders' | 'tags' | 'documentId' | 'videoId' | 'imgId' | 'x' | 'y' | 'w' | 'h'
    >,
  ): Promise<{ msg: string; item: Item }> {
    try {
      console.log(item)

      let newDocument: Document
      let newImg: Img
      let newVideo: Video
      if (item.document) {
        newDocument = await this.prisma.document.create({
          data: {
            name: item.document.name,
            url: item.document.url,
            description: item.document.description,
          },
        })
      }

      if (item.img) {
        newImg = await this.prisma.img.create({
          data: {
            name: item.img.name,
            url: item.img.url,
            description: item.img.description,
          },
        })
      }

      if (item.video) {
        newVideo = await this.prisma.video.create({
          data: {
            name: item.video.name,
            url: item.video.url,
            description: item.video.description,
          },
        })
      }

      const newItem = await this.prisma.item.create({
        data: {
          h: 2,
          w: 2,
          x: 0,
          y: 0,
          document: newDocument ? { connect: { id: newDocument.id } } : undefined,
          img: newImg ? { connect: { id: newImg.id } } : undefined,
          video: newVideo ? { connect: { id: newVideo.id } } : undefined,
          task: {
            connect: {
              id: item.taskId,
            },
          },
        },
        include: {
          document: true,
          img: true,
          video: true,
        },
      })

      return { msg: 'Item creado', item: newItem }
    } catch (error) {
      console.log('Error en la solicitud', error)
      return { msg: 'Error en la solicitud', item: null }
    }
  }
  async updateItems(items: Item[]): Promise<{ msg: string; items: Item[] }> {
    const updatedItems = await Promise.all(
      items.map(async (item) => {
        const updatedItem = await this.prisma.item.update({
          where: {
            id: item.id,
          },
          data: {
            h: item.h,
            w: item.w,
            x: item.x,
            y: item.y,
          },
        })

        return updatedItem
      }),
    )

    return { msg: 'Items actualizados', items: updatedItems }
  }
}
