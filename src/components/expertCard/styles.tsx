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
  name: {
    ...(TYPOGRAPHY.HEADER_4 as Object),
    color: COLORS.SECONDARY_3,
  },
  message: {
    ...(TYPOGRAPHY.HEADER_5 as Object),
    color: COLORS.PRIMARY_DARK,
  },
  textContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingLeft: 14,
    paddingTop: 14,
  },
});
