import {Category} from '../../models/Category';

export const parseCategory = (json: any): Category => {
  return {
    id: json.id,
    name: json.name,
    createdAt: new Date(json.created_at),
  };
};
