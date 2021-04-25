import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index(['name', 'type'])
@Entity()
export class Event {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	@Index()
	type: string;

	@Column()
	name: string;

	@Column('json')
	payload: Record<string, any>;
}
