import ImagePicker from 'react-native-image-crop-picker';

export const createPhoto = async () => {
  try {
    const image = await ImagePicker.openCamera({
      mediaType: 'photo',
    });
    return image;
  } catch (error) {
    console.log('CREATE PHOTO ERROR: ', error);
    throw error;
  }
};
