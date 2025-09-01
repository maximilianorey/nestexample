import { Model, Column, Table } from "sequelize-typescript";

@Table
export class Magazine extends Model{
	@Column({ primaryKey: true, autoIncrement: true })
		id: number;
	@Column
		name: string;
	@Column
		gender: string;
};