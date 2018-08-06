## vue-number-keyboard
vue-number-keyboard是基于VUE实现的数字键盘插件，当前支持整数、小数数字输入、乱序键盘，demo中给出了常用的验证码、金额数字示例。数字键盘的大小包括字体尺寸支持响应式。

[查看DEMO](https://yujinjin.github.io/vue-number-keyboard/)

## 运行项目
clone项目到本地，进入项目文件夹，安装依赖

```javascript
git clone https://github.com/yujinjin/vue-number-keyboard.git
cd loading
npm install
```
运行demo，会自动打开浏览器地址运行
```javascript
npm run demo
```
编译打包项目
```javascript
npm run compile
```

## NPM
```javascript
npm install vue-number-keyboard
```
## 依赖
- VUE

## 使用
作为插件
```javascript
import Vue from 'vue'
import numberKeyboard from 'vue-number-keyboard'
import "vue-number-keyboard/dist/vue-number-keyboard.css"

// VUE use
Vue.use(numberKeyboard);
```
## 可配置属性选项

名称 | 描述 | 默认值 | 可选项
---|---|---|---
`value` | 双向绑定值，用于显示或隐藏数字键盘 | false | `Boolean`
`disorder` | 数字键盘是否乱序，常用于密码输入 | false | `Boolean`
`styleName` | 数字键盘风格 | 'popular' | simple（无确认键和小数点，一般用于密码或验证码输入）、popular（有确认键和小数点，一般用于价格或金额输入）
`confirmText` | 键盘确认键文案 | '确定' | `String`
`isInteger` | 是否是整数 | false | `Boolean`

## 示例
###### 1. 货币金额
```html
<number-keyboard v-model="isShowAmountKeyboard" @delete="withdrawAmount ? (withdrawAmount = withdrawAmount.substring(0, withdrawAmount.length - 1)) : ''" @keyDown="withdrawAmountInput"></number-keyboard>
```
示例：

![image](https://note.youdao.com/yws/public/resource/b2a61ad71011584a10dcc60987acf09a/xmlnote/41D7071D69CD4577806E2E8E7C1E662D/6123)

###### 2. 验证码

```html
<number-keyboard :isInteger="true" @confirm="save" v-model="isShowVerificationCodeKeyboard" @keyDown="verificationCodeInput" @delete="validateCode ? (validateCode = validateCode.substring(0, validateCode.length - 1)) : ''"></number-keyboard>
```
示例：

![image](https://note.youdao.com/yws/public/resource/b2a61ad71011584a10dcc60987acf09a/xmlnote/A830BE497BE140959B3D210744485B87/6125)
###### 3. 密码输入（数字乱序）

```html
<number-keyboard :isInteger="true" :disorder="true" v-model="isShowPasswordKeyboard" @keyDown="passwordInput" @delete="password ? (validateCode = password.substring(0, password.length - 1)) : ''"></number-keyboard>
```
示例：

![image](https://note.youdao.com/yws/public/resource/b2a61ad71011584a10dcc60987acf09a/xmlnote/D72170E3234B4FA6AE17488D8B02D942/6127)




## 最后
- 如果喜欢一定要 star哈!!!（谢谢!!）

- 如果有意见和问题 请在 lssues提出，我会在线解答。
