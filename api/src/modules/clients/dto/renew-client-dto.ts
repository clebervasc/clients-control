import { IsNotEmpty, IsString } from 'class-validator'

export class RenewClientDto {
  @IsNotEmpty()
  @IsString()
  plan: 'monthly' | 'bimonthly' | 'quarterly' | 'half_yearly' | 'annual'
}
