import {User} from '../../models/User';

export const parseUser = (json: any): User => {
  return {
    id: json.id,
    name: json.name,
    email: json.email,
    birthday: json.birthday,
    education: json.education,
    experience: json.work_experience,
    department: json.department,
    position: json.position,
    role: json.role,
    avatar: json.avatar,
  };
};
