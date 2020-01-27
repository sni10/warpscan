import { UserService, AuthenticationError } from './../../service/user.service'
import { TokenService } from './../../service/token.service'
import router from './../../router'


export default {
  namespaced: true,
  state: {
    authenticating: false,
    user: null,
    userType: TokenService.getTypeToken(),
    accessToken: TokenService.getToken(),
    refreshToks: TokenService.getRefreshToken(),
    authenticationErrorCode: 0,
    authenticationError: '',
    refreshTokenPromise: null  // Holds the promise of the refresh token
  },
  getters: {
    isLogin: (state) => {
      return state.user !== null && state.user !== {};
    },

    getUser: (state) => {
      return state.user;
    },

    isGuest: (state) => {
      return state.userType === 'guest'
    },

    isUser: (state) => {
      return !!(state.userType === 'user' && state.accessToken && state.refreshToks)
    },

    authenticationErrorCode: (state) => {
      return state.authenticationErrorCode
    },

    authenticationError: (state) => {
      return state.authenticationError
    },

    authenticating: (state) => {
      return state.authenticating
    },
  },
  actions: {
    async login({ dispatch, commit, state }, {username, password}) {

      commit('loginRequest');

      try {
        const { token, refresh } = await UserService.login(username, password);

        const fetchData =  await dispatch('fetchUser');

        if ( fetchData ) {
          commit('loginSuccess', token);
          commit('loginRefresh', refresh);
          router.push( router.history.current.query.redirect || '/' );
        } else {
          location.reload()
        }

      } catch (e) {

        if (e instanceof AuthenticationError) {
          commit('loginError', {errorCode: e.errorCode, errorMessage: e.message})
          commit('saveUser', null)
        } else {

          console.log( e );

          commit('loginError', {errorCode: 401, errorMessage: 'The user credentials were incorrect. 401 Access denied'})
          commit('saveUser', null)
        }

        return false
      }
    },
    async guest({ commit }) {
      commit('loginRequest');
      try {
        const token = await UserService.guest();
        commit('guestSuccess', token);
        // Redirect the user to the page he first tried to visit or to the home view
        return true
      } catch (e) {
        if (e instanceof AuthenticationError) {
          commit('loginError', {errorCode: e.errorCode, errorMessage: e.message});
          commit('saveUser', null);
        } else {
          commit('loginError', {errorCode: 401, errorMessage: 'The guest credentials were incorrect. 401 Access denied'});
          commit('saveUser', null);
        }
        return false
      }
    },
    logout({ commit }) {
      UserService.logout();
      commit('logoutSuccess');
      commit('saveUser', null);
      router.push( '/login' );
    },
    async fetchUser({ commit }) {

          try {
            const userData = await UserService.fetchUser();
            commit('saveUser', userData);
            return true;
          } catch (e) {
            if (e instanceof AuthenticationError) {
              commit('loginError', {errorCode: e.errorCode, errorMessage: e.message});
              commit('saveUser', null);
            } else {
              commit('loginError', {errorCode: 401, errorMessage: 'Fetch error userData. 401 Access denied'});
              commit('saveUser', null);
            }
        }
      return true;
    },

    refreshToken({ commit, state }) {
      // If this is the first time the refreshToken has been called, make a request
      // otherwise return the same promise to the caller
      if(!state.refreshTokenPromise) {
        const promise = UserService.refreshToken();
        commit('refreshTokenPromise', promise);

        // Wait for the UserService.refreshToken() to resolve. On success set the token and clear promise
        // Clear the promise on error as well.
        promise.then(
          response => {
            commit('refreshTokenPromise', null);
            commit('loginSuccess', response);
          },
          error => {
            commit('refreshTokenPromise', null);
          }
        )
      }

      return state.refreshTokenPromise
    }
  },
  mutations: {
    refreshTokenPromise(state, promise) {
      state.refreshTokenPromise = promise
    },

    loginRequest(state) {
      state.authenticating = true;
      state.authenticationError = '';
      state.authenticationErrorCode = 0;
    },

    loginSuccess(state, accessToken) {
      state.accessToken = accessToken;
      state.userType = 'user';
      state.authenticating = false;
    },

    loginRefresh(state, refreshToken) {
      state.refreshToks = refreshToken;
    },

    guestSuccess(state, accessToken) {
      state.accessToken = accessToken;
      state.userType = 'guest';
      state.authenticating = false;
    },

    saveUser(state, user) {
      state.user = user
    },

    loginError(state, {errorCode, errorMessage}) {

      console.log('errorCode',errorCode);
      console.log('errorMessage',errorMessage);

      state.authenticating = false;
      state.authenticationErrorCode = errorCode;
      state.authenticationError = errorMessage;
    },

    logoutSuccess(state) {
      state.accessToken = null;
      state.user = null;
      state.authenticating = false;
      state.refreshToks = null;
      state.userType = 'guest';
    }
  }
}
