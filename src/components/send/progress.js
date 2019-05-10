import React from 'react';
import { View, Animated } from 'react-native';
import connect from 'redux-connect-decorator';
import { tokenMap } from '../../constants/tokens';
import withTheme from '../withTheme';
import getStyles from './styles';
import { colors } from '../../constants/styleGuide';

@connect(state => ({
  activeToken: state.settings.token.active,
}))
class Progress extends React.Component {
  render() {
    const {
      styles, current, total, activeToken,
    } = this.props;
    const { progressRatio } = this.state;

    let color = colors.light.blue;
    if (activeToken === tokenMap.BTC.key) {
      color = colors.light.BTC;
    }

    return (
      <View style={[
        styles.progressContainer,
        styles.theme.progressContainer,
        { opacity: current === total ? 0 : 1 },
      ]}>
        <Animated.View
          style={[styles.progress, {
            backgroundColor: color,
            width: progressRatio.interpolate({
              inputRange: [0, 1],
              outputRange: ['0%', '100%'],
            }),
          }]}
        />
      </View>
    );
  }
}

export default withTheme(Progress, getStyles());
