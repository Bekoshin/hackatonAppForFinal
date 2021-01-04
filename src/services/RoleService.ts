import {endpoints} from '../constants/endpoints';
import {getTokenFromKeychain} from '../utils/JwtTokenUtils';
import {Role} from '../models/Role';
import {safeFetch} from '../utils/FetchUtils';
import {parseRole} from './parsers/RoleParser';

export class RoleService {
  constructor() {}

  getRoles = async (page: number, pageSize: number): Promise<Role[]> => {
    try {
      const endpoint =
        endpoints.base +
        endpoints.roles +
        `?page=${page}&page_size=${pageSize}`;
      const jwtToken = await getTokenFromKeychain();
      if (!jwtToken) {
        throw {name: 'Error', message: 'Jwt token not found on device'};
      }

      const init = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        },
      };

      const roles: Role[] = [];
      const json = await safeFetch(endpoint, init);
      if (json && json.page.number <= json.page.pages_count) {
        for (let jsonRole of json.items) {
          roles.push(parseRole(jsonRole));
        }
      }
      return roles;
    } catch (error) {
      console.log('GET ROLES ERROR: ', error);
      throw error;
    }
  };
}
