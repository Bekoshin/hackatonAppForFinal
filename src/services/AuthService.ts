import {endpoints} from '../constants/endpoints';
import {safeFetch} from '../utils/FetchUtils';
import {getTokenFromKeychain} from '../utils/JwtTokenUtils';

export class AuthService {
  constructor() {}

  signIn = async (login: string, password: string): Promise<string> => {
    const endpoint = endpoints.base + endpoints.signIn;
    const body = {
      user: {
        email: login,
        password: password,
      },
    };

    const init = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };

    try {
      const json = await safeFetch(endpoint, init);
      console.log('json: ', json);
      if (json.jwt) {
        return json.jwt;
      } else {
        throw {name: 'Error', message: 'Not found jwt'};
      }
    } catch (error) {
      console.log('SIGN IN ERROR: ', error);
      throw error;
    }
  };

  signOut = async () => {
    try {
      const endpoint = endpoints.base + endpoints.signOut;
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
      console.log('SIGN OUT ERROR: ', error);
      throw error;
    }
  };

  restorePassword = async (email: string) => {
    const endpoint = endpoints.base + endpoints.password;

    const body = {
      user: {
        email: email,
      },
    };

    const init = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };

    try {
      await safeFetch(endpoint, init);
    } catch (error) {
      console.log('RESTORE PASSWORD ERROR: ', error);
      throw error;
    }
  };
}
