import types from '../types'
import { TokenService } from '../../service/token.service'
import i18n from '../../i18n'

export default {
  state: {
    locale: null,
  },
  mutations: {
    [types.SET_LOCALE](state, locale) {
      state.locale = locale
      TokenService.set('locale', locale)
      i18n.locale = locale
    },
  },
  getters: {
    currentLanguage(state){
      return String(state.locale).replace(/-\w+/, '')
    }
  },
  actions: {
    [types.FETCH_LOCALE]({commit}){
      const cachedLocale = TokenService.get('locale')
      if (cachedLocale) {
        
        commit(types.SET_LOCALE, cachedLocale)
      }
    }
  }
}
