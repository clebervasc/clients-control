import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsUrl,
  IsUUID,
  IsOptional,
} from 'class-validator'

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsUrl()
  @IsOptional()
  avatar?: string

  @IsString()
  @IsOptional()
  provider?: string

  @IsUUID()
  providerId: string
}
