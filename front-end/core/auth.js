import Axios from 'axios';
import { AUTH_CONFIG } from './auth0-variables';

export default class Auth {
  lock = new Auth0Lock(AUTH_CONFIG.clientId, AUTH_CONFIG.domain, {
    languageDictionary: {
      title: 'Pushkin'
    },
    // allowedConnections: ['facebook', 'Username-Password-Authentication'],
    // oidcConformant: true,
    autoclose: true,
    autoParseHash: true,
    auth: {
      autoParseHash: true,
      // connectionScopes: {
      //   facebook: ['email']
      // },
      // redirectUrl: AUTH_CONFIG.callbackUrl,
      // redirectUrl: 'http://localhost:8000/loading',
      redirect: false,
      // popup: true,
      // sso: true,
      responseType: 'token id_token',
      // audience: AUTH_CONFIG.audience,

      params: {
        scope: 'openid email' // Learn about scopes: https://auth0.com/docs/scopes
        // state: 36000
      }
    }
  });
  checkLogin = () => {
    return new Promise((res, rej) => {
      return this.lock.on('authenticated', authResult => {
        return res(authResult);
      });
    }).then(authResult => {
      let expiration;
      const oneDay = 1000 * 60 * 60 * 24;
      authResult.expiresIn
        ? (expiration = authResult.expiresIn * 100)
        : (expiration = oneDay);
      let expiresAt = JSON.stringify(expiration + new Date().getTime());
      localStorage.setItem('access_token', authResult.accessToken);
      localStorage.setItem('id_token', authResult.idToken); // static method
      localStorage.setItem('expires_at', expiresAt);
    });
  };
  updateUser = (payload, userId) => {
    const data = {
      user_metadata: { ...payload }
    };
    return new Promise((res, rej) => {
      return Axios.patch(`https://gww.auth0.com/api/v2/users/${userId}`, data, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('id_token')
        }
      })
        .then(resp => {
          return res(resp.data);
        })
        .catch(error => {
          return rej(error);
        });
    });
  };
  isAuthenticated = () => {
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  };
  getUserMetadata = userId => {
    return new Promise((res, rej) => {
      return Axios.get(`https://gww.auth0.com/api/v2/users/${userId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('id_token')
        }
      })
        .then(resp => {
          return res(resp.data.user_metadata);
        })
        .catch(error => {
          return rej(error);
        });
    });
  };
  getAccessToken = () => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      return null;
    }
    return accessToken;
  };
  resetPassword = email => {
    return new Promise((res, rej) => {
      const payload = {
        client_id: 'OIzT7gmLYcxbLZWGDz7LAsX6i2iCP2tc',
        email: email,
        connection: 'Username-Password-Authentication'
      };
      return Axios.post(
        'https://gww.auth0.com/dbconnections/change_password',
        payload,
        {
          headers: { 'content-type': 'application/json' }
        }
      )
        .then(resp => {
          return res(resp);
        })
        .catch(error => {
          return rej(error);
        });
    });
  };
}
