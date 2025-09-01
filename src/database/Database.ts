import { Magazine, MagazineCreator } from "Interfaces/elements/Magazine";
import { Article } from "../Interfaces/elements/Article";
import { Author, AuthorCreator } from "../Interfaces/elements/Author";
import { Chapter, ChapterCreator } from "Interfaces/elements/Chapter";
import { BaseElement } from "./BaseElement";
import { ArticleCreater } from "./postgresqlDatabase/models/Article";

export abstract class Database{
	authors: BaseElement<Author,AuthorCreator,Author>;
	magazines: BaseElement<Magazine,MagazineCreator,Magazine>;
	articles: BaseElement<Article,ArticleCreater, ArticleCreater>;
	chapters: BaseElement<Chapter, ChapterCreator, ChapterCreator>;

	getArticlesByAuthor: (authorId: number,pagination?: {skip?: number,limit?: number}) => Promise<Array<Article>>;

	connect: () => Promise<void>;
	end: () => Promise<void>;
}