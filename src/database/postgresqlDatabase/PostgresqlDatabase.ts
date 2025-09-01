import { Database } from "../Database";
import { Article, ArticleCreater } from "./models/Article";
import { Article as ArticleInterface } from "../../Interfaces/elements/Article";
import { Author } from "./models/Author";
import { AuthorCreator, Author as AuthorInterface } from "../../Interfaces/elements/Author";
import { Chapter } from "./models/Chapter";
import { ChapterCreator, Chapter as ChapterInterface } from "../../Interfaces/elements/Chapter";
import { Magazine } from "./models/Magazine";
import { MagazineCreator, Magazine as MagazineInterface } from "../../Interfaces/elements/Magazine";
import { PostgresqlBaseElement } from "./PostgresqlBaseElement";
import { sequelize } from "./Sequelize";

export class PostgresqlDatabase implements Database{
	authors = new PostgresqlBaseElement<AuthorInterface, AuthorCreator,Author>(Author,(x) => x.dataValues, x => new Author({ ...x }));
	magazines = new PostgresqlBaseElement<MagazineInterface,MagazineCreator,Magazine>(Magazine,(x) => x.dataValues,x => new Magazine({ ...x }));
	articles = new PostgresqlBaseElement<ArticleInterface,ArticleCreater,Article>(Article,(x) => x.dataValues, x => new Article({ ...x }));
	chapters  = new PostgresqlBaseElement<ChapterInterface,ChapterCreator,Chapter>(Chapter,(x) => x.dataValues, x => new Chapter({ ...x }));

	getArticlesByAuthor = async (authorId: number,pagination?: {skip?: number,limit?: number}) => {
		return Article.findAll({
			where: {
				authorId
			},
			offset: pagination?.skip,
			limit: pagination?.limit
		}) as Promise<Array<ArticleInterface>>;
	};
	
	connect = () => Promise.resolve();
	end = () => sequelize.close();
}