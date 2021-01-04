import {User} from './User';

export interface Expert {
  user: User;
  approve: boolean | null;
}
