import { MessageType } from '@prisma/client'
import { IsEnum, IsNotEmpty, IsString } from 'class-validator'

export class CreateMessageDto {
  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  @IsNotEmpty()
  text: string

  @IsNotEmpty()
  @IsEnum(MessageType)
  messageType: MessageType
}
