import { CommentEntity } from 'src/comment/comment.entity'
import { Module } from '@nestjs/common'
import { CommentService } from './comment.service'
import { CommentController } from './comment.controller'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
	imports: [TypeOrmModule.forFeature([CommentEntity])],
	controllers: [CommentController],
	providers: [CommentService],
})
export class CommentModule {}
