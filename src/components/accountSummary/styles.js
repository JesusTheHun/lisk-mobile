import { DeviceInfo, Platform } from 'react-native';
import { Header } from 'react-navigation';
import { themes, colors } from '../../constants/styleGuide';

export default () => ({
  common: {
    container: {
      width: '100%',
      height: 170,
      backgroundColor: colors.dark.navigationBg,
      overflow: 'hidden',
    },
    avatar: {
      top: 0,
      left: '50%',
      marginLeft: -30,
      position: 'absolute',
      zIndex: 4,
      elevation: 4,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 10,
      borderRadius: 30,
      overflow: 'hidden',
    },
    address: {
      width: '100%',
      paddingTop: 10,
      paddingBottom: 3,
      marginTop: 60,
      textAlign: 'center',
      zIndex: 2,
    },
    addressContainer: {
      justifyContent: 'center',
    },
    addressP: {
      lineHeight: 25,
    },
    balance: {
      height: 32,
      width: '100%',
      alignItems: 'center',
      zIndex: 2,
      elevation: 2,
    },
    bg: {
      position: 'absolute',
      left: 0,
      top: (Platform.OS === 'ios' && DeviceInfo.isIPhoneX_deprecated) ?
        -1 * (Header.HEIGHT + 24) : -1 * (Header.HEIGHT + 1),
      zIndex: 1,
      height: 280,
      width: '100%',
      overflow: 'hidden',
    },
    blurWrapper: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      height: 45,
    },
    blur: {
      position: 'absolute',
      left: '50%',
      top: '50%',
      marginTop: -30,
      zIndex: 2,
      opacity: 0,
    },
    visibleBlur: {
      opacity: 1,
    },
    invisibleTitle: {
      color: 'rgba(255, 255, 255, 0.02)',
    },
    blurBig: {
      width: 150,
      height: 45,
      marginLeft: -75,
    },
    blurMedium: {
      width: 116,
      height: 45,
      marginLeft: -58,
    },
    blurSmall: {
      width: 91,
      height: 45,
      marginLeft: -45,
    },
    fiat: {
      width: '100%',
      alignItems: 'center',
      zIndex: 2,
    },
    fiatValue: {},
  },
  [themes.light]: {
    bg: {
      opacity: 1,
    },
    avatar: {
      shadowColor: colors.light.blue,
    },
    balance: {
      color: colors.light.white,
    },
    addressP: {
      color: colors.light.gray5,
    },
    fiatValue: {
      color: colors.light.gray5,
    },
  },
  [themes.dark]: {
    bg: {
      opacity: 0.6,
    },
    addressP: {
      color: colors.dark.gray2,
    },
    balance: {
      color: colors.dark.white,
    },
    fiatValue: {
      color: colors.dark.gray2,
    },
  },
});
