import axios from 'axios'
import router from '../router'
import { TokenService } from './token.service'
import store from '../store'
import types from '../store/types'
import Vue from "vue";
import _ from "lodash";

global.LOADING_ENABLED = true;

const ApiService = {

  init(baseURL) {
    axios.defaults.baseURL = baseURL;
    axios.interceptors.request.use((config) => {
      global.LOADING_ENABLED && store.commit(types.START_LOADING);
      return config;
    })

    axios.interceptors.response.use(
      (response) => {
        const pageHeader = _.get(response, 'data._meta.page_header');
        store.commit(types.SET_PAGE_HEADER, pageHeader);
        this.stop();
        return response;
      },
      async (error) => {


        if (error.response) {

          let dataObj = {};

          dataObj.status = error.response.status;
          dataObj.data = error.response.data;
          dataObj.statusText = error.message;


          switch ( parseInt(dataObj.status) ) {
            case 422:
              console.log( 422 );
              break;
            case 401:

              // ===========================================================================================
              // Todo:  Добавить перехватчик на инвалидный рефреш токен или если персональный токен инвокед
              // ===========================================================================================

              console.log( '401 - Error START INTERCEPT' );
              console.log( '=========================' );
              console.log( '=========================' );
              console.log( '=========================' );


              if ( !!dataObj.data.error && dataObj.data.error === "invalid_request" ) {
                console.log( '401 - invalid_request or refresh' );
                console.log( '=========================' );
                console.log( dataObj.statusText );
                console.log( dataObj.data  );
                console.log( 'IsGuest', store.getters['auth/isGuest'] );
                console.log( 'isUser', store.getters['auth/isUser'] );
                console.log( 'Url', error.config.url );
                console.log( 'Data', error.config.data );
                console.log( '=========================' );
                console.log( '=========================' );

                store.dispatch('auth/logout');
                router.push('/login');
              }

              if ( !!dataObj.data.error && dataObj.data.error === 'invalid_credentials' ) {
                console.log( '401 - login or password is incorrect' );
                console.log( '=========================' );
                console.log( dataObj.statusText );
                console.log( dataObj.data  );
                console.log( 'IsGuest', store.getters['auth/isGuest'] );
                console.log( 'isUser', store.getters['auth/isUser'] );
                console.log( 'Url', error.config.url )
                console.log( 'Data', error.config.data )
                console.log( '=========================' )
                console.log( '=========================' )
              }

              if ( !!dataObj.data.message && dataObj.data.message === 'Unauthenticated.' ) {
                console.log( '401 - Unauthenticated' )
                console.log( '=========================' )
                console.log( dataObj )
                console.log( error.config )
                console.log( '=========================' )
                console.log( '=========================' )
              }

              if  ( error.config.url.includes('oauth/token/')  ) {

                // Refresh the access token
                console.log( '401 - Error oauth/token' )
                console.log( dataObj )

                // Vue.prototype.$snotify.error(String(dataObj.statusText))
                // throw error

              }
              else {

                // Refresh the access token
                try{

                  await store.dispatch('auth/refreshToken')
                  // Retry the original request

                  console.log( 'Re try request' )
                  console.log( '=========================' )
                  console.log( 'IsGuest', store.getters['auth/isGuest'] )
                  console.log( 'isUser', store.getters['auth/isUser'] )
                  console.log( 'Url', error.config.url )
                  console.log( 'Data', error.config.data )
                  console.log( '=========================' )
                  console.log( '=========================' )

                  ApiService.setHeader();
                  return this.customRequest({
                    method: error.config.method,
                    url: error.config.url,
                    data: error.config.data
                  })

                } catch (e) {
                  // Refresh has failed - reject the original request
                  throw error
                }

              }

              console.log( '401 - Error END INTERCEPT' )
              console.log( '=========================' )
              console.log( '=========================' )
              console.log( '=========================' )

              break
            case 400:
              console.log( 400 )
              break
            case 403:
              console.log( 403 )
              break
            case 404:
              router.push('/404')
              break;
            case 500:
              router.push('/500')
              break;
          }

          let msg = _.get(dataObj.data, 'message', _.get(dataObj.data, 'error.message', _.get(dataObj.data, '0.message')))
          if (Array.isArray(msg)) {
            msg = msg[0].message
          }

          if (msg) {
            Vue.prototype.$snotify.error(String(msg))
          } else {
            console.error(dataObj.data)
          }



        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }


        this.stop();

        console.log( dataObj.data, dataObj.status, dataObj.statusText )

        // If error was not 401 just reject as is

      }
    )
  },

  setHeader() {
    axios.defaults.headers.common["Authorization"] = `Bearer ${TokenService.getToken()}`
    axios.defaults.headers.common["Accept"] = `application/json`
  },

  removeHeader() {
    axios.defaults.headers.common = {}
  },

  get(resource) {
     this.start();
    return axios.get(resource)
  },

  post(resource, data) {
    this.start();
    return axios.post(resource, data)
  },

  put(resource, data) {
    this.start();
    return axios.put(resource, data)
  },

  delete(resource) {
    this.start();
    return axios.delete(resource)
  },

  start() {
    store.commit(types.START_LOADING)
  },

  stop() {
    store.commit(types.STOP_LOADING)
  },

  /**error.config.url
   * Perform a custom Axios request.
   *
   * data is an object containing the following properties:
   *  - method
   *  - url
   *  - data ... request payload
   *  - auth (optional)
   *    - username
   *    - password
   **/
  customRequest(data) {
    return axios(data)
  },

}

export default ApiService
