import { IsNotEmpty, IsNotEmptyObject, IsNumber, IsString, IsUrl } from 'class-validator'

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
