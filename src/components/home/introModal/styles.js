import { themes, colors, boxes } from '../../../constants/styleGuide';

export default () => ({
  common: {
    container: {
      alignItems: 'center',
      paddingBottom: boxes.boxPadding,
    },
    text: {
      textAlign: 'center',
      lineHeight: 55,
    },
    actionButton: {
      width: '100%',
      marginBottom: boxes.boxPadding,
      marginRight: boxes.boxPadding,
      marginLeft: boxes.boxPadding,
    },
    tokenLogoWrapper: {
      paddingTop: 10,
      borderRadius: 25,
      width: 50,
      height: 50,
      textAlign: 'center',
      display: 'flex',
      alignItems: 'center',
    },
    tokenLogo: {
      textAlign: 'center',
    },
  },

  [themes.light]: {
    text: {
      color: colors.light.gray2,
    },
    tokenLogoWrapper: {
      backgroundColor: colors.light.BTC,
    },
  },

  [themes.dark]: {
    text: {
      color: colors.dark.gray2,
    },
    tokenLogoWrapper: {
      backgroundColor: colors.dark.BTC,
    },
  },
});
