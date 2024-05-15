import { PortableTextBlock } from '@portabletext/types';
import { EType } from './type.enum';
import { IProductVariant } from './product-variant.model';
import { IRef } from './ref.model';

export interface IProduct {
  _id: string;
  _type: string;
  _rev: string;
  _createdAt: string;
  _updateAt: string;
  title: string;
  tags: string[];
  blurb?: string;
  slug: {
    current: string;
    _type: string;
  };
  categories: IRef[];
  defaultProductVariant: IProductVariant;
  body?: PortableTextBlock[];
}