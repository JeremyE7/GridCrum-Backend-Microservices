import { IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator'

export class createProjectDto {
  @IsString()
  @IsNotEmpty()
  name: string
  @IsString()
  @IsNotEmpty()
  description: string
  @IsString()
  @IsUrl()
  image: string
  @IsNumber()
  @IsNotEmpty()
  userId: number
  @IsNotEmpty()
  tags: relateATagWithProjectDto[]
}

export class relateATagWithProjectDto {
  @IsString()
  @IsNotEmpty()
  name: string
}
