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
	Query
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Controller('coffees')
export class CoffeesController {
	constructor(private readonly coffeeService: CoffeesService) {}

	@Get()
	findAll(@Query() paginationQuery) {
		// const { limit, offset } = paginationQuery;
		return this.coffeeService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: number) {
		return this.coffeeService.findOne('' + id);
	}

	@Post()
	create(@Body() createCoffeeDto: CreateCoffeeDto) {
		return this.coffeeService.create(createCoffeeDto);
	}

	@Patch(':id')
	update(@Param('id') id: number, @Body() updateCoffee: UpdateCoffeeDto) {
		return this.coffeeService.update(id, updateCoffee);
	}

	@Delete(':id')
	delete(@Param('id') id: string) {
		return this.coffeeService.delete(id);
	}
}
