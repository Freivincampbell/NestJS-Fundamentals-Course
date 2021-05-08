import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CoffeesController } from 'src/coffees/coffees.controller';
import { CoffeesService } from 'src/coffees/coffees.service';
import { Coffee, CoffeeSchema } from 'src/coffees/entities/coffee.entity';

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: Coffee.name,
				schema: CoffeeSchema
			}
		])
	],
	controllers: [CoffeesController],
	providers: [CoffeesService]
})
export class CoffeesModule {}
