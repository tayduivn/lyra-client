import Auth0Lock from 'auth0-lock';
import gql from 'graphql-tag';
import {AUTH_CONFIG} from './auth0-variables';

const isClient = typeof window !== 'undefined';

class Auth {
  constructor(cb, apolloClient) {
    if (!isClient) {
      return false;
    }
    this.lock = new Auth0Lock(AUTH_CONFIG.clientId, AUTH_CONFIG.domain, {
      oidcConformant: true,
      autoclose: true,
      auth: {
        sso: false,
        redirectUrl: AUTH_CONFIG.callbackUrl,
        responseType: 'token id_token',
        audience: `${AUTH_CONFIG.api_audience}`,
        params: {
          scope: `openid profile email user_metadata app_metadata picture`
        }
      }
    });
    this.cb = cb;
  }

  handleAuthentication() {
    // Add a callback for Lock's `authenticated` event
  }

  login = () => {
    console.log('lock', this.isAuthenticated());
    this.lock.show();
  };

  setSession(authResult) {}

  isAuthenticated = () => {};
}

export default Auth;
