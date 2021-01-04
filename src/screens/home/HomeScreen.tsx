import React, {useCallback, useContext, useEffect, useState} from 'react';
import {FlatList, SafeAreaView, View} from 'react-native';
import {styles} from './styles';
import {ProfileService} from '../../services/ProfileService';
import {IdeaService} from '../../services/IdeaService';
import {Idea} from '../../models/Idea';
import {IdeaCard} from '../../components/ideaCard/IdeaCard';
import {AppContext} from '../../App';
import {LoadingIndicator} from '../../components/loadingIndicator/LoadingIndicator';
import {PAGE_SIZE} from '../../constants/constants';
import {IdeaStackParamList} from '../../stacks/IdeaStack';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp, useFocusEffect} from '@react-navigation/native';
import {MssButton} from '../../components/mssButton/MssButton';
import {SearchBar} from '../../components/searchBar/SearchBar';

type HomeScreenProps = {
  route: RouteProp<IdeaStackParamList, 'List'>;
  navigation: StackNavigationProp<IdeaStackParamList, 'List'>;
};

export const HomeScreen = (props: HomeScreenProps) => {
  const {route, navigation} = props;
  const {profile, setProfile} = useContext(AppContext);
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [page, setPage] = useState(1);
  const [allIdeasLoaded, setAllIdeasLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // useEffect(() => {
  //   const registerToken = async () => {
  //     let messagingToken: string;
  //     const tokenFromAsyncStorage = await getTokenFromAsyncStorage();
  //     if (!tokenFromAsyncStorage) {
  //       messagingToken = await messaging().getToken();
  //       await saveTokenToAsyncStorage(messagingToken);
  //     } else {
  //       messagingToken = tokenFromAsyncStorage;
  //     }
  //     const credentials = await getCredentialsFromKeychain();
  //     if (credentials) {
  //       const token = createToken(credentials);
  //       const authService = new AuthService(token);
  //       await authService.sendDevice(messagingToken);
  //     }
  //   };
  //   registerToken().catch(error => console.log('register token error: ', error));
  // }, []);

  // useEffect(() => {
  //   messaging().setBackgroundMessageHandler(async remoteMessage => {
  //     await loadFirstPageVideos();
  //   });
  //
  //   loadFirstPageVideos().catch(error => console.log('load videos error: ', error));
  // }, []);

  const refreshIdeas = useCallback(async () => {
    try {
      setRefreshing(true);
      const newIdeas = await loadIdeas(1);
      setPage(1);
      setIdeas(newIdeas);
      setAllIdeasLoaded(newIdeas.length < PAGE_SIZE);
    } catch (error) {
      console.log('REFRESH IDEAS ERROR: ', error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    const loadProfile = async () => {
      const profileService = new ProfileService();
      setProfile(await profileService.getProfile());
    };
    loadProfile().catch((error) => console.log('LOAD PROFILE ERROR: ', error));
  }, [setProfile]);

  useFocusEffect(
    useCallback(() => {
      refreshIdeas().catch((error) =>
        console.log('REFRESH IDEAS ERROR: ', error),
      );
    }, [refreshIdeas]),
  );

  const loadMoreIdeas = async () => {
    try {
      setLoading(true);
      const newPage = page + 1;
      const newIdeas = await loadIdeas(newPage);
      setPage(newPage);
      setIdeas((prevState) => [...prevState, ...newIdeas]);
      setAllIdeasLoaded(newIdeas.length < PAGE_SIZE);
    } catch (error) {
      console.log('LOAD MORE IDEAS ERROR: ', error);
    } finally {
      setLoading(false);
    }
  };

  const onEndReached = async () => {
    if (!loading && !allIdeasLoaded) {
      await loadMoreIdeas();
    }
  };

  const handlePress = async (idea: Idea) => {
    navigation.navigate('Idea', {ideaId: idea.id});
  };

  const handleDeletePress = async (idea: Idea) => {
    try {
      const ideaService = new IdeaService();
      await ideaService.deleteIdea(idea.id);
      await refreshIdeas();
    } catch (error) {
      console.log('HANDLE DELETE PRESS ERROR: ', error);
    }
  };

  const handleLikePress = async (idea: Idea) => {
    try {
      const ideaService = new IdeaService();
      if (idea.likeAvailable) {
        await ideaService.likeIdea(idea.id);
      } else {
        await ideaService.dislikeIdea(idea.id);
      }
    } catch (error) {
      console.log('HANDLE LIKE PRESS ERROR: ', error);
    }
  };

  const handleAddButtonPress = () => {
    navigation.navigate('Idea', {});
  };

  const renderIdea = ({item}: {item: Idea}) => {
    return (
      <IdeaCard
        idea={item}
        onPress={handlePress}
        onDeletePress={handleDeletePress}
        onLikePress={handleLikePress}
        ownIdea={item.user.id === profile?.id}
      />
    );
  };

  return (
    <View style={styles.mainContainer}>
      <SafeAreaView style={styles.mainContainer}>
        <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
        <FlatList
          style={{marginHorizontal: 10, marginBottom: 55}}
          data={ideas}
          showsVerticalScrollIndicator={false}
          renderItem={renderIdea}
          keyExtractor={(item) => item.id.toString()}
          refreshing={refreshing}
          onEndReached={onEndReached}
          onRefresh={refreshIdeas}
          ListFooterComponent={loading ? <LoadingIndicator /> : null}
          onEndReachedThreshold={0.5}
        />
        <MssButton
          style={styles.button}
          label="Добавить"
          onPress={handleAddButtonPress}
        />
      </SafeAreaView>
    </View>
  );
};

export const loadIdeas = async (page: number): Promise<Idea[]> => {
  const ideaService = new IdeaService();
  return await ideaService.getIdeas(page, PAGE_SIZE);
};
