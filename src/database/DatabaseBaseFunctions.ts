export interface DatabaseBaseFunctions<V,C,T>{
	getsAll:(pagination?: {limit?: number, skip?: number},proyection?:Array<keyof T & string>) => Promise<Array<V>>;
	getElement: (id:number) => Promise<V | null>;
	createElement: (element: C) => Promise<number>;
	editElement: (id:number,changes: {[Property in keyof C]: C[Property]}) => Promise<boolean>;
	editElements: (target:Partial<C>,changes: Partial<C>) => Promise<void>;
}