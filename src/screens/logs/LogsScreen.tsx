import React, {useLayoutEffect} from 'react';
import {FlatList, SafeAreaView, View} from 'react-native';
import {styles} from './styles';
import {RouteProp} from '@react-navigation/native';
import {IdeaStackParamList} from '../../stacks/IdeaStack';
import {StackNavigationProp} from '@react-navigation/stack';
import {StatusChange} from '../../models/StatusChange';
import {StatusChangeCard} from '../../components/statusChangeCard/StatusChangeCard';
import {HeaderRight} from '../../components/headerRight/HeaderRight';

type LogsScreenProps = {
  route: RouteProp<IdeaStackParamList, 'Logs'>;
  navigation: StackNavigationProp<IdeaStackParamList, 'Logs'>;
};

export const LogsScreen = (props: LogsScreenProps) => {
  const {navigation, route} = props;
  const {statusChanges} = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRightContainerStyle: styles.headerRightContainer,
      headerRight: () => (
        <HeaderRight title="Движение" onBackButtonPress={navigation.goBack} />
      ),
    });
  }, [navigation]);

  const renderItem = ({item}: {item: StatusChange}) => {
    return <StatusChangeCard statusChange={item} />;
  };

  return (
    <View style={styles.mainContainer}>
      <SafeAreaView style={styles.mainContainer}>
        <FlatList
          contentContainerStyle={styles.flatListContentContainer}
          data={statusChanges}
          bounces={false}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          onEndReachedThreshold={0.5}
        />
      </SafeAreaView>
    </View>
  );
};
