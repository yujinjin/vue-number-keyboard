/**
 * 作者：yujinjin9@126.com
 * 时间：2018-03-27
 */
import babelPolyfill from 'babel-polyfill'
import Vue from 'vue'
import vueApp from "./app"
import numberKeyboard from '../dist/vue-number-keyboard.js'
import "../dist/vue-number-keyboard.css"
Vue.use(numberKeyboard);
let VueApp = Vue.extend(vueApp);
new VueApp({name: "app"}).$mount('#app');
