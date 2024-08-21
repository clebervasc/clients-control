import { IsNotEmpty, IsString } from 'class-validator'

export class CreateMessageDto {
  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  @IsNotEmpty()
  text: string
}
