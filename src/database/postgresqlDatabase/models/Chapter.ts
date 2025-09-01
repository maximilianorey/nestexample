import { Article } from "./Article";
import { Model, Column, ForeignKey, Table, BelongsTo } from "sequelize-typescript";

@Table
export class Chapter extends Model{
	@Column({ primaryKey: true, autoIncrement: true })
		id: number;
	@Column
	@Column
		number: number;


	@ForeignKey(() => Article)
	@Column
		articleId: number;

	@BelongsTo(() => Article)
		article: Article;
}
