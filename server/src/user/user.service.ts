import { SubscriptionsEntity } from './subscriptions.entity'
import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserEntity } from './user.entity'
import { UserDto } from './user.dto'
import { genSalt, hash } from 'bcryptjs'

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>,

		@InjectRepository(SubscriptionsEntity)
		private readonly subscriptionsRepository: Repository<SubscriptionsEntity>,
	) {}

	async byId(id: number) {
		const user = await this.userRepository.findOne({
			where: {
				id,
			},
			relations: {
				videos: true,
				subscription: {
					toChannel: true,
				},
			},
			order: {
				createdAt: 'DESC',
			},
		})

		if (!user) throw new NotFoundException('User not found')

		const updatedVideos = user.videos.map(video => ({
			...video,
			user: { id: user.id },
		}))

		user.videos = updatedVideos as any[]

		return user
	}

	async updateProfile(id: number, dto: UserDto) {
		const user = await this.byId(id)

		const isSameUser = await this.userRepository.findOneBy({ email: dto.email })
		if (isSameUser && id !== isSameUser.id)
			throw new BadRequestException('Email has already taken')

		if (dto.password) {
			const salt = await genSalt(10)
			user.password = await hash(dto.password, salt)
		}

		user.email = dto.email ? dto.email : user.email
		user.name = dto.name ? dto.name : user.name
		user.description = dto.description ? dto.description : user.description
		user.avatarPath = dto.avatarPath ? dto.avatarPath : user.avatarPath

		return this.userRepository.save(user)
	}

	async subscribe(id: number, channelId: number) {
		const sub = {
			toChannel: { id: channelId },
			fromUser: { id },
		}

		const isSubscribed = await this.subscriptionsRepository.findOneBy(sub)

		if (!isSubscribed) {
			const newSubscribtion = this.subscriptionsRepository.create(sub)
			await this.subscriptionsRepository.save(newSubscribtion)

			return true
		}

		await this.subscriptionsRepository.delete(sub)
		return false
	}

	async getAll() {
		return this.userRepository.find()
	}
}
