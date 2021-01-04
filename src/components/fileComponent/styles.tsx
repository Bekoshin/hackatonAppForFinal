import {StyleSheet} from 'react-native';
import {TYPOGRAPHY} from '../../constants/typography';
import {COLORS} from '../../constants/colors';

const styles = StyleSheet.create({
  touchableContainer: {
    borderRadius: 4,
  },
  mainContainer: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    backgroundColor: 'white',
    padding: 4,
    borderRadius: 4,
  },
  image: {
    backgroundColor: 'white',
    borderRadius: 4,
  },
  note: {
    ...(TYPOGRAPHY.HEADER_5 as Object),
    color: COLORS.SECONDARY_DARK_1,
    textAlign: 'center',
    marginTop: 4,
  },
  deleteIcon: {
    padding: 2,
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: COLORS.BACKGROUND_2 + 99,
    borderRadius: 100,
  },
  noteIcon: {
    padding: 2,
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: COLORS.BACKGROUND_2 + 99,
    borderRadius: 100,
  },
  checkIcon: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.BACKGROUND_2 + 99,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
