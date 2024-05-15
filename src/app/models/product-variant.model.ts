import { EType } from "./type.enum";
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

export interface IProductVariant {
    title: string;
    sku: string;
    price: number;
    images: SanityImageSource[]
    _type: string;
  }