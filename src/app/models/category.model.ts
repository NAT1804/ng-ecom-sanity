import { IRef } from './ref.model';
import { EType } from './type.enum';

export interface ICategory {
  description: string;
  parents?: IRef[];
  slug: { current: string; _type: string };
  title: string;
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
}