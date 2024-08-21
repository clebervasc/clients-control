import { Injectable } from '@nestjs/common'
import { MessagesRepository } from 'src/shared/database/repositories/messages.repositories'
import { CreateMessageDto } from '../dto/create-message.dto'
import { UpdateMessageDto } from '../dto/update-message.dto'
import { ValidateMessagesOwnershipService } from './validate-messages-ownership.service'

@Injectable()
export class MessagesService {
  constructor(
    private readonly messagesRepo: MessagesRepository,
    private readonly validateMessagesOwnershipService: ValidateMessagesOwnershipService,
  ) {}

  async create(userId: string, createMessageDto: CreateMessageDto) {
    return this.messagesRepo.create({
      data: {
        userId,
        ...createMessageDto,
      },
    })
  }

  async findAllByUserId(userId: string) {
    const messages = await this.messagesRepo.findMany({
      where: { userId },
    })

    return messages
  }

  async remove(userId: string, messageId: string) {
    await this.validateMessagesOwnershipService.validate(userId, messageId)

    await this.messagesRepo.delete({
      where: { id: messageId },
    })

    return null
  }

  async update(
    userId: string,
    messageId: string,
    updateMessageDto: UpdateMessageDto,
  ) {
    await this.validateMessagesOwnershipService.validate(userId, messageId)

    return this.messagesRepo.update({
      where: { id: messageId },
      data: {
        ...updateMessageDto,
      },
    })
  }
}
