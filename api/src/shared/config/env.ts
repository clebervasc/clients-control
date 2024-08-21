import { plainToInstance } from 'class-transformer'
import { IsNotEmpty, IsString, NotEquals, validateSync } from 'class-validator'

class Env {
  @IsString()
  @IsNotEmpty()
  dbURL: string

  @IsString()
  @IsNotEmpty()
  clientID: string

  @IsString()
  @IsNotEmpty()
  clientSecret: string

  @IsString()
  @IsNotEmpty()
  callbackURL: string

  @IsString()
  @IsNotEmpty()
  @NotEquals('unsecure_jwt_secret')
  jwtSecret: string

  @IsString()
  @IsNotEmpty()
  jwtExpiresIn: string

  @IsString()
  @IsNotEmpty()
  authorizedEmails: string
}

export const env: Env = plainToInstance(Env, {
  dbURL: process.env.DATABASE_URL,
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
  jwtSecret: process.env.JWT_SECRET_KEY,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
  authorizedEmails: process.env.AUTHORIZED_EMAILS,
})

const errors = validateSync(env)

if (errors.length > 0) {
  throw new Error(JSON.stringify(errors, null, 2))
}
