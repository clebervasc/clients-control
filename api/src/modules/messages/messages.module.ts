import { Module } from '@nestjs/common'
import { MessagesController } from './messages.controller'
import { MessagesService } from './services/messages.service'
import { ValidateMessagesOwnershipService } from './services/validate-messages-ownership.service'

@Module({
  controllers: [MessagesController],
  providers: [MessagesService, ValidateMessagesOwnershipService],
  exports: [ValidateMessagesOwnershipService],
})
export class MessagesModule {}
