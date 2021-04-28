import { Injectable, NotFoundException, Scope } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { Event } from '../events/entities/event.entity';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';

@Injectable({ scope: Scope.DEFAULT })
export class CoffeesService {
	constructor(
		@InjectRepository(Coffee)
		private readonly coffeeRepository: Repository<Coffee>,
		@InjectRepository(Flavor)
		private readonly flavorRepository: Repository<Flavor>,
		private readonly connection: Connection,
		private readonly configService: ConfigService
	) {
		const databaseHost = this.configService.get<string>(
			'DATABASE_HOST',
			'localhost'
		);

		console.log(databaseHost);
	}

	async findAll(paginationQuery: PaginationQueryDto) {
		const { limit, offset } = paginationQuery;
		return await this.coffeeRepository.find({
			relations: ['flavors'],
			skip: offset,
			take: limit
		});
	}

	async findOne(id: string) {
		const coffee = await this.coffeeRepository.findOne(id, {
			relations: ['flavors']
		});

		if (!coffee) {
			throw new NotFoundException(`Coffee #${id} not found`);
		}

		return coffee;
	}

	async create(createCoffeeDto: CreateCoffeeDto) {
		const flavors = await Promise.all(
			createCoffeeDto.flavors.map((name) => this.preloadFlavorByName(name))
		);

		const coffee = await this.coffeeRepository.create({
			...createCoffeeDto,
			flavors
		});
		return await this.coffeeRepository.save(coffee);
	}

	async update(id, updateCoffeeDto: UpdateCoffeeDto) {
		const flavors =
			updateCoffeeDto.flavors &&
			(await Promise.all(
				updateCoffeeDto.flavors.map((name) => this.preloadFlavorByName(name))
			));

		const coffee = await this.coffeeRepository.preload({
			id: +id,
			...updateCoffeeDto,
			flavors
		});

		if (!coffee) {
			throw new NotFoundException(`Coffee #${id} not found`);
		}

		return await this.coffeeRepository.save(coffee);
	}

	async delete(id) {
		const coffee = await this.findOne(id);
		return await this.coffeeRepository.remove(coffee);
	}

	async recommendCoffee(coffee: Coffee) {
		const queryRunner = this.connection.createQueryRunner();

		await queryRunner.connect();
		await queryRunner.startTransaction();

		try {
			coffee.recommendation++;

			const recommendEvent = new Event();
			recommendEvent.name = 'recommend_coffee';
			recommendEvent.type = 'coffee';
			recommendEvent.payload = { coffeeId: coffee.id };

			await queryRunner.manager.save(coffee);
			await queryRunner.manager.save(recommendEvent);

			await queryRunner.commitTransaction();
		} catch (err) {
			await queryRunner.rollbackTransaction();
		} finally {
			await queryRunner.release();
		}
	}

	private async preloadFlavorByName(name: string): Promise<Flavor> {
		const existingFlavor = await this.flavorRepository.findOne({ name });
		if (existingFlavor) return existingFlavor;

		return this.flavorRepository.create({ name });
	}
}
