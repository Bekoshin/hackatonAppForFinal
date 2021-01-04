import {Role} from '../../models/Role';

export const parseRole = (json: any): Role => {
  const role: Role = {
    id: json.id,
    name: json.name,
  };
  if (json.created_at) {
    role.createdAt = new Date(json.created_at);
  }
  if (json.updated_at) {
    role.updatedAt = new Date(json.updated_at);
  }
  return role;
};
