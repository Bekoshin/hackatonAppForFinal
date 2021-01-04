import {endpoints} from '../constants/endpoints';
import {getTokenFromKeychain} from '../utils/JwtTokenUtils';
import {User} from '../models/User';
import {safeFetch} from '../utils/FetchUtils';
import {parseUser} from './parsers/UserParser';

export class UserService {
  constructor() {}

  getUsers = async (page: number, pageSize: number) => {
    try {
      const endpoint =
        endpoints.base +
        endpoints.users +
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

      const users: User[] = [];
      const json = await safeFetch(endpoint, init);
      if (json && json.page.number <= json.page.pages_count) {
        for (let jsonUser of json.items) {
          users.push(parseUser(jsonUser));
        }
      }
      return users;
    } catch (error) {
      console.log('GET USERS ERROR: ', error);
      throw error;
    }
  };

  createUser = async (
    email: string,
    name: string,
    password: string,
    roleId: number,
  ): Promise<User> => {
    try {
      const endpoint = endpoints.base + endpoints.users;
      const jwtToken = await getTokenFromKeychain();
      if (!jwtToken) {
        throw {name: 'Error', message: 'Jwt token not found on device'};
      }

      const body = {
        email: email,
        name: name,
        password: password,
        role_id: roleId,
      };

      const init = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify(body),
      };

      const json = await safeFetch(endpoint, init);
      if (json) {
        return parseUser(json);
      } else {
        throw {name: 'Error', message: 'Not found user json'};
      }
    } catch (error) {
      console.log('CREATE USER ERROR: ', error);
      throw error;
    }
  };

  getUser = async (id: number): Promise<User | null> => {
    try {
      const endpoint = endpoints.base + endpoints.users + `/${id}`;
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

      const json = await safeFetch(endpoint, init);
      if (json) {
        return parseUser(json);
      } else {
        return null;
      }
    } catch (error) {
      console.log('GET USER ERROR: ', error);
      throw error;
    }
  };

  updateUser = async (
    id: number,
    email: string,
    name: string,
    password: string,
    roleId: number,
  ): Promise<User | null> => {
    try {
      const endpoint = endpoints.base + endpoints.users + `/${id}`;
      const jwtToken = await getTokenFromKeychain();
      if (!jwtToken) {
        throw {name: 'Error', message: 'Jwt token not found on device'};
      }

      const body = {
        email: email,
        name: name,
        password: password,
        role_id: roleId,
      };

      const init = {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify(body),
      };

      const json = await safeFetch(endpoint, init);
      if (json) {
        return parseUser(json);
      } else {
        return null;
      }
    } catch (error) {
      console.log('UPDATE USER ERROR: ', error);
      throw error;
    }
  };

  deleteUser = async (id: number) => {
    try {
      const endpoint = endpoints.base + endpoints.users + `/${id}`;
      const jwtToken = await getTokenFromKeychain();
      if (!jwtToken) {
        throw {name: 'Error', message: 'Jwt token not found on device'};
      }

      const init = {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        },
      };

      await safeFetch(endpoint, init);
    } catch (error) {
      console.log('DELETE USER ERROR: ', error);
      throw error;
    }
  };
}
