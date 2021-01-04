import React, {useLayoutEffect} from 'react';
import {RouteProp} from '@react-navigation/native';
import {IdeaStackParamList} from '../../stacks/IdeaStack';
import {StackNavigationProp} from '@react-navigation/stack';
import {FlatList, SafeAreaView, View} from 'react-native';
import {styles} from './styles';
import {Expert} from '../../models/Expert';
import {HeaderRight} from '../../components/headerRight/HeaderRight';
import {ExpertCard} from '../../components/expertCard/ExpertCard';

type ExpertsScreenProps = {
  route: RouteProp<IdeaStackParamList, 'Experts'>;
  navigation: StackNavigationProp<IdeaStackParamList, 'Experts'>;
};

export const ExpertsScreen = (props: ExpertsScreenProps) => {
  const {route, navigation} = props;
  const {experts} = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRightContainerStyle: styles.headerRightContainer,
      headerRight: () => (
        <HeaderRight title="Эксперты" onBackButtonPress={navigation.goBack} />
      ),
    });
  }, [navigation]);

  const renderItem = ({item}: {item: Expert}) => {
    return <ExpertCard expert={item} />;
  };

  return (
    <View style={styles.mainContainer}>
      <SafeAreaView style={styles.mainContainer}>
        <FlatList
          contentContainerStyle={styles.flatListContentContainer}
          data={experts}
          bounces={false}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={(item) => item.user.id.toString()}
          onEndReachedThreshold={0.5}
        />
      </SafeAreaView>
    </View>
  );
};
