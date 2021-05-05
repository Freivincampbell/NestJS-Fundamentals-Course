import {
	MiddlewareConsumer,
	Module,
	NestModule,
	RequestMethod
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ApiKeyGuard } from './guards/api-key.guard';
import { LoggingMiddleware } from './middleware/logging.middleware';

@Module({
	imports: [ConfigService],
	providers: [
		ConfigService,
		{
			provide: APP_GUARD,
			useClass: ApiKeyGuard
		}
	]
})
export class CommonModule implements NestModule {
	configure(consumer: MiddlewareConsumer): any {
		consumer.apply(LoggingMiddleware).forRoutes('*');
	}
}
