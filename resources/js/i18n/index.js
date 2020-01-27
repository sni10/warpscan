import Vue from 'vue'
import VueI18n from 'vue-i18n'
import inflection from 'inflection'

Vue.use(VueI18n)

const messages = {
  "en-US": require('./en-US.json'),
  "fr-CA": require('./fr-CA.json'),
  "ru-RU": require('./ru-RU.json')
}

const dateTimeFormats = {
  'en-US': {
    short: {
      month: 'short', day: 'numeric',
    },
    long: {
      month: 'short', day: 'numeric',
      hour: 'numeric', minute: 'numeric'
    }
  },
  'ru-RU': {
    short: {
      month: 'short', day: 'numeric'
    },
    long: {
      month: 'short', day: 'numeric',
      hour: 'numeric', minute: 'numeric', hour12: false
    }
  },
  'fr-CA': {
    short: {
      month: 'short', day: 'numeric'
    },
    long: {
      month: 'short', day: 'numeric',
      hour: 'numeric', minute: 'numeric', hour12: false
    }
  }
}

const i18n = new VueI18n({
  locale: 'en-US',
  messages,
  dateTimeFormats,
  silentTranslationWarn: true,
  missing(lang, key) {
    if (!key) {
      return
    }
    return inflection.titleize(key.replace(/^\w+\./, ''))
  }
});

export default i18n
