import {StatusChange} from '../../models/StatusChange';
import {parseUser} from './UserParser';

export const parseStatusChange = (json: any): StatusChange => {
  return {
    id: json.id,
    createdAt: new Date(json.created_at),
    status: json.status,
    user: parseUser(json.user),
  };
};
