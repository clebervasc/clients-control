import { Module } from '@nestjs/common'
import { ClientsController } from './clients.controller'

import { ValidateClientsOwnershipService } from './services/validate-clients-ownership.service'
import { ClientsService } from './services/clients.service'

@Module({
  controllers: [ClientsController],
  providers: [ClientsService, ValidateClientsOwnershipService],
  exports: [ValidateClientsOwnershipService],
})
export class ClientsModule {}
