/**
 * First, we will load all of this project's Javascript utilities and other
 * dependencies. Then, we will be ready to develop a robust and powerful
 * application frontend using useful Laravel and JavaScript libraries.
 */

require('./bootstrap');
import Vue from 'vue';
import Vuetify from 'vuetify';

import Routes from '@/js/routes.js'

import App from '@/js/views/App'

// src/main.js
import vuetify from '@/js/layouts/vuetify' // path to vuetify export

const app = new Vue({
    el: "#run",
    router: Routes,
    vuetify,
    render: h => h(App)
})

export default app;
