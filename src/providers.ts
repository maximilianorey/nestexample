import { Database } from "./database/Database";
import { PostgresqlDatabase } from "database/postgresqlDatabase/PostgresqlDatabase";

export const providers = [ { provide: Database, useClass: PostgresqlDatabase } ];