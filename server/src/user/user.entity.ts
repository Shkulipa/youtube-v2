import { VideoEntity } from './../video/video.entity'
import { Column, Entity, OneToMany, OneToOne } from 'typeorm'
import { Base } from 'src/utils/base'
import { SubscriptionsEntity } from './subscriptions.entity'

@Entity('User')
export class UserEntity extends Base {
	@Column({ unique: true })
	email: string

	@Column({ select: false })
	password: string

	@Column({ default: '' })
	name: string

	@Column({ default: false, name: 'is_verified' })
	isVerified: boolean

	@Column({ default: 0, name: 'subscribers_count' })
	subscribersCount?: number

	@Column({ default: 0, type: 'text' })
	description?: string

	@Column({ default: '', name: 'avatar_path' })
	avatarPath: string

	@OneToMany(() => VideoEntity, video => video.user)
	videos: VideoEntity[]

	@OneToMany(() => SubscriptionsEntity, subscription => subscription.fromUser)
	subscription: SubscriptionsEntity[]

	@OneToMany(() => SubscriptionsEntity, subscription => subscription.toChannel)
	subscribes: SubscriptionsEntity[]
}
