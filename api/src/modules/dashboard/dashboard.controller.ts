import { Controller, Get } from '@nestjs/common'
import { ActiveUserId } from 'src/shared/database/decorators/ActiveUserId'
import { DashboardService } from './dashboard.service'

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  findAll(@ActiveUserId() userId: string) {
    return this.dashboardService.findAllByUserId(userId)
  }
}
