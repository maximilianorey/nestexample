import { Article } from "./Article";

export interface ChapterCreator{
    articleId: number
    number: number
}

export interface Chapter{
    id:number,
    article: Article
    number: number
}