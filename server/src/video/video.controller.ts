import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	Query,
} from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorators'
import { CurrentUser } from 'src/user/user.decorator'
import { VideoDto } from './video.dto'
import { VideoService } from './video.service'

@Controller('video')
export class VideoController {
	constructor(private readonly videoService: VideoService) {}

	@Get('get-private/:id')
	@Auth()
	async getProfile(@Param('id') id: number) {
		return this.videoService.byId(+id, true)
	}

	@Get()
	async getAll(@Query('searchTerm') searchTerm: string) {
		return this.videoService.getAll(searchTerm)
	}

	@Get('popular')
	async getMostPopularByViews() {
		return this.videoService.getMostPopularByViews()
	}

	@Get('/:id')
	async getVideo(@Param('id') id: string) {
		return await this.videoService.byId(+id)
	}

	@HttpCode(200)
	@Post()
	@Auth()
	async createVideo(@CurrentUser('id') id: number) {
		return this.videoService.create(id)
	}

	@HttpCode(200)
	@Put('/:id')
	@Auth()
	async updateVideo(@Param('id') videoId: string, @Body() dto: VideoDto) {
		return this.videoService.updateVideo(+videoId, dto)
	}

	@HttpCode(200)
	@Delete('/:id')
	@Auth()
	async deleteVideo(@Param('id') videoId: string) {
		return this.videoService.delete(+videoId)
	}

	@HttpCode(200)
	@Put('update-views/:id')
	async updateViews(@Param('id') videoId: string) {
		return this.videoService.updateCountViews(+videoId)
	}

	@HttpCode(200)
	@Put('update-likes/:id')
	@Auth()
	async updateLikes(@Param('id') videoId: string) {
		return this.videoService.updateReaction(+videoId)
	}
}
