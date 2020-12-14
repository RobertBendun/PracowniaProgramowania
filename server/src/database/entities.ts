import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Users {
	@PrimaryGeneratedColumn() id!: number;
	@Column({ length: 255 }) name!: string;
	@Column({ length: 255 }) surname!: string;
	
	@Column({ length: 255 }) login!: string;
	@Column({ length: 255 }) password!: string;

	@Column({ type: 'date' }) dateOfBirth!: Date;
	@Column({ default: false }) isDeleted!: boolean;

	@ManyToOne(() => Role, {nullable: false}) role!: number;
}

@Entity()
export class Role {
	@PrimaryGeneratedColumn() id!: number;
	@Column() name!: string;
}

// @Entity()
// export class Company {

// }

export default [Users, Role]