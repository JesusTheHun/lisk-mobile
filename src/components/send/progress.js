import React from 'react';
import { View, Animated, Dimensions } from 'react-native';
import connect from 'redux-connect-decorator';
import withTheme from '../withTheme';
import getStyles from './styles';

@connect(state => ({
  activeToken: state.settings.token.active,
}))
class Progress extends React.Component {
  state = {
    progressRatio: new Animated.Value(0),
  }

  componentDidMount() {
    this.setProgress(0);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.current !== this.props.current) {
      this.setProgress(300);
    }
  }

  setProgress(duration) {
    Animated.timing(this.state.progressRatio, {
      toValue: this.props.current / (this.props.total - 1),
      duration,
    }).start();
  }

  render() {
    const {
      styles, current, total,
    } = this.props;

    const steps = [];
    for (let i = 0; i < (total - 1); i++) {
      steps.push(i + 1);
    }

    const deviceWidth = Dimensions.get('window').width;
    const marginBetweenSteps = 3;
    const stepWidth = (deviceWidth / (total - 1)) - marginBetweenSteps;

    return (
      <View style={[
        styles.progressContainer,
        styles.theme.progressContainer,
        { opacity: current === total ? 0 : 1 },
      ]}>
        {steps.map(step => (
          <View
            key={step}
            style={[
              styles.theme.progressStepContainer,
              { width: stepWidth },
          ]}>
            <View style={[
              styles.progressStep,
              { width: step <= current ? '100%' : 0 },
            ]} />
          </View>
        ))}

      </View>
    );
  }
}

export default withTheme(Progress, getStyles());
