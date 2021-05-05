import { DynamicModule, Module } from '@nestjs/common';
import { Connection, ConnectionOptions, createConnection } from 'typeorm';

@Module({})
export class DatabaseModule {
	static register(option: ConnectionOptions): DynamicModule {
		return {
			module: DatabaseModule,
			providers: []
		};
	}
}
