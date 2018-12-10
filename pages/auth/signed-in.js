import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import gql from 'graphql-tag';
import withApollo from '../../lib/with-apollo';
import {
  setToken,
  checkSecret,
  extractInfoFromHash
} from '../../lib/utils/auth';

const AUTHENTICATE = gql`
  mutation authenticate($idToken: String!) {
    authenticate(idToken: $idToken) {
      id
      name
      email
    }
  }
`;

class SignedIn extends React.Component {
  static propTypes = {
    url: PropTypes.object.isRequired
  };

  signinOrCreateAccount({ accessToken, idToken, expiresAt }) {
    this.props.client
      .mutate({
        mutation: AUTHENTICATE,
        variables: { idToken }
      })
      .then(res => {
        console.log('signinOrCreateAccount res', res);
        // if (window.location.href.includes(`callback`)) {
        //   window.location.href = '/';
        // } else {
        //   window.location.reload();
        // }
      })
      .catch(err => console.log('Sign in or create account error: ', err));
  }

  componentDidMount() {
    console.log('this.props', this.props);
    const { idToken, accessToken, expiresIn, secret } = extractInfoFromHash();
    const expiresAt = JSON.stringify(expiresIn * 1000 + new Date().getTime());
    // if (!checkSecret(secret) || !idToken) {
    //   console.error('Something happened with the Sign In request');
    // }
    const data = {
      status: `success`,
      accessToken,
      idToken,
      expiresAt
    };
    // Set the accessToken in a cookie to send to server
    setToken({ accessToken, idToken });
    this.signinOrCreateAccount({ ...data });
    Router.push('/');
  }

  render() {
    // return <div>Cool</div>;
    return null;
  }
}

export default SignedIn;
