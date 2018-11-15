import Auth0Lock from 'auth0-lock';
import gql from 'graphql-tag';
import {AUTH_CONFIG} from './auth0-variables';

class Auth {
  lock = new Auth0Lock(AUTH_CONFIG.clientId, AUTH_CONFIG.domain, {
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

  constructor(cb, apolloClient) {}

  handleAuthentication() {
    // Add a callback for Lock's `authenticated` event
    this.lock.on('authenticated', this.setSession);
  }

  login() {}
}
