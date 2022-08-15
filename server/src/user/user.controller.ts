import {
	Body,
	Controller,
	Get,
	HttpCode,
	Param,
	Patch,
	Put,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorators'
import { CurrentUser } from './user.decorator'
import { UserDto } from './user.dto'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get('profile')
	@Auth()
	async getProfile(@CurrentUser('id') id: number) {
		return this.userService.byId(id)
	}

	@Get('profile/:id')
	async getProfileById(@Param('id') id: string) {
		return this.userService.byId(+id)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put('update/:id')
	@Auth()
	async updateUser(@Param('id') id: string, @Body() dto: UserDto) {
		return await this.userService.updateProfile(+id, dto)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Patch('subscribe/:channelId')
	@Auth()
	async subscribeToChannel(
		@Param('id') channelId: string,
		@CurrentUser('id') id: number,
	) {
		return await this.userService.subscribe(id, +channelId)
	}

	@Get()
	async getUser() {
		return await this.userService.getAll()
	}
}
