import React from 'react';
import {File} from '../../models/File';
import {MssButton} from '../../components/mssButton/MssButton';
import {styles} from './styles';
import {FlatList, View} from 'react-native';
import {FileComponent} from '../../components/fileComponent/FileComponent';

type FilesViewProps = {
  editable: boolean;
  files: File[];
  ideaId: number | undefined;
  onDeletePress: (file: File) => Promise<void>;
  onAddFile: () => Promise<void>;
};

export const FilesView = (props: FilesViewProps) => {
  const {editable, files, ideaId, onAddFile, onDeletePress} = props;
  console.log('files: ', files);
  const renderItem = ({item}: {item: File}) => {
    return (
      <View style={styles.photoContainer} key={item.id}>
        <FileComponent
          file={item}
          editable={editable}
          onDeletePress={onDeletePress}
          resizeMode="contain"
        />
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <FlatList
        contentContainerStyle={styles.flatListContentContainer}
        data={files}
        bounces={false}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        onEndReachedThreshold={0.5}
      />
      {ideaId && editable ? (
        <MssButton style={styles.button} label="Добавить" onPress={onAddFile} />
      ) : null}
    </View>
  );
};
