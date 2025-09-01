import { Controller,Get, Query,Param, Post, Put, Body, OnModuleDestroy, OnApplicationBootstrap, BadRequestException, NotFoundException } from "@nestjs/common";
import { Database } from "../database/Database";
import { Magazine, MagazineCreator } from "../Interfaces/elements/Magazine";
import { Author, AuthorCreator } from "../Interfaces/elements/Author";
import { Article, ArticleCreator } from "../Interfaces/elements/Article";

Date.prototype.toJSON = function (){
	return (this as Date).toISOString().split("T",1)[ 0 ];
};

@Controller()
export class AppController implements OnModuleDestroy, OnApplicationBootstrap{
	constructor(private readonly database: Database){
	}

  @Get("author")
	async getAuthors(@Query("limit") limit: string,@Query("skip") skip: string){
		if(limit!==undefined && !/^[0-9]+$/.test(limit)){
			throw new BadRequestException("'limit' query param should be a number");
		}
		if(skip!==undefined && !/^[0-9]+$/.test(skip)){
			throw new BadRequestException("'skip' query param should be a number");
		}
		return this.database.magazines.getsAll({ limit: limit && Number.parseInt(limit,10),skip: skip && Number.parseInt(skip,10) });
	}

  @Get("author/:id")
  async getAuthor(@Param("id") id: string): Promise<Author> {
  	if(!/^[0-9]+$/.test(id)){
  		throw new BadRequestException("'id' parameter should be a number");
  	}
  	const res = await this.database.authors.getElement(Number.parseInt(id,10));
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
  async editAuthor(@Param("id") id: string, @Body() author: AuthorCreator): Promise<Author> {
  	if(!/^[0-9]+$/.test(id)){
  		throw new BadRequestException("'id' parameter should be a number");
  	}
  	const res = await this.database.authors.editElement(Number.parseInt(id,10),author);
  	if(!res){
  		throw new NotFoundException("AUTHOR_NOT_FOUND",`Author with id '${id}' not found`);
  	}
  	return res;
  }

  @Get("magazine")
  getMagazines(@Query("limit") limit: string,@Query("skip") skip: string){
  	if(limit!==undefined && !/^[0-9]+$/.test(limit)){
  		throw new BadRequestException("'limit' query param should be a number");
  	}
  	if(skip!==undefined && !/^[0-9]+$/.test(skip)){
  		throw new BadRequestException("'skip' query param should be a number");
  	}
    
  	return this.database.magazines.getsAll({ limit: limit && Number.parseInt(limit,10),skip: skip && Number.parseInt(skip,10) });
  }
    
  @Get("magazine/:id")
  async getMagazine(@Param("id") id: string): Promise<Magazine | undefined> {
  	if(!/^[0-9]+$/.test(id)){
  		throw new BadRequestException("'id' parameter should be a number");
  	}
  	const res = await this.database.magazines.getElement(Number.parseInt(id,10));
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
  async editMagazine(@Param("id") id: string, @Body() magazine: MagazineCreator): Promise<Magazine|undefined> {
  	if(!/^[0-9]+$/.test(id)){
  		throw new BadRequestException("'id' parameter should be a number");
  	}
  	const res = await this.database.magazines.editElement(Number.parseInt(id,10),magazine);
  	if(!res){
  		throw new NotFoundException("MAGAZINE_NOT_FOUND",`Magazine with id '${id}' not found`);
  	}
  	return res;
  }



@Get("article")
  async getArticles(@Query("limit") limit: string,@Query("skip") skip: string){
  	if(limit!==undefined && limit!==undefined && !/^[0-9]+$/.test(limit)){
  		throw new BadRequestException("'limit' query param should be a number");
  	}
  	if(skip!==undefined && !/^[0-9]+$/.test(skip)){
  		throw new BadRequestException("'skip' query param should be a number");
  	}
  	return this.database.magazines.getsAll({ limit: limit && Number.parseInt(limit,10),skip: skip && Number.parseInt(skip,10) });
  }

  @Get("article/:id")
async getArticle(@Param("id") id: string): Promise<Article> {
  	if(!/^[0-9]+$/.test(id)){
  		throw new BadRequestException("'id' parameter should be a number");
  	}
  	const res = await this.database.articles.getElement(Number.parseInt(id,10));
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
  async editArticle(@Param("id") id: string, @Body() article: ArticleCreator): Promise<Article> {
  	if(!/^[0-9]+$/.test(id)){
  		throw new BadRequestException("'id' parameter should be a number");
  	}
  	const res = await this.database.articles.editElement(Number.parseInt(id,10),article);
  	if(!res){
  		throw new NotFoundException("ARTICLE_NOT_FOUND",`Article with id '${id}' not found`);
  	}
  	return res;
  }


  async onModuleDestroy(){
  	await this.database.end();
  }

  async onApplicationBootstrap(){
  	await this.database.connect();
  }

}