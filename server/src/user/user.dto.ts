import { IsEmail, IsString, IsOptional } from 'class-validator'

export class UserDto {
	@IsOptional()
	@IsEmail()
	email: string

	password: string

	@IsOptional()
	@IsString()
	name: string

	@IsOptional()
	@IsString()
	description: string

	@IsOptional()
	@IsString()
	avatarPath: string
}
