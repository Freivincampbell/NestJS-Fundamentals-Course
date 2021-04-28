import { Module } from '@nestjs/common';
import { CoffeesModule } from '../coffees/coffees.module';
import { DatabaseModule } from '../database/database.module';
import { CoffeeRatingService } from './coffee-rating.service';

@Module({
	imports: [
		DatabaseModule.register({
			type: 'postgres',
			host: 'localhost',
			port: 5432,
			password: 'pass123'
		}),
		CoffeesModule
	],
	providers: [CoffeeRatingService]
})
export class CoffeeRatingModule {}
