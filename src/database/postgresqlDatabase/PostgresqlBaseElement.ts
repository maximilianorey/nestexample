import { BaseElement } from "database/BaseElement";
import { Attributes, Model, ModelStatic, WhereAttributeHashValue } from "sequelize";

export class PostgresqlBaseElement<V,C,T extends Model & {id: number}> implements BaseElement<V,C,T>{
	constructor(private readonly model: ModelStatic<T>,private readonly toObject: (entry: T) => V,private readonly toModel: (entry: C) => T){}
	getsAll = async (pagination?: {limit?: number, skip?: number},proyection?:Array<keyof T & string>) => {
		const res = await this.model.findAll({ ...pagination, attributes: { include: proyection } });
		const q: V[] = res.map(this.toObject);
		return q;
	};
	getElement = async (id: number) => {
		return this.toObject(await this.model.findByPk(id));
	};
	createElement = async (element: C) => {
		const res = await this.toModel(element).save({ returning: [ "id" ] });
		return res.id;
	};
	editElement = async (id: number,changes: {[Property in keyof C]: C[Property]}) => {
		const where: WhereAttributeHashValue<Attributes<T & { id: number; }>> = { id };
		const res = await this.model.update(changes, { where, returning: true });
		return this.toObject(res[ 1 ][ 0 ].previous() as T);
	};

	editElements = async (target: Partial<T>, changes: Partial<T>) => {
		const where: WhereAttributeHashValue<Attributes<T & { id: number; }>> = target;
		await this.model.update(changes, { where });
	};
}
