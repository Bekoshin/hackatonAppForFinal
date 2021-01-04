import {File} from '../../models/File';

export const parseFile = (json: any): File => {
  return {
    id: json.id,
    url: json.url,
    name: json.name,
  };
};
