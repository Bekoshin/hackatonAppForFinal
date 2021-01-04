import React, {useContext, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  TouchableHighlight,
  View,
  Text,
  Alert,
  Image,
} from 'react-native';
import {styles} from './styles';
import {COLORS} from '../../constants/colors';
import {DialogModal} from '../../components/dialogModal/DialogModal';
import {AppContext} from '../../App';
import {Separator} from '../../components/separator/Separator';
import {AuthService} from '../../services/AuthService';
import {deleteToken} from '../../utils/JwtTokenUtils';
import {endpoints} from '../../constants/endpoints';
import {createPhoto} from '../../utils/PhotoUtils';
import {ProfileService} from '../../services/ProfileService';
import {LineAwesomeIcon} from '../../constants/LineAwesomeIconSet';

const AVATAR_WIDTH = 150;

type ProfileScreenProps = {};

export const ProfileScreen = (props: ProfileScreenProps) => {
  const {} = props;

  const {setHasToken, profile, setProfile} = useContext(AppContext);

  const [name] = useState(profile?.name || 'Не указано');
  const [email] = useState(profile?.email || 'Не указано');
  const [role] = useState(profile?.role.name || 'Не указано');
  const [department] = useState(profile?.department.name || 'Не указано');
  const [birthday] = useState(profile?.birthday || 'Не указано');
  const [education] = useState(profile?.education || 'Не указано');
  const [experience] = useState(profile?.experience || 'Не указано');
  const [avatar, setAvatar] = useState(profile?.avatar || null);
  const [logoutDialogVisible, setLogoutDialogVisible] = useState(false);

  const showLogoutDialog = () => {
    setLogoutDialogVisible(true);
  };

  const hideLogoutDialog = () => {
    setLogoutDialogVisible(false);
  };

  const logout = async () => {
    try {
      const authService = new AuthService();
      await authService.signOut();
      await deleteToken();
      await setHasToken(false);
    } catch (error) {
      console.log('LOGOUT ERROR: ', error);
      Alert.alert('Не удалось выйти');
    }
  };

  const handleOkLogoutDialogButton = async () => {
    hideLogoutDialog();
    await logout();
  };

  const handleAvatarPress = async () => {
    const photo = await createPhoto();
    console.log('photo: ', photo);
    let extension = photo.path.substring(photo.path.lastIndexOf('.') + 1);
    let fileName = 'name' + '.' + extension;
    const profileService = new ProfileService();
    const newProfile = await profileService.updateAvatar(
      photo.path,
      fileName,
      photo.mime,
    );
    setProfile(newProfile);
    setAvatar(newProfile.avatar);
    console.log('profile: ', profile);
  };

  return (
    <View style={styles.mainContainer}>
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.content}>
          <ScrollView
            bounces={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollViewContentContainer}>
            <View style={styles.blockContentContainer}>
              <View style={styles.avatarContainer}>
                <TouchableHighlight
                  style={styles.touchableAvatarContainer}
                  onPress={handleAvatarPress}
                  activeOpacity={0.5}
                  underlayColor={COLORS.SECONDARY_DARK_1}>
                  {avatar ? (
                    <Image
                      resizeMode={'cover'}
                      style={[
                        {
                          borderRadius: AVATAR_WIDTH / 2,
                          width: AVATAR_WIDTH,
                          height: AVATAR_WIDTH,
                        },
                      ]}
                      width={AVATAR_WIDTH}
                      height={AVATAR_WIDTH}
                      source={{uri: endpoints.baseForPhoto + avatar}}
                    />
                  ) : (
                    <View
                      style={{
                        borderRadius: AVATAR_WIDTH / 2,
                        width: AVATAR_WIDTH,
                        height: AVATAR_WIDTH,
                        backgroundColor: COLORS.SECONDARY_DARK_2,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <LineAwesomeIcon name="plus" color="white" size={96} />
                    </View>
                  )}
                </TouchableHighlight>
              </View>
              <View style={styles.rowContainer}>
                <View style={styles.rowLabelContainer}>
                  <Text style={styles.rowLabel}>Имя</Text>
                </View>
                <Text style={styles.rowText}>{name}</Text>
              </View>
              <Separator style={styles.separator} />
              <View style={styles.rowContainer}>
                <View style={styles.rowLabelContainer}>
                  <Text style={styles.rowLabel}>Email</Text>
                </View>
                <Text style={styles.rowText}>{email}</Text>
              </View>
              <Separator style={styles.separator} />
              <View style={styles.rowContainer}>
                <View style={styles.rowLabelContainer}>
                  <Text style={styles.rowLabel}>Роль</Text>
                </View>
                <Text style={styles.rowText}>{role}</Text>
              </View>
              <Separator style={styles.separator} />
              <View style={styles.rowContainer}>
                <View style={styles.rowLabelContainer}>
                  <Text style={styles.rowLabel}>Подразделение</Text>
                </View>
                <Text style={styles.rowText}>{department}</Text>
              </View>
              <Separator style={styles.separator} />
              <View style={styles.rowContainer}>
                <View style={styles.rowLabelContainer}>
                  <Text style={styles.rowLabel}>Дата рождения</Text>
                </View>
                <Text style={styles.rowText}>{birthday}</Text>
              </View>
              <Separator style={styles.separator} />
              <View style={styles.rowContainer}>
                <View style={styles.rowLabelContainer}>
                  <Text style={styles.rowLabel}>Образование</Text>
                </View>
                <Text style={styles.rowText}>{education}</Text>
              </View>
              <Separator style={styles.separator} />
              <View style={styles.rowContainer}>
                <View style={styles.rowLabelContainer}>
                  <Text style={styles.rowLabel}>Стаж</Text>
                </View>
                <Text style={styles.rowText}>{experience}</Text>
              </View>
              <Separator style={styles.separator} />
              <TouchableHighlight
                style={styles.touchableContainer}
                onPress={showLogoutDialog}
                activeOpacity={0.9}
                underlayColor={COLORS.OUTLINE}>
                <View style={styles.rowContainer}>
                  <View style={styles.rowLabelContainer}>
                    <Text style={styles.touchableRowLabel}>
                      Выйти из аккаунта
                    </Text>
                  </View>
                </View>
              </TouchableHighlight>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
      <DialogModal
        text="Вы действительно хотите выйти из аккаунта?"
        visible={logoutDialogVisible}
        onCancelPress={hideLogoutDialog}
        onBackdropPress={hideLogoutDialog}
        onOkPress={handleOkLogoutDialogButton}
      />
    </View>
  );
};
