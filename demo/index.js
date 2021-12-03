/**
 * 作者：yujinjin9@126.com
 * 时间：2018-03-27
 */
import Vue from "vue";
import vueApp from "./app";
import numberKeyboard from "../dist/vue-number-keyboard.umd.min.js";
import "../dist/vue-number-keyboard.css";
// import numberKeyboard from "../src/index.js";
Vue.use(numberKeyboard);
let VueApp = Vue.extend(vueApp);
new VueApp({ name: "app" }).$mount("#app");
