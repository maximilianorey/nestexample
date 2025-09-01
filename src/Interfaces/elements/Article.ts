import { Magazine } from "database/postgresqlDatabase/models/Magazine";
import { Author } from "./Author";

export interface ArticleCreator{
    title: string,
    subarea: string,
    magazineId: number,
    authorsId: Array<number>
}

export interface Article{
    id: number,
    title: string,
    subarea: string,
    magazine: Magazine,
    authors: Array<Author>
}