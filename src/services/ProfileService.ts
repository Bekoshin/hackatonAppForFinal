import {endpoints} from '../constants/endpoints';
import {getTokenFromKeychain} from '../utils/JwtTokenUtils';
import {safeFetch} from '../utils/FetchUtils';
import {User} from '../models/User';
import {parseUser} from './parsers/UserParser';

export class ProfileService {
  constructor() {}

  getProfile = async (): Promise<User> => {
    try {
      const endpoint = endpoints.base + endpoints.profile;
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
        const profile = parseUser(json.user);
        return profile;
      } else {
        throw {name: 'Error', message: 'Not found profile json'};
      }
    } catch (error) {
      console.log('GET PROFILE ERROR: ', error);
      throw error;
    }
  };

  updateAvatar = async (
    uri: string,
    fileName: string,
    type: string,
  ): Promise<User> => {
    try {
      const endpoint = endpoints.base + endpoints.profile;
      const jwtToken = await getTokenFromKeychain();
      if (!jwtToken) {
        throw {name: 'Error', message: 'Jwt token not found on device'};
      }

      let formData = new FormData();
      formData.append('avatar', {uri: uri, name: fileName, type: type});

      const init = {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${jwtToken}`,
        },
        body: formData,
      };

      const json = await safeFetch(endpoint, init);
      console.log('json: ', json);
      if (json) {
        return parseUser(json.user);
      } else {
        throw {name: 'Error', message: "Can't add file"};
      }
    } catch (error) {
      console.log('UPDATE AVATAR ERROR: ', error);
      throw error;
    }
  };
}
