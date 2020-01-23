const mix = require('laravel-mix');
/**
 * CLone settings for webStorm configuration from vue.config.js
 * File | Settings | Languages & Frameworks | JavaScript | Webpack -> set this file
 * for seen webpack import path aliases highlight '@/path' or '~/path'
 * */
const path = require('path');

mix.webpackConfig({
    resolve: {
        extensions: [ '.js', '.vue' ],
        alias: {
            "~": path.resolve(__dirname, 'resources/'),
            "@": path.resolve(__dirname, 'resources/')
        }
    }
})

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js')
   .sass('resources/sass/app.scss', 'public/css');
