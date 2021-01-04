import {StyleSheet} from 'react-native';
import {TYPOGRAPHY} from '../../constants/typography';
import {COLORS} from '../../constants/colors';

export const styles = StyleSheet.create({
  mainContainer: {
    borderRadius: 4,
    marginBottom: 6,
  },
  contentContainer: {
    padding: 6,
    borderRadius: 4,
    backgroundColor: 'white',
  },
  sender: {
    ...(TYPOGRAPHY.HEADER_4 as Object),
    color: COLORS.SECONDARY_3,
  },
  message: {
    ...(TYPOGRAPHY.TEXT_SECONDARY as Object),
    color: COLORS.PRIMARY_DARK,
  },
  date: {
    ...(TYPOGRAPHY.HEADER_5 as Object),
    color: COLORS.SECONDARY_DARK_1,
  },
  commentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
});
