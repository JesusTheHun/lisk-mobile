import { settingsUpdated } from '../actions/settings';

export default async () => [
  {
    type: 'Request',
    title: 'Request tokens',
    icon: 'quick_action_request',
    userInfo: {
      url: 'lisk://request',
    },
  },
  {
    type: 'Send',
    title: 'Send tokens',
    icon: 'quick_action_send',
    userInfo: {
      url: 'lisk://wallet',
    },
  },
  {
    type: 'Discreet',
    title: 'Open discreetly',
    icon: 'quick_action_send',
    userInfo: {
      action: settingsUpdated({ incognito: true }),
      requireSignIn: false,
    },
  },
];