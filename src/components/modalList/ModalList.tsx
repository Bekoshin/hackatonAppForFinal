import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {NativeSyntheticEvent, NativeScrollEvent} from 'react-native';
import {styles} from './styles';
import {SearchBar} from '../searchBar/SearchBar';
import {MssModal} from '../mssModal/MssModal';
import {MssButton} from '../mssButton/MssButton';
import {LoadingView} from '../loadingView/LoadingView';
import {IEntity} from '../../models/IEntity';

type ModalListProps<T extends IEntity<number>> = {
  visible: boolean;
  onSwipeComplete: () => void;
  data: T[];
  selectedItem: T | undefined;
  selectedItems?: T[];
  onSelectItem: (item: T) => void;
  loading?: boolean;
  onBackdropPress?: () => void;
  updateDataBySearchQuery: (query: string) => Promise<void>;
  renderItem: (
    item: T,
    onPress: (item: T) => void,
    isSelected: boolean,
  ) => JSX.Element | null;
  onAddButtonPress?: () => void;
};

export const ModalList = <T extends IEntity<number>>(
  props: ModalListProps<T>,
) => {
  const {
    visible,
    onSwipeComplete,
    data,
    selectedItem,
    selectedItems,
    onSelectItem,
    onBackdropPress,
    loading,
    updateDataBySearchQuery,
    renderItem,
    onAddButtonPress,
  } = props;

  const [searchQuery, setSearchQuery] = useState('');
  const [scrollOffset, setScrollOffset] = useState<undefined | number>(
    undefined,
  );
  const [flatList, setFlatList] = useState<FlatList<T> | null>(null);

  useEffect(() => {
    const updateData = async () => {
      await updateDataBySearchQuery(searchQuery.toLowerCase());
    };
    updateData();
  }, [searchQuery, updateDataBySearchQuery]);

  const handleOnScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    setScrollOffset(event.nativeEvent.contentOffset.y);
  };
  const handleScrollTo = (p: {animated?: boolean; offset: number}) => {
    if (flatList) {
      flatList.scrollToOffset(p);
    }
  };

  const clearSearchQuery = () => {
    setSearchQuery('');
  };

  const renderFlatListItem = ({item}: {item: T}) => {
    const handlePressItem = () => {
      clearSearchQuery();
      onSelectItem(item);
    };
    let isSelected =
      (!!selectedItem && selectedItem.id === item.id) ||
      (!!selectedItems &&
        !!selectedItems.find((value) => value.id === item.id));

    return renderItem(item, handlePressItem, isSelected);
  };

  return (
    <MssModal
      style={styles.modal}
      scrollTo={handleScrollTo}
      scrollOffset={scrollOffset}
      visible={visible}
      onSwipeComplete={onSwipeComplete}
      avoidKeyboard={false}
      onBackdropPress={onBackdropPress}>
      <SearchBar
        style={styles.searchbar}
        value={searchQuery}
        onChangeText={setSearchQuery}
        onClearButtonPress={clearSearchQuery}
      />
      {loading ? (
        <LoadingView />
      ) : (
        <>
          <FlatList
            contentContainerStyle={styles.flatListContainerStyle}
            keyExtractor={(item) => (item.id as number).toString()}
            bounces={false}
            showsVerticalScrollIndicator={false}
            ref={setFlatList}
            onScroll={handleOnScroll}
            scrollEventThrottle={16}
            data={data}
            renderItem={renderFlatListItem}
            keyboardShouldPersistTaps="always"
          />
          {onAddButtonPress ? (
            <MssButton
              style={styles.addButton}
              label="Добавить"
              onPress={onAddButtonPress}
            />
          ) : null}
        </>
      )}
    </MssModal>
  );
};
