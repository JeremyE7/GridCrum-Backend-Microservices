import { JwtAuthService } from '@app/jwt-auth'
import { PrismaService } from '@app/prisma'
import { Injectable } from '@nestjs/common'
import { User } from '@prisma/client'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private jwtAuth: JwtAuthService,
  ) {}

  async registerUser({
    name,
    email,
    password,
  }: {
    name: string
    email: string
    password: string
  }): Promise<{ msg: string; user: User }> {
    const userExists = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (userExists) {
      return { msg: 'User already exists', user: null }
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })
    return { msg: 'User registered', user }
  }

  async loginUser({
    email,
    password,
  }: {
    email: string
    password: string
  }): Promise<{ msg: string; user: User; token?: string }> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      return { msg: 'User not found', user: null }
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      return { msg: 'Invalid password', user: null }
    }

    const payload = { id: user.id, email: user.email, name: user.name }
    const token = await this.jwtAuth.signPayload(payload)

    return { msg: 'User logged in', user, token }
  }
}
