import { IsEmail, IsString, MinLength } from 'class-validator'

export class AuthDto {
	@IsEmail()
	email: string

	@MinLength(6, {
		message: 'Not less 6 characters',
	})
	@IsString()
	password: string
}
