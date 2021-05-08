import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCoffeeDto {
	@ApiProperty({ description: 'The name of a coffee' })
	@IsString()
	readonly name: string;

	@IsString()
	@ApiProperty()
	readonly brand: string;

	@IsString({ each: true })
	@ApiProperty()
	readonly flavors: string[];
}
