import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { CreateCoffeeDto } from 'src/coffees/dto/create-coffee.dto';
import { UpdateCoffeeDto } from 'src/coffees/dto/update-coffee.dto';
import { Coffee } from 'src/coffees/entities/coffee.entity';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@Injectable()
export class CoffeesService {
	constructor(
		@InjectModel(Coffee.name) private readonly coffeeModel: Model<Coffee>,
		@InjectConnection() private readonly connection: Connection
	) {}

	findAll(paginationQuery: PaginationQueryDto) {
		const { limit, offset } = paginationQuery;
		return this.coffeeModel.find().skip(offset).limit(limit).exec();
	}

	async findOne(id: string) {
		const coffee = await this.coffeeModel.findOne({ _d: id }).exec();
		if (!coffee) {
			throw new NotFoundException(`Coffee #${id} not found`);
		}
		return coffee;
	}

	create(createCoffeeDto: CreateCoffeeDto) {
		const coffee = new this.coffeeModel(createCoffeeDto);
		return coffee.save();
	}

	async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
		const existingCoffee = await this.coffeeModel
			.findOneAndUpdate({ _id: id }, { $set: updateCoffeeDto }, { new: true })
			.exec();

		if (!existingCoffee) {
			throw new NotFoundException(`Coffee #${id} not found!`);
		}
		return existingCoffee;
	}

	async remove(id: string) {
		const coffee = await this.findOne(id);
		return coffee.remove();
	}
}
