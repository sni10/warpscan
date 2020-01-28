import Vue from 'vue'
import Vuetify from 'vuetify'

import colors from 'vuetify/lib/util/colors'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader

Vue.use(Vuetify)

const opts = {
    icons: {
        iconfont: 'md' || 'mdiSvg' || 'mdi' || 'md' || 'fa' || 'fa4'
    },
    theme: {
        options: {
            minifyTheme: function (css) {
                return process.env.NODE_ENV === 'production'
                    ? css.replace(/[\r\n|\r|\n]/g, '')
                    : css
            },
        },
        light: true,
        themes: {
            light: {
                primary: colors.blue.darken3,
                secondary: colors.grey.darken1,
                accent: colors.shades.black,
                error: colors.red.accent3,
            },
            dark: {
                primary: colors.blue.lighten1,
            },
        },
    }
}

export default new Vuetify(opts)
