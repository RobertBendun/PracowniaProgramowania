import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export default class Users {
	@PrimaryGeneratedColumn() id: number;
	@Column({ length: 255 }) name: string;
	@Column({ length: 255 }) surname: string;
	
	@Column({ length: 255 }) login: string;
	@Column({ length: 255 }) password: string;

	@Column({ type: 'date' }) dateOfBirth: Date;
	@Column({ default: false }) isDeleted: boolean;
}
