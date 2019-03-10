import React from 'react';
import { View, Alert, Animated, Dimensions } from 'react-native';
import connect from 'redux-connect-decorator';
import { translate } from 'react-i18next';
import {
  accountFollowed as accountFollowedAction,
  accountUnFollowed as accountUnFollowedAction,
} from '../../actions/accounts';
import Avatar from '../avatar';
import Icon from '../toolBox/icon';
import { fromRawLsk } from '../../utilities/conversions';
import FormattedNumber from '../formattedNumber';
import Share from '../share';
import { P, H2 } from '../toolBox/typography';
import { IconButton } from '../toolBox/button';
import easing from '../../utilities/easing';
import withTheme from '../withTheme';
import getStyles from './styles';
import { colors, themes } from '../../constants/styleGuide';

@connect(state => ({
  followedAccounts: state.accounts.followed,
  settings: state.settings,
}), {
  accountFollowed: accountFollowedAction,
  accountUnFollowed: accountUnFollowedAction,
})
class AccountSummary extends React.Component {
  state = {
    modalVisible: false,
    addressWidth: 0,
    initialAnimations: {
      opacity: new Animated.Value(0),
      top: new Animated.Value(-20),
    },
    followed: false,
  }

  toggleModal() {
    this.setState({
      modalVisible: !this.state.modalVisible,
    });
  }

  interpolate = (inputRange, outputRange) =>
    this.props.scrollY.interpolate({
      inputRange,
      outputRange,
      extrapolate: 'clamp',
    });

  initialFadeIn = () => {
    const { opacity, top } = this.state.initialAnimations;
    Animated.timing(opacity, {
      toValue: 1,
      duration: 400,
      delay: 100,
    }).start();
    Animated.timing(top, {
      toValue: 0,
      duration: 400,
      delay: 100,
      easing: easing.easeInOutQuart,
    }).start();
  }

  toggleBookmark = () => {
    const {
      followedAccounts, account, navigation, accountUnFollowed, t,
    } = this.props;
    const isFollowed = followedAccounts.some(item => item.address === account.address);
    if (isFollowed) {
      Alert.alert(t('Are you sure?'), '', [
        {
          text: t('Cancel'),
          style: 'cancel',
        },
        {
          text: t('Confirm'),
          onPress: () => accountUnFollowed(account.address),
        },
      ], { cancelable: false });
    } else {
      navigation.navigate({
        routeName: 'AddBookmark',
        params: {
          account,
          title: t('Add bookmark'),
        },
      });
    }
  }

  componentDidMount() {
    this.screenWidth = Dimensions.get('window').width;
    this.initialFadeIn();
  }

  render() {
    const {
      styles, account, followedAccounts,
      settings: { token }, theme, navigation, t,
    } = this.props;

    const { interpolate } = this;
    const AView = Animated.View;
    const { opacity, top } = this.state.initialAnimations;
    const normalizedBalance = fromRawLsk(account.balance);
    const height = 205;
    const isFollowed = followedAccounts.some(item => item.address === account.address);

    const followedAccountColor = theme === themes.light ? colors.light.blue : colors.dark.white;

    return (<View style={[styles.walletContainer, styles.theme.walletContainer, this.props.style]}>
      <AView style={[styles.container, { opacity, top, height },
        { marginTop: interpolate([0, height + 10], [0, -1 * (height - 1)]) }]}>
        <AView style={[styles.avatar, { opacity },
          { marginTop: interpolate([0, 100], [0, 100]) }]}>
          {
            token.active === 'LSK' ?
            <Avatar address={account.address} size={60} /> :
            <View style={{
              backgroundColor: 'white',
              padding: 10,
              borderRadius: 30,
              width: 60,
              height: 60,
            }}>
              <Icon name='language' size={40} color={'orange'} />
            </View>
          }
        </AView>
        <AView style={[styles.address, { opacity },
          {
            opacity: this.interpolate([0, 30], [1, 0]),
            top: this.interpolate([0, 100], [0, 80]),
          },
        ]}>
          <Share type={P}
            style={[styles.addressP, styles.theme.walletAddress]}
            iconColor={theme === 'dark' ? colors[theme].gray2 : colors[theme].gray1}
            containerStyle={styles.addressContainer}
            value={account.address} icon={true} />
        </AView>
        <AView style={[styles.balance, { opacity },
          {
            opacity: this.interpolate([0, height - 120, height - 85], [1, 1, 0]),
            top: this.interpolate([0, height - 50], [0, height - 120]),
          },
        ]}>
          <FormattedNumber
            tokenType={token.active}
            style={styles.theme.walletBalance}
            type={H2}>{normalizedBalance}</FormattedNumber>
        </AView>
        <AView style={[styles.fiat, { opacity },
          {
            opacity: this.interpolate([0, 30], [1, 0]),
            top: this.interpolate([0, 100], [0, 80]),
          },
        ]}>
        </AView>
      </AView>
      <View style={styles.actionBar}>
        <IconButton
          style={styles.bookmarkButton}
          titleStyle={styles.bookmarkButtonTitle}
          title=''
          icon={isFollowed ? 'bookmark-full' : 'bookmark'}
          color={isFollowed ? followedAccountColor : colors[theme].gray1}
          iconSize={20}
          onClick={this.toggleBookmark} />
        <IconButton
          titleStyle={[styles.sendButtonTitle, styles.theme.sendButtonTitle]}
          style={styles.sendButton}
          title={t('Send to this address')}
          icon='send'
          color={colors[theme].gray1}
          iconSize={20}
          onClick={() => navigation.navigate('Send', { query: { address: account.address } })} />
      </View>
    </View>);
  }
}

export default withTheme(translate()(AccountSummary), getStyles());
