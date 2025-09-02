import { Module } from "@nestjs/common";
import { AppController } from "./controller/AppController";
import { providers } from "./config/config";


@Module({
	controllers: [ AppController ],
	providers
})
export class AppModule {}