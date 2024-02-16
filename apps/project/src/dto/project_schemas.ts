import { IsIn, IsNotEmpty, IsNotEmptyObject, IsNumber, IsOptional, IsString, IsUrl } from 'class-validator'

export class createProjectDto {
  @IsNotEmpty()
  @IsNumber()
  x: number
  @IsNotEmpty()
  @IsNumber()
  y: number
  @IsNotEmpty()
  @IsNumber()
  h: number
  @IsNotEmpty()
  @IsNumber()
  w: number
  @IsString()
  @IsNotEmpty()
  name: string
  @IsString()
  @IsNotEmpty()
  description: string
  @IsString()
  @IsUrl()
  image: string
  @IsNotEmpty()
  tags: string[]
}

export class ProjectTagDto {
  @IsNotEmptyObject()
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  colorBackground: string

  @IsNotEmpty()
  @IsString()
  colorText: string
}

export class SpringDto {
  @IsNotEmpty()
  @IsString()
  name: string
  @IsNotEmpty()
  @IsString()
  description: string
  @IsNotEmpty()
  @IsString()
  startDate: Date
  @IsNotEmpty()
  @IsString()
  endDate: Date
  @IsNotEmpty()
  @IsIn(['inProgress', 'finished', 'canceled'])
  state: string
  @IsNotEmpty()
  @IsNumber()
  proyectId: number
}

export class CreateDocumentDTO {
  @IsString()
  @IsNotEmpty()
  name: string
  @IsString()
  @IsNotEmpty()
  description: string
  @IsUrl()
  @IsString()
  url: string
}

export class CreateImgDTO {
  @IsString()
  @IsNotEmpty()
  name: string
  @IsString()
  @IsNotEmpty()
  description: string
  @IsUrl()
  @IsString()
  url: string
}

export class CreateVideoDTO {
  @IsString()
  @IsNotEmpty()
  name: string
  @IsString()
  @IsNotEmpty()
  description: string
  @IsUrl()
  @IsString()
  url: string
}

export class CreateTaskDTO {
  @IsNotEmpty()
  @IsString()
  name: string
  @IsNotEmpty()
  @IsString()
  description: string
  @IsNotEmpty()
  @IsString()
  startDate: Date
  @IsNotEmpty()
  @IsString()
  endDate: Date
  @IsNotEmpty()
  @IsIn(['to-do', 'in-progress', 'done'])
  state: string
  @IsNotEmpty()
  @IsNumber()
  springId: number
}

export class CreateItemDTO {
  @IsOptional()
  document: CreateDocumentDTO
  @IsOptional()
  img: CreateImgDTO
  @IsOptional()
  video: CreateVideoDTO
  @IsNotEmpty()
  @IsNumber()
  taskId: number
}
