import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class JwtAuthService {
  constructor(private readonly jwtService: JwtService) {}

  async signPayload(payload: any): Promise<string> {
    return this.jwtService.sign(payload)
  }

  async validateToken(token: string): Promise<any> {
    try {
      return this.jwtService.verify(token)
    } catch (error) {
      throw new UnauthorizedException('Token inválido')
    }
  }
}
