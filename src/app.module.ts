import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { CoffeeRatingModule } from './coffee-rating/coffee-rating.module';
import { DatabaseModule } from './database/database.module';

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: 'localhost',
			port: 5432,
			username: 'freivincampbell',
			password: 'pass123',
			database: 'postgres',
			autoLoadEntities: true,
			synchronize: true
		}),
		CoffeesModule,
		CoffeeRatingModule,
		DatabaseModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}