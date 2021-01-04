import {IEntity} from './IEntity';

export interface User extends IEntity<number> {
  name: string;
  email: string;
  birthday: number | null;
  education: string | null;
  experience: number | null;
  department: {
    id: number | null;
    name: string | null;
  };
  position: {
    id: number | null;
    name: string | null;
  };
  role: {
    id: number;
    name: string;
  };
  avatar: string;
}
