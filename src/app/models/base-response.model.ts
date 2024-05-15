import { IProduct } from "./product.model";

export interface IBaseResponse<T> {
    ms: number;
    result: T
}

export interface IResponseProductsByCategory {
    _id: string;
    title: string;
    products: IProduct[]
}