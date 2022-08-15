import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOptionsWhereProperty, ILike, MoreThan, Repository } from 'typeorm'
import { VideoDto } from './video.dto'
import { VideoEntity } from './video.entity'

@Injectable()
export class VideoService {
	constructor(
		@InjectRepository(VideoEntity)
		private readonly videoRepository: Repository<VideoEntity>,
	) {}

	async byId(id: number, isPublic = false) {
		const video = await this.videoRepository.findOne({
			where: isPublic
				? {
						id,
						isPublic: true,
				  }
				: {
						id,
				  },
			relations: {
				user: true,
				comments: {
					user: true,
				},
			},
			select: {
				user: {
					id: true,
					name: true,
					avatarPath: true,
					isVerified: true,
					subscribersCount: true,
					subscription: true,
				},
				comments: {
					message: true,
					id: true,
					user: {
						id: true,
						name: true,
						avatarPath: true,
						isVerified: true,
						subscribersCount: true,
					},
				},
			},
		})

		if (!video) throw new NotFoundException('Video not found')

		return video
	}

	async updateVideo(id: number, dto: VideoDto) {
		const video = await this.byId(id)

		return this.videoRepository.save({
			...video,
			...dto,
		})
	}

	async getAll(searchTerm?: string) {
		let options: FindOptionsWhereProperty<VideoEntity> = {}

		if (searchTerm)
			options = {
				name: ILike(`%${searchTerm}%`),
			}

		return await this.videoRepository.find({
			where: {
				...options,
				isPublic: false,
			},
			order: {
				createdAt: 'DESC',
			},
			relations: {
				user: true,
				comments: {
					user: true,
				},
			},
			select: {
				user: {
					id: true,
					name: true,
					avatarPath: true,
					isVerified: true,
				},
			},
		})
	}

	async getMostPopularByViews() {
		return this.videoRepository.find({
			/* where: {
				views: MoreThan(0),
			}, */
			relations: {
				user: true,
			},
			select: {
				user: {
					id: true,
					name: true,
					avatarPath: true,
					isVerified: true,
				},
			},
			order: {
				views: -1,
			},
		})
	}

	async create(userId: number) {
		const defaultValue = {
			name: '',
			user: { id: userId },
			videoPath: '',
			description: '',
			thumbnailPath: '',
		}

		const newVideo = this.videoRepository.create(defaultValue)
		const video = await this.videoRepository.save(newVideo)
		return video.id
	}

	async delete(id: number) {
		return await this.videoRepository.delete({ id })
	}

	async updateCountViews(id: number) {
		const video = await this.byId(id)
		video.views++
		return await this.videoRepository.save(video)
	}

	async updateReaction(id: number) {
		const video = await this.byId(id)
		video.likes++
		return await this.videoRepository.save(video)
	}
}
