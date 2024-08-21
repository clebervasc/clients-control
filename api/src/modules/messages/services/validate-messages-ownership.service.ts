import { Injectable, NotFoundException } from '@nestjs/common'
import { MessagesRepository } from 'src/shared/database/repositories/messages.repositories'

@Injectable()
export class ValidateMessagesOwnershipService {
  constructor(private readonly messagesRepo: MessagesRepository) {}

  async validate(userId: string, messageId: string) {
    const isOwner = await this.messagesRepo.findFirst({
      where: { id: messageId, userId },
    })

    if (!isOwner) {
      throw new NotFoundException('Message not found.')
    }
  }
}
