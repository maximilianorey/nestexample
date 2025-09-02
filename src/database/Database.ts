import { Magazine, MagazineCreator } from "Interfaces/elements/Magazine";
import { Article } from "../Interfaces/elements/Article";
import { Author, AuthorCreator } from "../Interfaces/elements/Author";
import { Chapter, ChapterCreator } from "Interfaces/elements/Chapter";
import { DatabaseBaseFunctions } from "./DatabaseBaseFunctions";
import { ArticleCreater } from "./postgresqlDatabase/models/Article";

export abstract class Database{
	authors: DatabaseBaseFunctions<Author,AuthorCreator,Author>;
	magazines: DatabaseBaseFunctions<Magazine,MagazineCreator,Magazine>;
	articles: DatabaseBaseFunctions<Article,ArticleCreater, ArticleCreater>;
	chapters: DatabaseBaseFunctions<Chapter, ChapterCreator, ChapterCreator>;

	getArticlesByAuthor: (authorId: number,pagination?: {skip?: number,limit?: number}) => Promise<Array<Article>>;

	connect: () => Promise<void>;
	end: () => Promise<void>;
}