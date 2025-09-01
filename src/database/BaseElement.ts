export interface BaseElement<V,C,T>{
	getsAll:(pagination?: {limit?: number, skip?: number},proyection?:Array<keyof T & string>) => Promise<Array<V>>;
	getElement: (id:number) => Promise<V | undefined>;
	createElement: (element: C) => Promise<number>;
	editElement: (id:number,changes: {[Property in keyof C]: C[Property]}) => Promise<V | undefined>;
	editElements: (target:Partial<T>,changes: Partial<T>) => Promise<void>;
}