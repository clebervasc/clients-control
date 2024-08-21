import { Module } from '@nestjs/common'
import { ServersController } from './servers.controller'
import { ValidateServersOwnershipService } from './services/validate-servers-ownership.service'
import { ServersService } from './services/servers.service'

@Module({
  controllers: [ServersController],
  providers: [ServersService, ValidateServersOwnershipService],
  exports: [ValidateServersOwnershipService],
})
export class ServersModule {}
