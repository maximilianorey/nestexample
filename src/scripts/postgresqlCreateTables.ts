import { sequelize } from "database/postgresqlDatabase/Sequelize";

async function run(force?:boolean){
	await sequelize.sync({ force });
	await sequelize.close();
}

const force = process.argv.findIndex(x => x==="--force")!==-1;

run(force).catch(console.error);