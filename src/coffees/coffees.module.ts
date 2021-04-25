import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from '../events/entities/event.entity';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event])],
	controllers: [CoffeesController],
	providers: [CoffeesService]
})
export class CoffeesModule {}
