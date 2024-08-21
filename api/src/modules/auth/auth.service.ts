import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import axios from 'axios'
import * as jwkToPem from 'jwk-to-pem'
import { env } from 'src/shared/config/env'
import { UsersRepository } from 'src/shared/database/repositories/users.repositories'

interface Profile {
  email: string
  name: string
  sub: string
  picture: string
}

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly usersRepo: UsersRepository,
  ) {}

  async getGooglePublicKey(kid: string): Promise<string> {
    const jwksUrl = 'https://www.googleapis.com/oauth2/v3/certs'

    try {
      const response = await axios.get(jwksUrl)

      const keys = response.data.keys

      const signingKey = keys.find((key) => key.kid === kid)

      if (!signingKey) {
        throw new Error('Chave pública não encontrada')
      }

      const pem = jwkToPem(signingKey)

      return pem
    } catch (error) {
      throw new UnauthorizedException('Erro ao buscar a chave pública')
    }
  }

  async validateProfile(tokenId: string): Promise<any> {
    const decodedHeader = this.jwtService.decode(tokenId, { complete: true })
    const kid = decodedHeader?.header?.kid

    if (!kid) {
      throw new UnauthorizedException('Token inválido, kid não encontrado')
    }

    const secret = await this.getGooglePublicKey(kid)

    try {
      const payload = await this.jwtService.verifyAsync(tokenId, {
        secret,
        algorithms: ['RS256'],
      })
      return payload
    } catch (error) {
      console.error('Erro na verificação do token:', error.message)
      throw new UnauthorizedException('Token inválido')
    }
  }

  async login(profile: Profile) {
    const payload = {
      avatar: profile.picture,
      name: profile.name,
      email: profile.email,
      providerId: profile.sub,
    }

    const user = await this.usersRepo.findUnique({
      where: { email: profile.email },
    })

    if (user) {
      return {
        access_token: this.jwtService.sign(user, { expiresIn: '7d' }),
      }
    }
    const authorizedEmails = JSON.parse(env.authorizedEmails)

    const authorizedEmail = authorizedEmails.find(
      (email: string) => email === profile.email,
    )

    if (!authorizedEmail) {
      throw new UnauthorizedException('Usuário sem autorização')
    }

    await this.usersRepo.create({
      data: { ...payload },
    })

    const createdUser = await this.usersRepo.findUnique({
      where: { email: profile.email },
    })

    return {
      access_token: this.jwtService.sign(createdUser, { expiresIn: '7d' }),
    }
  }
}
