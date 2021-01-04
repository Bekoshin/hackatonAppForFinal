import DocumentPicker from 'react-native-document-picker';
import {IdeaService} from '../services/IdeaService';

export const addFile = async (ideaId: number) => {
  try {
    const response = await DocumentPicker.pick({
      type: [DocumentPicker.types.allFiles],
    });
    console.log('response: ', response);

    const ideaService = new IdeaService();
    const file = await ideaService.addIdeaFile(
      ideaId,
      response.uri,
      response.name,
      response.type,
    );
    console.log('file: ', file);
    return file;
  } catch (error) {
    if (DocumentPicker.isCancel(error)) {
      // User cancelled the picker, exit any dialogs or menus and move on
    } else {
      throw error;
    }
  }
};
