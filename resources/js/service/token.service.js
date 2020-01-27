const TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const DATA_USER = 'user';

const TOKEN_TYPE = 'token_type';
const APP_PREFIX = 'bms_app_';

/**
 * Manage the how Access Tokens are being stored and retreived from storage.
 *
 * Current implementation stores to localStorage. Local Storage should always be
 * accessed through this instace.
 **/
const TokenService = {

  get( key, defaultValue ) {

    if ( typeof defaultValue == "undefined" ) defaultValue = null;

    try {
      let data = JSON.parse(localStorage.getItem(`bm_client_${key}`));
      if  ( data === null ) data = defaultValue;
      return data;

    } catch (e) {
      return defaultValue
    }
  },

  set(key, value) {
    this.del( APP_PREFIX + key );
    localStorage.setItem( APP_PREFIX + key  , JSON.stringify(value) )
  },

  del(key) {
    localStorage.removeItem(APP_PREFIX + key );
  },

  getToken() {
    return localStorage.getItem(APP_PREFIX + TOKEN_KEY)
  },

  getTypeToken() {
    return localStorage.getItem(APP_PREFIX + TOKEN_TYPE)
  },

  saveTypeToken(tokenType) {
    localStorage.setItem(APP_PREFIX + TOKEN_TYPE, tokenType)
  },

  removeTypeToken() {
    localStorage.removeItem(APP_PREFIX + TOKEN_TYPE)
  },

  getUser() {
    return JSON.parse( localStorage.getItem(APP_PREFIX + DATA_USER) )
  },

  saveUser(user) {
    localStorage.setItem(APP_PREFIX + DATA_USER, JSON.stringify(user))
  },

  removeUser() {
    localStorage.removeItem(APP_PREFIX + DATA_USER)
  },

  saveToken(accessToken) {
    localStorage.setItem(APP_PREFIX + TOKEN_KEY, accessToken)
  },

  removeToken() {
    localStorage.removeItem(APP_PREFIX + TOKEN_KEY)
  },

  getRefreshToken() {
    return localStorage.getItem(APP_PREFIX + REFRESH_TOKEN_KEY)
  },

  saveRefreshToken(refreshToken) {
    localStorage.setItem(APP_PREFIX + REFRESH_TOKEN_KEY, refreshToken)
  },

  removeRefreshToken() {
    localStorage.removeItem(APP_PREFIX + REFRESH_TOKEN_KEY)
  }

};

export { TokenService }
