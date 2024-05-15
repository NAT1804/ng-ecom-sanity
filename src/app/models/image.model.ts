import { EType } from './type.enum';

export interface IImage {
  asset: {
    _ref: string;
    _type: EType.REFERENCE;
  };
  _key: string;
  _type: EType.IMAGE;
}
