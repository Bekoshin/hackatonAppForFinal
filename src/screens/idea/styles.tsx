import {StyleSheet} from 'react-native';
import {COLORS} from '../../constants/colors';
import {TYPOGRAPHY} from '../../constants/typography';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  headerRightContainer: {
    position: undefined,
    flex: 1,
    left: 0,
  },
  scrollViewContentContainer: {
    paddingTop: 10,
    paddingBottom: 100,
  },
  inputContainer: {
    marginBottom: 14,
  },
  label: {
    ...(TYPOGRAPHY.HEADER_5 as Object),
    color: COLORS.SECONDARY_DARK_1,
    marginBottom: 12,
  },
  sublabel: {
    ...(TYPOGRAPHY.CAPTION as Object),
    color: COLORS.PRIMARY_DARK,
  },
  touchableContainer: {
    borderRadius: 4,
  },
  button: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 10,
  },
  photoContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
    marginHorizontal: 5,
  },
  flatListContentContainer: {
    paddingTop: 10,
    paddingBottom: 40,
  },
  number: {
    ...(TYPOGRAPHY.HEADER_3 as Object),
    color: COLORS.SECONDARY_DARK_1,
  },
  date: {
    ...(TYPOGRAPHY.TEXT_LINK as Object),
    color: COLORS.SECONDARY_DARK_1,
  },
  userName: {
    ...(TYPOGRAPHY.HEADER_4 as Object),
    color: COLORS.PRIMARY_DARK,
  },
});
