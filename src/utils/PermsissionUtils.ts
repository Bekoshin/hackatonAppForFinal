import {Idea} from '../models/Idea';

export const hasPermissionToEdit = (idea: Idea) => {
  return ['new', 'revision'].includes(idea.status);
}
