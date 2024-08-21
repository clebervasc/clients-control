import { Controller, Post, Req } from '@nestjs/common'
import { IsPublic } from 'src/shared/database/decorators/IsPublic'
import { AuthService } from './auth.service'

@IsPublic()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('google')
  async googleAuth(@Req() req) {
    const profile = await this.authService.validateProfile(req.body.tokenId)

    return this.authService.login(profile)
  }
}
