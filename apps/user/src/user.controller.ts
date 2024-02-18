import { Controller } from '@nestjs/common'
import { UserService } from './user.service'
import { User } from '@prisma/client'
import { MessagePattern } from '@nestjs/microservices'
import { LoginUserDto, RegisterUserDto } from './dto/user.schemas'

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('register_user')
  registerUser(req: RegisterUserDto): Promise<{ msg: string; user: User }> {
    return this.userService.registerUser(req)
  }

  @MessagePattern('login_user')
  loginUser(req: LoginUserDto): Promise<{ msg: string; user: User; token?: string }> {
    return this.userService.loginUser(req)
  }

  @MessagePattern('validate_token')
  validateToken(token: string): Promise<{ msg: string; user: User }> {
    return this.userService.validateToken(token)
  }
}
