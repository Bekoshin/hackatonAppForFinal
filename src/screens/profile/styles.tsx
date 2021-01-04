import {StyleSheet} from 'react-native';
import {TYPOGRAPHY} from '../../constants/typography';
import {COLORS} from '../../constants/colors';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 10,
  },
  scrollViewContentContainer: {
    paddingTop: 10,
    paddingBottom: 40,
  },
  blockContentContainer: {
    backgroundColor: 'white',
    borderRadius: 4,
    marginTop: 16,
    paddingTop: -6,
  },
  touchableContainer: {
    borderRadius: 4,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  rowLabelContainer: {
    flex: 1,
  },
  rowLabel: {
    ...(TYPOGRAPHY.TEXT_2 as Object),
    color: COLORS.PRIMARY_DARK,
  },
  touchableRowLabel: {
    ...(TYPOGRAPHY.TEXT_2 as Object),
    color: COLORS.PRIMARY,
  },
  rowText: {
    ...(TYPOGRAPHY.TEXT_SECONDARY as Object),
    color: COLORS.PRIMARY_DARK,
  },
  separator: {
    marginHorizontal: 12,
  },
  avatarContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchableAvatarContainer: {
    marginTop: 6,
    width: 150,
    borderRadius: 75,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
