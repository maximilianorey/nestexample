import { Module } from "@nestjs/common";
import { AppController } from "./controller/AppController";
import { providers } from "providers";


@Module({
	controllers: [ AppController ],
	providers
})
export class AppModule {}