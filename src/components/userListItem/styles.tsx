import {StyleSheet} from 'react-native';
import {TYPOGRAPHY} from '../../constants/typography';
import {COLORS} from '../../constants/colors';

export const styles = StyleSheet.create({
  mainContainer: {
    paddingLeft: 13,
    paddingRight: 11,
    paddingVertical: 9,
    justifyContent: 'space-between',
    marginBottom: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.OUTLINE,
  },
  nameContainer: {
    flex: 0.7,
    marginRight: 4,
  },
  name: {
    ...(TYPOGRAPHY.HEADER_5 as Object),
    color: COLORS.PRIMARY_DARK,
  },
  value: {
    ...(TYPOGRAPHY.CAPTION as Object),
    color: COLORS.PRIMARY_DARK,
  },
  button: {
    marginTop: 6,
    flex: 0.3,
    height: 34,
  },
});
