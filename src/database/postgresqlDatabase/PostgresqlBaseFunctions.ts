import { DatabaseBaseFunctions } from "database/DatabaseBaseFunctions";
import { Attributes, Model, ModelStatic, WhereAttributeHashValue } from "sequelize";

export class PostgresqlBaseFunctions<V,C,T extends Model & {id: number}> implements DatabaseBaseFunctions<V,C,T>{
	constructor(private readonly model: ModelStatic<T>,private readonly toObject: (entry: T) => V,private readonly toModel: (entry: Partial<C>) => Partial<T>){}
	getsAll = async (pagination?: {limit?: number, skip?: number},proyection?:Array<keyof T & string>) => {
		const res = await this.model.findAll({ ...pagination, attributes: { include: proyection } });
		const q: V[] = res.map(this.toObject);
		return q;
	};
	getElement = async (id: number) => {
		const res = await this.model.findByPk(id);
		return res && this.toObject(res);
	};
	createElement = async (element: C) => {
		const res = await this.toModel(element).save({ returning: [ "id" ] });
		return res.id;
	};
	editElement = async(id: number,changes: {[Property in keyof C]: C[Property]}) => {
		const where: WhereAttributeHashValue<Attributes<T & { id: number; }>> = { id };
		return (await this.model.update(changes, { where }))[ 0 ] > 0;
	};

	editElements = async (target: Partial<C>, changes: Partial<C>) => {
		const where: WhereAttributeHashValue<Attributes<T & { id: number; }>> = this.toModel(target);
		await this.model.update(this.toModel(changes), { where });
	};
}
