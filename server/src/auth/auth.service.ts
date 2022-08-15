import { AuthDto } from './auth.dto'
import {
	BadRequestException,
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from 'src/user/user.entity'
import { Repository } from 'typeorm'
import { compare, genSalt, hash } from 'bcryptjs'

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>,
		private readonly jwtService: JwtService,
	) {}

	async login(dto: AuthDto) {
		const user = await this.validateUser(dto)
		const accessToken = await this.issueAccessToken(user.id)

		return {
			user: this.returnUserFields(user),
			accessToken,
		}
	}

	async register(dto: AuthDto) {
		const oldUser = await this.userRepository.findOneBy({ email: dto.email })
		if (oldUser) throw new BadRequestException('Email has already taken')

		const salt = await genSalt(10)
		const hashPassword = await hash(dto.password, salt)
		const newUser = this.userRepository.create({
			email: dto.email,
			password: hashPassword,
		})

		const user = await this.userRepository.save(newUser)
		const accessToken = await this.issueAccessToken(user.id)

		return {
			user: this.returnUserFields(user),
			accessToken,
		}
	}

	async validateUser(dto: AuthDto) {
		const user = await this.userRepository.findOne({
			where: {
				email: dto.email,
			},
			select: ['id', 'email', 'password'],
		})

		if (!user) throw new NotFoundException(`User wasn't found`)

		const isValidPassword = compare(dto.password, user.password)
		if (!isValidPassword)
			throw new UnauthorizedException('Not correct password')

		return user
	}

	async issueAccessToken(userId: number): Promise<string> {
		const data = {
			id: userId,
		}

		return await this.jwtService.signAsync(data, {
			expiresIn: '30d',
		})
	}

	returnUserFields(user: UserEntity) {
		return {
			id: user.id,
			email: user.email,
		}
	}
}
