import { BelongsToMany, Column, Model,Table } from "sequelize-typescript";
import { AuthorsForArticle } from "./AuthorsForArticle";
import { Article } from "./Article";

@Table
export class Author extends Model{
	@Column({ primaryKey: true, autoIncrement: true })
		id: number;
	@Column
		name: string;
	@Column
		surname: string;
	@Column
		birthdate: Date;
	@BelongsToMany(() => Article, () => AuthorsForArticle)
		articles: Article[];
};