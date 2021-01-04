import {IEntity} from './IEntity';

export interface Category extends IEntity<number> {
  name: string;
  createdAt: Date;
}
