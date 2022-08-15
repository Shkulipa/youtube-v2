import { Entity, JoinColumn, ManyToOne } from 'typeorm'
import { Base } from 'src/utils/base'
import { UserEntity } from './user.entity'

@Entity('Subscription')
export class SubscriptionsEntity extends Base {
	@ManyToOne(() => UserEntity, user => user.subscription)
	@JoinColumn({ name: 'from_user_id' })
	fromUser: UserEntity

	@ManyToOne(() => UserEntity, user => user.subscription)
	@JoinColumn({ name: 'to_channel_id' })
	toChannel: UserEntity
}
