import { JwtAuthService } from '@app/jwt-auth'
import { Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private readonly jwtAuthService: JwtAuthService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization
    console.log('token', token)

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    try {
      const decoded = await this.jwtAuthService.validateToken(token)
      req.user = decoded // Puedes acceder a la información del usuario desde req.user en los controladores
      next()
    } catch (err) {
      return res.status(401).json({ message: 'Unauthorized' })
    }
  }
}
