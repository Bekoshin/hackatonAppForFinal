import * as Keychain from 'react-native-keychain';
import {endpoints} from '../constants/endpoints';

export const getTokenFromKeychain = async (): Promise<string | null> => {
  const company = endpoints.base;
  if (await Keychain.hasInternetCredentials(company)) {
    const credentials = await Keychain.getInternetCredentials(company);
    if (credentials) {
      return credentials.password;
    }
  }
  return null;
};

export const setTokenToKeychain = async (username: string, token: string) => {
  const company = endpoints.base;
  await Keychain.setInternetCredentials(company, username, token);
};

export const deleteToken = async () => {
  const company = endpoints.base;
  if (company) {
    await Keychain.resetInternetCredentials(company);
  }
};
