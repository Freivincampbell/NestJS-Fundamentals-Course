import {
	Controller,
	Get,
	Param,
	Post,
	Body,
	HttpCode,
	HttpStatus,
	Res,
	Put,
	Patch,
	Delete,
	Query,
	UsePipes,
	ValidationPipe
} from '@nestjs/common';
import { Protocol } from '../common/decorators/protocol.decorator';
import { Public } from '../common/decorators/public.decorator';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { ParseIntPipe } from '../common/pipes/parse-int.pipe';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Controller('coffees')
export class CoffeesController {
	constructor(private readonly coffeeService: CoffeesService) {}

	@Public()
	@Get()
	async findAll(
		@Protocol('https') protocol: string,
		@Query() paginationQuery: PaginationQueryDto
	) {
		// const { limit, offset } = paginationQuery;
		return await this.coffeeService.findAll(paginationQuery);
	}

	@Get(':id')
	async findOne(@Param('id', ParseIntPipe) id: number) {
		return await this.coffeeService.findOne('' + id);
	}

	@Post()
	async create(@Body() createCoffeeDto: CreateCoffeeDto) {
		return await this.coffeeService.create(createCoffeeDto);
	}

	@Patch(':id')
	async update(@Param('id') id: number, @Body() updateCoffee: UpdateCoffeeDto) {
		return await this.coffeeService.update(id, updateCoffee);
	}

	@Delete(':id')
	async delete(@Param('id') id: string) {
		return await this.coffeeService.delete(id);
	}
}
