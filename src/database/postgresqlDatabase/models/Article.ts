import { Model, Column, Table, BelongsToMany,BelongsTo, ForeignKey } from "sequelize-typescript";
import { Author } from "./Author";
import { AuthorsForArticle } from "./AuthorsForArticle";
import { Magazine } from "./Magazine";

export interface ArticleCreater{
	title: string;
	subarea: string;
	magazineId: number;
}

@Table
export class Article extends Model{
	@Column({ primaryKey: true, autoIncrement: true })
		id: number;
	@Column
		title: string;
	@Column
		subarea: string;
	@ForeignKey(() => Magazine)
	@Column
		magazineId: number;
	@BelongsToMany(() => Author, () => AuthorsForArticle)
		authors: Author[];
	@BelongsTo(() => Magazine)
		magazine: Magazine;
}
