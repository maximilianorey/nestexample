import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Author } from "./Author";
import { Article } from "./Article";

@Table
export class AuthorsForArticle extends Model{
	@ForeignKey(() => Author)
	@Column
		articleId: number;
  	@ForeignKey(() => Article)
	@Column
  		authorId: number;
}