import {User} from './User';

export interface StatusChange {
  id: number;
  createdAt: Date;
  status: string;
  user: User;
}
