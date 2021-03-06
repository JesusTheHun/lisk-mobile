import { Platform } from 'react-native';
import { themes, colors, boxes } from '../../constants/styleGuide';

export default () => ({
  common: {
    modal: {
      flex: 1,
      backgroundColor: 'transparent',
    },
    wrapper: {
      flex: 1,
      backgroundColor: 'transparent',
      justifyContent: 'flex-end',
    },
    container: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      width: '100%',
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
      overflow: 'hidden',
    },
    titleContainer: {
      borderBottomWidth: 1,
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: 50,
      zIndex: 2,
      flexDirection: 'column',
      justifyContent: 'flex-end',

    },
    title: {
      paddingTop: 15,
      paddingBottom: 15,
      width: '100%',
      textAlign: 'center',
    },
    closeButton: {
      position: 'absolute',
      left: 0,
      top: Platform.OS === 'ios' ? 8 : 0,
      zIndex: 2,
    },
    contentContainer: {
      padding: boxes.boxPadding,
      paddingTop: boxes.boxPadding + 50,
    },
  },
  [themes.light]: {
    container: {
      backgroundColor: colors.light.white,
    },

    titleContainer: {
      borderBottomColor: colors.light.gray5,
      backgroundColor: colors.light.navigationBg,
    },
    title: {
      color: colors.light.black,
    },
  },
  [themes.dark]: {
    container: {
      backgroundColor: colors.dark.screenBgNavy,
    },
    subHeader: {
      color: colors.dark.gray1,
    },
    titleContainer: {
      borderBottomColor: colors.dark.gray5,
      backgroundColor: colors.dark.navigationBg,
    },
    title: {
      color: colors.dark.white,
    },
  },
});
