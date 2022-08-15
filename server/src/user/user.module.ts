import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { VideoEntity } from 'src/video/video.entity'
import { SubscriptionsEntity } from './subscriptions.entity'
import { UserEntity } from './user.entity'

@Module({
	imports: [
		TypeOrmModule.forFeature([UserEntity, SubscriptionsEntity, VideoEntity]),
	],
	controllers: [UserController],
	providers: [UserService],
})
export class UserModule {}
