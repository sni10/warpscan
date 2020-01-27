import ApiService from './api.service'
import { TokenService } from './token.service'
import { mapState, mapGetters, mapActions } from "vuex";
import store, {types} from '../store'
import auth from "../store/modules/auth";


class AuthenticationError extends Error {
  constructor(errorCode, message) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.errorCode = errorCode
  }
}

const UserService = {
  ...mapActions('auth', [
    'guest'
  ]),
  /**
   * Login the user and store the access token to TokenService.
   *
   * @returns access_token
   * @throws AuthenticationError
   **/
  login: async function(username, password) {

    const requestData = {
      method: 'post',
      url: process.env.VUE_APP_API_ROOT + "oauth/token/",
      data: {
        grant_type: 'password',
        client_id: process.env.VUE_APP_CLIENT_ID_PASSWORD,
        client_secret: process.env.VUE_APP_CLIENT_SECRET_PASSWORD,
        username: username,
        password: password
      },
    };

    try {

      const response = await ApiService.customRequest(requestData);

      TokenService.saveToken(response.data.access_token);
      TokenService.saveTypeToken( 'user' );
      TokenService.saveRefreshToken(response.data.refresh_token);
      ApiService.setHeader();

      // NOTE: We haven't covered this yet in our ApiService
      // but don't worry about this just yet - I'll come back to it later
      // ApiService.mount401Interceptor();

      return { token: response.data.access_token, refresh: response.data.refresh_token }

    } catch (error) {
      throw new AuthenticationError(error.response.status, error.response.data.detail)
    }
  },

  guest: async function() {
    const requestData = {
      method: 'post',
      url: process.env.VUE_APP_API_ROOT + "oauth/token/",
      data: {
        grant_type: 'client_credentials',
        client_id: process.env.VUE_APP_CLIENT_ID_CREDENTIAL,
        client_secret: process.env.VUE_APP_CLIENT_SECRET_CREDENTIAL,
        scope: ''
      }
    };

    try {
      const response = await ApiService.customRequest(requestData);

      TokenService.saveToken(response.data.access_token);
      TokenService.saveTypeToken( 'guest' );
      ApiService.setHeader();

      return response.data.access_token

    } catch (error) {

      console.log( error );

      throw new AuthenticationError(error.response.status, error.response.data.detail)
    }
  },

  /**
   * Refresh the access token.
   **/
  refreshToken: async function() {
    const refreshToken = TokenService.getRefreshToken();

    const requestData = {
      method: 'post',
      url: process.env.VUE_APP_API_ROOT + "oauth/token/",
      data: {
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: process.env.VUE_APP_CLIENT_ID_PASSWORD,
        client_secret: process.env.VUE_APP_CLIENT_SECRET_PASSWORD,
      }
    }

    try {
      const response = await ApiService.customRequest(requestData);

      TokenService.saveToken(response.data.access_token);
      TokenService.saveTypeToken( 'user' );
      TokenService.saveRefreshToken(response.data.refresh_token);
      ApiService.setHeader();

      return response.data.access_token
    } catch (error) {
      throw new AuthenticationError(error.response.status, error.response.data.detail)
    }

  },

  /**
   * Refresh the access token.
   **/
  fetchUser: async function() {
    ApiService.setHeader();
      try {
        const response = await ApiService.get('user');
        let userData = response.data.data;
        TokenService.saveUser( userData );
        return userData
      } catch (error) {
        throw new AuthenticationError(error.response.status, error.response.data.detail)
      }
    return false;

  },

  /**
   * Logout the current user by removing the token from storage.
   *
   * Will also remove `Authorization Bearer <token>` header from future requests.
   **/
  logout() {
    // Remove the token and remove Authorization header from Api Service as well

    if ( TokenService.getTypeToken() == 'user' )  {
      TokenService.removeToken();
      TokenService.removeTypeToken();
      TokenService.removeRefreshToken();
      TokenService.removeUser();
      ApiService.removeHeader();
      store.dispatch('auth/guest')
    }

  }
}

export default UserService

export { UserService, AuthenticationError }
