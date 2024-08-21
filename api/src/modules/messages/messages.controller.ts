import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common'
import { ActiveUserId } from 'src/shared/database/decorators/ActiveUserId'
import { CreateMessageDto } from './dto/create-message.dto'
import { UpdateMessageDto } from './dto/update-message.dto'
import { MessagesService } from './services/messages.service'

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  create(
    @ActiveUserId() userId: string,
    @Body() createMessageDto: CreateMessageDto,
  ) {
    return this.messagesService.create(userId, createMessageDto)
  }

  @Get()
  findAll(@ActiveUserId() userId: string) {
    return this.messagesService.findAllByUserId(userId)
  }

  @Put(':messageId')
  update(
    @ActiveUserId() userId: string,
    @Param('messageId', ParseUUIDPipe) messageId: string,
    @Body() updateMessageDto: UpdateMessageDto,
  ) {
    return this.messagesService.update(userId, messageId, updateMessageDto)
  }

  @Delete(':messageId')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @ActiveUserId() userId: string,
    @Param('messageId', ParseUUIDPipe)
    messageId: string,
  ) {
    return this.messagesService.remove(userId, messageId)
  }
}
