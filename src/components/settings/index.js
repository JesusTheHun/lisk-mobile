import React from 'react';
import { ScrollView, View, Platform } from 'react-native';
import connect from 'redux-connect-decorator';
import { accountSignedOut as accountSignedOutAction } from '../../actions/accounts';
import { H4, P } from '../toolBox/typography';
import FingerprintOverlay from '../fingerprintOverlay';
import ItemTitle from './itemTitle';
import SignOutButton from './signOutButton';
import { colors, themes } from '../../constants/styleGuide';
import withTheme from '../withTheme';
import SwitchButton from './switchButton';
import {
  settingsUpdated as settingsUpdatedAction,
} from '../../actions/settings';
import getStyles from './styles';

@connect(state => ({
  settings: state.settings,
}), {
  accountSignedOut: accountSignedOutAction,
  settingsUpdated: settingsUpdatedAction,
})
class Settings extends React.Component {
  state = {
    error: null,
    show: false,
  }

  setError = (error) => {
    this.setState({ error: error.message });
  }

  showDialog = () => {
    this.setState({ error: null, show: true });
  }

  hideDialog = () => {
    this.setState({ show: false });
  }

  switchTheme = () => {
    this.props.settingsUpdated({
      theme: this.props.settings.theme === themes.dark ? themes.light : themes.dark,
    });
  }

  toggleIncognito = () => {
    this.props.settingsUpdated({
      incognito: !this.props.settings.incognito,
    });
  }

  render() {
    const {
      styles, theme, navigation, settings,
    } = this.props;

    let target = 'EnableBioAuth';

    let targetStateLabel = ['Disabled', colors[theme].gray2];
    if (settings.sensorType && settings.hasStoredPassphrase) {
      targetStateLabel = [
        'Enabled',
        theme === themes.light ? colors.light.black : colors.dark.white,
      ];
      target = 'DisableBioAuth';
    }
    const sensorStatus = (
      <P style={{ color: targetStateLabel[1] || colors[theme].gray1 }}>
        {targetStateLabel[0]}
      </P>
    );

    return (
      <View style={[styles.container, styles.theme.container]}>
        <ScrollView style={styles.innerContainer}>
          <View style={styles.group}>
            <H4 style={[styles.subHeader, styles.theme.subHeader]}>Security</H4>
            {
              settings.sensorType ?
                <View style={[styles.item, styles.theme.item]}>
                  <ItemTitle
                    navigation={navigation}
                    showDialog={this.showDialog}
                    hideDialog={this.hideDialog}
                    setError={this.setError}
                    target={target}
                    authenticate={true}
                    targetStateLabel={sensorStatus}
                    icon={settings.sensorType === 'Face ID' ? 'face-id-small' : 'touch-id-small'}
                    iconSize={settings.sensorType === 'Face ID' ? 18 : 20}
                    title={settings.sensorType}/>
                </View> : null
            }
            <View style={[styles.item, styles.theme.item]}>
              <ItemTitle
                icon='enable-incognito'
                targetStateLabel={
                  <SwitchButton
                    value={settings.incognito}
                    theme={theme}
                    onSyncPress={this.toggleIncognito} />
                }
                title='Discreet mode'
                description="Hide balance and transaction amounts."
              />
            </View>
            {
              (settings.sensorType && settings.hasStoredPassphrase) ?
                <View style={[styles.item, styles.theme.item]}>
                  <ItemTitle
                    navigation={navigation}
                    target='PassphraseBackup'
                    authenticate={true}
                    showDialog={this.showDialog}
                    hideDialog={this.hideDialog}
                    setError={this.setError}
                    icon='backup'
                    title='Backup your passphrase' />
                </View> : null
            }
          </View>

          <View style={styles.group}>
            <H4 style={[styles.subHeader, styles.theme.subHeader]}>General</H4>
            <View style={[styles.item, styles.theme.item]}>
              <ItemTitle
                navigation={navigation}
                target='About'
                icon='about'
                title='About Lisk'/>
            </View>
            <View style={[styles.item, styles.theme.item]}>
              <ItemTitle
                icon='dark-mode'
                iconSize={20}
                targetStateLabel={
                  <SwitchButton
                    value={settings.theme === themes.dark}
                    theme={theme}
                    onSyncPress={this.switchTheme} />
                }
                title='Dark mode'/>
            </View>
            <View style={[styles.item, styles.theme.item]}>
              <ItemTitle
                navigation={navigation}
                icon='currency-selector'
                iconSize={20}
                title='Currency'
                target='CurrencySelection'
                targetStateLabel={
                  <P style={{ color: colors[theme].gray1 }}>
                    {settings.currency}
                  </P>
                }
              />
            </View>
            <View style={[styles.item, styles.theme.item]}>
              <ItemTitle
                navigation={navigation}
                icon='terms'
                target='Terms'
                title='Terms of use'/>
            </View>
          </View>

          <View style={[styles.group, styles.signOut]}>
            <H4 style={[styles.subHeader, styles.theme.subHeader]}>{''}</H4>
            <View style={[styles.item, styles.theme.item]}>
              <SignOutButton
                navigation={navigation}
                signOut={this.props.accountSignedOut}
                settings={settings}
              />
            </View>
          </View>
        </ScrollView>
        {
          Platform.OS === 'android' ?
            <FingerprintOverlay error={this.state.error} show={this.state.show} /> : null
        }
      </View>
    );
  }
}

export default withTheme(Settings, getStyles());
