import { Sequelize } from "sequelize-typescript";
import { Article } from "./models/Article";
import { Author } from "./models/Author";
import { Chapter } from "./models/Chapter";
import { Magazine } from "./models/Magazine";
import { AuthorsForArticle } from "./models/AuthorsForArticle";

export const sequelize = new Sequelize({
	database: "test",
	username: "test",
	password: "test",
	port: 8888,
	dialect: "postgres"
});


sequelize.addModels([ Article,Author,Chapter,Magazine,AuthorsForArticle ]);