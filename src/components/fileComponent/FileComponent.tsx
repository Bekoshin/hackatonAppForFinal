import {
  Dimensions,
  Image,
  StyleProp,
  TouchableHighlight,
  TouchableOpacity,
  View,
  ViewStyle,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import {COLORS} from '../../constants/colors';
import {LineAwesomeIcon} from '../../constants/LineAwesomeIconSet';
import {File} from '../../models/File';
import {endpoints} from '../../constants/endpoints';
import {
  EXCEL_TYPES,
  FILE_DIR,
  IMAGE_TYPES,
  PDF_TYPES,
  VIDEO_TYPES,
  WORD_TYPES,
} from '../../constants/constants';
import RNFetchBlob from 'rn-fetch-blob';

const windowWidth = Dimensions.get('window').width;
const fileWidth = (windowWidth - 52) / 2;

type FileComponentProps = {
  style?: StyleProp<ViewStyle>;
  file: File;
  resizeMode: 'contain' | 'stretch';
  onDeletePress: (file: File) => void;
  editable: boolean;
};

export const FileComponent = (props: FileComponentProps) => {
  const {style, file, resizeMode, onDeletePress, editable} = props;

  const getType = () => {
    const index = file.url.lastIndexOf('.') + 1;
    return file.url.slice(index);
  };

  const [type] = useState(getType());

  const renderDeleteButton = () => {
    if (editable && onDeletePress) {
      return (
        <TouchableOpacity
          style={styles.deleteIcon}
          onPress={() => onDeletePress(file)}>
          <LineAwesomeIcon name="close" color={COLORS.PRIMARY_DARK} size={16} />
        </TouchableOpacity>
      );
    }
  };

  const renderImage = () => {
    if (['png', 'jpeg', 'jpg'].includes(type)) {
      return (
        <Image
          resizeMode={resizeMode}
          style={[
            styles.image,
            {
              width: fileWidth,
              height: fileWidth,
            },
          ]}
          width={fileWidth}
          height={fileWidth}
          source={{uri: endpoints.baseForPhoto + file.url}}
        />
      );
    } else {
      return (
        <LineAwesomeIcon
          name="file"
          size={fileWidth}
          color={COLORS.SECONDARY_DARK_2}
        />
      );
    }
  };

  const onPress = async () => {
    console.log('on press');
    const path = FILE_DIR + '/' + file.name;
    let extension = file.name.substring(file.name.lastIndexOf('.') + 1);
    const mimetype = getMIMETypeByExtension(extension);

    RNFetchBlob.config({
      addAndroidDownloads: {
        useDownloadManager: true,
        title: 'Файл',
        description: 'Загрузка',
        mime: mimetype,
        mediaScannable: true,
        notification: true,
      },
    })
      .fetch('GET', endpoints.baseForPhoto + file.url)
      .then((res) => {
        openFile(res.path(), mimetype!);
      });
  };

  const openFile = (path: string, MIMEType: string) => {
    if (Platform.OS === 'ios') {
      RNFetchBlob.ios.openDocument(path);
    } else if (Platform.OS === 'android') {
      RNFetchBlob.android.actionViewIntent(path, MIMEType);
    }
  };

  const getMIMETypeByExtension = (extension: string) => {
    if (IMAGE_TYPES.includes(extension.toLowerCase())) {
      if (extension.toLowerCase() === 'png') {
        return `image/${extension}`;
      } else {
        return 'image/jpeg';
      }
    } else if (VIDEO_TYPES.includes(extension.toLowerCase())) {
      return `video/${extension}`;
    } else if (WORD_TYPES.includes(extension.toLowerCase())) {
      return 'application/msword';
    } else if (EXCEL_TYPES.includes(extension.toLowerCase())) {
      return 'application/vnd.ms-excel';
    } else if (PDF_TYPES.includes(extension.toLowerCase())) {
      return 'application/pdf';
    }
  };

  return (
    <TouchableHighlight
      style={[styles.touchableContainer, style]}
      onPress={onPress}
      activeOpacity={0.9}
      underlayColor={COLORS.PRIMARY_DARK}>
      <View style={styles.mainContainer}>
        <View style={styles.contentContainer}>
          {renderImage()}
          {renderDeleteButton()}
          {/*<Text style={[styles.note, {width: fileWidth}]}>{file.name}</Text>*/}
        </View>
      </View>
    </TouchableHighlight>
  );
};
