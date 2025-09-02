import { Controller,Get, Query,Param, Post, Put, Body, OnModuleDestroy, OnApplicationBootstrap, BadRequestException, NotFoundException } from "@nestjs/common";
import { Database } from "../database/Database";
import { Magazine, MagazineCreator } from "../Interfaces/elements/Magazine";
import { Author, AuthorCreator } from "../Interfaces/elements/Author";
import { Article, ArticleCreator } from "../Interfaces/elements/Article";

Date.prototype.toJSON = function (){
	return (this as Date).toISOString().split("T",1)[ 0 ];
};

function parseNumberParameter(value: string | undefined, name: string): number | undefined{
	if(value!==undefined && !/^[0-9]+$/.test(value)){
		throw new BadRequestException(`'${name}' parameter should be a number`);
	}
	return value && Number.parseInt(value,10);
}

@Controller()
export class AppController implements OnModuleDestroy, OnApplicationBootstrap{
	constructor(private readonly database: Database){
	}

  @Get("authors")
	async getAuthors(@Query("limit") limit: string,@Query("skip") skip: string){
		return this.database.magazines.getsAll({ limit: parseNumberParameter(limit,"limit"),skip: parseNumberParameter(skip,"skip") });
	}

  @Get("author/:id")
  async getAuthor(@Param("id") id: string): Promise<Author> {
  	const res = await this.database.authors.getElement(parseNumberParameter(id,"id"));
  	if(!res){
  		throw new NotFoundException("AUTHOR_NOT_FOUND",`Author with id '${id}' not found`);
  	}
  	return res;
  }

  @Post("author")
  async createAuthor(@Body() author: AuthorCreator){
  	return { id: await this.database.authors.createElement(author) };
  }


  @Put("author/:id")
  async editAuthor(@Param("id") id: string, @Body() author: AuthorCreator): Promise<void> {
  	const res = await this.database.authors.editElement(parseNumberParameter(id,"id"),author);
  	if(!res){
  		throw new NotFoundException("AUTHOR_NOT_FOUND",`Author with id '${id}' not found`);
  	}
  }

  @Get("magazines")
  getMagazines(@Query("limit") limit: string,@Query("skip") skip: string){
  	return this.database.magazines.getsAll({ limit: parseNumberParameter(limit,"limit"),skip: parseNumberParameter(skip,"skip")  });
  }
    
  @Get("magazine/:id")
  async getMagazine(@Param("id") id: string): Promise<Magazine | undefined> {
  	const res = await this.database.magazines.getElement(parseNumberParameter(id,"id"));
  	if(!res){
  		throw new NotFoundException("MAGAZINE_NOT_FOUND",`Magazine with id '${id}' not found`);
  	}
  	return res;
  }

  @Post("magazine")
  async createMagazine(@Body() magazine: Magazine){
  	return { id: await this.database.magazines.createElement(magazine) };
  }

  @Put("magazine/:id")
  async editMagazine(@Param("id") id: string, @Body() magazine: MagazineCreator): Promise<void> {
  	const res = await this.database.magazines.editElement(parseNumberParameter(id,"id"),magazine);
  	if(!res){
  		throw new NotFoundException("MAGAZINE_NOT_FOUND",`Magazine with id '${id}' not found`);
  	}
  }



@Get("articles")
  async getArticles(@Query("limit") limit: string,@Query("skip") skip: string){
  	return this.database.magazines.getsAll({ limit: parseNumberParameter(limit,"limit"),skip: parseNumberParameter(skip,"skip") });
  }

  @Get("article/:id")
async getArticle(@Param("id") id: string): Promise<Article> {
  	const res = await this.database.articles.getElement(parseNumberParameter(id,"id"));
  	if(!res){
  		throw new NotFoundException("ARTICLE_NOT_FOUND",`Article with id '${id}' not found`);
  	}
  	return res;
}

  @Post("article")
  async createArticle(@Body() article: ArticleCreator){
  	return { id: await this.database.articles.createElement(article) };
  }


  @Put("article/:id")
  async editArticle(@Param("id") id: string, @Body() article: ArticleCreator): Promise<void> {
  	const res = await this.database.articles.editElement(parseNumberParameter(id,"id"),article);
  	if(!res){
  		throw new NotFoundException("ARTICLE_NOT_FOUND",`Article with id '${id}' not found`);
  	}
  }


  async onModuleDestroy(){
  	await this.database.end();
  }

  async onApplicationBootstrap(){
  	await this.database.connect();
  }

}