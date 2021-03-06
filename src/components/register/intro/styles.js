import { StyleSheet, Dimensions } from 'react-native';
import { SCREEN_HEIGHTS, deviceHeight } from '../../../utilities/device';
import { colors } from '../../../constants/styleGuide';

const { height } = Dimensions.get('window');

const styles = {
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flexDirection: 'column',
    marginRight: 20,
    marginLeft: 20,
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    marginTop: 8,
  },
  subHeader: {
    marginTop: 14,
    marginBottom: 25,
    color: colors.light.gray1,
  },
  row: {
    flexDirection: 'row',
    paddingRight: 50,
    marginBottom: height > 640 ? 10 : 3,
    paddingBottom: height > 640 ? 14 : 3,
  },
  separator: {
    borderBottomColor: colors.light.gray5,
    borderBottomWidth: 1,
  },
  rowTitle: {
    marginTop: 5,
  },
  icon: {
    marginRight: 12,
    marginTop: 10,
  },
  description: {
    color: colors.light.gray2,
    marginTop: 5,
  },
  label: {
    color: colors.light.gray2,
    marginLeft: 12,
  },
  actionBar: {
    marginBottom: deviceHeight() < SCREEN_HEIGHTS.SM ? 20 : 0,
  },
};

export default StyleSheet.create(styles);
