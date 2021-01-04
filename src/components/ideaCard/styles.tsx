import {StyleSheet} from "react-native";
import {TYPOGRAPHY} from "../../constants/typography";
import {COLORS} from "../../constants/colors";

export const styles = StyleSheet.create({
  name: {
    ...(TYPOGRAPHY.HEADER_3 as Object),
    color: COLORS.SECONDARY_DARK_1,
  },
  info: {
    ...(TYPOGRAPHY.HEADER_5 as Object),
    color: COLORS.PRIMARY_DARK,
  },
  countOfLikes: {
    ...(TYPOGRAPHY.HEADER_5 as Object),
    color: COLORS.PRIMARY_DARK,
  },
  status: {
    ...(TYPOGRAPHY.TEXT_LINK as Object),
    color: COLORS.SECONDARY_DARK_1,
  },
});
