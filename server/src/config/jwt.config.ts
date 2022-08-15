import { ConfigService } from '@nestjs/config'
import { JwtModuleOptions } from '@nestjs/jwt'

export const getJwtonfig = async (
	configService: ConfigService,
): Promise<JwtModuleOptions> => ({
	secret: configService.get('JWT_SECRET'),
})
