/**
 * 作者：yujinjin9@126.com
 * 时间：2018-07-19
 * 描述：数字键盘
 */
import NumberKeyboard from "./number-keyboard.vue";

const install = function (Vue, options) {
    Vue.component("number-keyboard", NumberKeyboard);
};

export { install, NumberKeyboard };
export default { install, NumberKeyboard };
