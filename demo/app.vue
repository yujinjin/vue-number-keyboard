<template>
    <div class="view" @click.stop.prevent="closeNumberKeyboard(0)">
        <header class="navbar">
            <a class="icon-left"></a>
            <div class="center">数字键盘插件</div>
            <a class="right-bar-text"></a>
        </header>
        <div class="page content">
            <div class="widthraw-cash-money-wrap">
                <div class="title">提现金额</div>
                <div class="input-money-container">
                    <span>¥</span>
                    <div class="money-input-box" :class="{ active: isShowAmountKeyboard }" @click.stop.prevent="closeNumberKeyboard(1)">
                        <input type="text" :value="withdrawAmount" maxlength="-1" readonly="readonly" disabled="disabled" class="money-input" :placeholder="'可提现金额:12元'" />
                    </div>
                </div>
                <number-keyboard v-model="isShowAmountKeyboard" @delete="withdrawAmount ? (withdrawAmount = withdrawAmount.substring(0, withdrawAmount.length - 1)) : ''" @keyDown="withdrawAmountInput"></number-keyboard>
            </div>
            <div class="verification-code-input">
                <div class="label">验证码：</div>
                <div class="verification-code-box" @click.stop.prevent="closeNumberKeyboard(2)">
                    <span v-for="i in 6" :key="i" class="key-box" :class="{ active: i - 1 == validateCode.length && isShowVerificationCodeKeyboard, used: validateCode.length > i - 1 }">
                        <i class="icon-blink" v-if="i - 1 == validateCode.length"></i>
                        <template v-else-if="validateCode.length > i - 1">{{ validateCode.substr(i - 1, 1) }}</template>
                    </span>
                </div>
                <number-keyboard :isInteger="true" @confirm="save" v-model="isShowVerificationCodeKeyboard" @keyDown="verificationCodeInput" @delete="validateCode ? (validateCode = validateCode.substring(0, validateCode.length - 1)) : ''"></number-keyboard>
            </div>
            <div class="password-input">
                <div class="label">密码：</div>
                <div class="password-box" @click.stop.prevent="closeNumberKeyboard(3)">
                    <span v-for="i in 6" :key="i" class="key-box" :class="{ active: i - 1 == password.length && isShowPasswordKeyboard, used: password.length > i - 1 }">
                        <i class="icon-blink" v-if="i - 1 == password.length"></i>
                        <i class="icon-dot" v-else-if="password.length > i - 1"></i>
                    </span>
                </div>
                <number-keyboard :isInteger="true" :disorder="true" v-model="isShowPasswordKeyboard" @keyDown="passwordInput" @delete="password ? (validateCode = password.substring(0, password.length - 1)) : ''"></number-keyboard>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data: function () {
        return {
            withdrawAmount: "", // 当前用户输入的提现金额（String类型）
            isShowAmountKeyboard: false, // 是否展示输入提现金额的键盘
            isShowVerificationCodeKeyboard: false, // 是否展示输入验证码的键盘
            validateCode: "", // 验证码
            isShowPasswordKeyboard: false, // 是否展示密码的键盘
            password: "" // 密码
        };
    },
    methods: {
        // 提现金额输入的值
        withdrawAmountInput(key) {
            if (this.withdrawAmount.indexOf(".") != -1) {
                if (key === ".") {
                    console.error("请输入正确的金额格式!");
                    return;
                } else if (this.withdrawAmount.split(".")[1].length > 1) {
                    console.error("提现的金额最多只能输入2位小数!");
                    return;
                }
            }
            this.withdrawAmount += key;
        },

        // 关闭所有键盘弹窗
        closeNumberKeyboard(type) {
            if (type == 0) {
                this.isShowAmountKeyboard = false;
                this.isShowVerificationCodeKeyboard = false;
                this.isShowPasswordKeyboard = false;
            } else if (type == 1) {
                this.isShowAmountKeyboard = true;
                this.isShowVerificationCodeKeyboard = false;
                this.isShowPasswordKeyboard = false;
            } else if (type == 2) {
                this.isShowAmountKeyboard = false;
                this.isShowVerificationCodeKeyboard = true;
                this.isShowPasswordKeyboard = false;
            } else if (type == 3) {
                this.isShowAmountKeyboard = false;
                this.isShowVerificationCodeKeyboard = false;
                this.isShowPasswordKeyboard = true;
            }
        },

        // 确定
        save() {
            console.info("确认...");
            this.isShowVerificationCodeKeyboard = false;
        },

        // 验证码输入
        verificationCodeInput(key) {
            if (this.validateCode && this.validateCode.length > 6) {
                return;
            }
            this.validateCode += key;
        },
        // 密码输入
        passwordInput(key) {
            if (this.password && this.password.length > 6) {
                return;
            }
            this.password += key;
            console.info(this.password);
        }
    }
};
</script>
<style lang="less">
@-webkit-keyframes key-flash {
    0% {
        opacity: 0;
        filter: alpha(opacity=0);
    }

    to {
        opacity: 1;
        filter: none;
    }
}

@keyframes key-flash {
    0% {
        opacity: 0;
        filter: alpha(opacity=0);
    }

    to {
        opacity: 1;
        filter: none;
    }
}
.view {
    margin: 0 auto;
    width: 100%;
    min-width: 320px;
    max-width: 540px;
    display: flex;
    position: relative;

    header {
        background: rgb(255, 255, 255);
        width: 100vw;
        z-index: 999;
        top: 0;
        position: fixed;
        right: 0;
        left: 0;
        height: 44px;
        padding-right: 10px;
        padding-left: 10px;
        border-bottom: 0;
        border-bottom: 1px solid #e6e4e4;
        backface-visibility: hidden;
        display: flex;
        justify-content: space-between;

        .icon-left {
            text-align: center;
            width: 50px;

            i.back {
                width: 12px;
                height: 44px;
                display: inline-block;
                vertical-align: middle;
                background-size: 100% auto;
                background-position: center;
                background-repeat: no-repeat;
                font-style: normal;
                position: relative;
                background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D'12'%20height%3D'20'%20viewBox%3D'0%200%2012%2020'%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%3E%3Cpath%20d%3D'M.18261596%209.4221638c.0352203-.05148305.07573462-.10050698.1215468-.14631917L9.1425872.4374202c.5830904-.58309038%201.52656832-.5849888%202.11643872.00488163.5857864.58578644.591222%201.53009836.0048816%202.11643873L3.82594417%209.9967039l7.43188553%207.4318855c.5830904.5830904.5849888%201.5265683-.0048817%202.1164387-.5857864.5857865-1.5300983.591222-2.11643868.0048816L.2980849%2010.7114853c-.3526746-.3526746-.3939974-.89699-.11546894-1.2893215z'%20fill%3D'%23007aff'%20fill-rule%3D'evenodd'%2F%3E%3C%2Fsvg%3E");
            }

            .left-text {
                margin-left: 5px;
                line-height: 44px;
                color: #007aff;
                font-size: 15px;
                display: inline-block;
            }
        }

        .center {
            text-align: center;
            line-height: 44px;
            font-size: 17px;
            color: #000;
            text-overflow: ellipsis;
        }

        .right-bar-text {
            width: 50px;
        }
    }

    .page {
        padding-top: 0px;
        margin-top: 0px;
        height: auto;
        min-height: 100vh;
        width: 100%;
        margin-top: 45px;
        min-height: calc(~"100vh - 45px");
        height: 1000px;

        .widthraw-cash-money-wrap {
            margin-top: 10px;
            font-size: 16px;
            padding: 20px 16px;

            .title {
                color: #333;
            }

            .input-money-container {
                font-size: 40px;
                color: #f55424;
                padding-top: 10px;
                line-height: 50px;
                display: flex;

                span {
                    display: inline-block;
                    margin-right: 10px;
                }
                .money-input-box {
                    width: 80%;
                    display: inline-block;
                    height: 50px;

                    input {
                        width: 100%;
                        padding: 0;
                        margin: 0;
                        font-size: 40px;
                        color: #f55424;
                        height: 50px;
                        line-height: 50px;
                        border-width: 0 0 1px;
                        border-color: #d9d9d9;
                        border-radius: 0px;
                        outline: none;
                        pointer-events: none;
                        opacity: 1;
                        background-color: #ffffff;
                    }

                    &.active input {
                        border-color: #1aad19;
                    }

                    input::-webkit-input-placeholder {
                        font-size: 20px;
                    }
                }
            }
        }

        .verification-code-input,
        .password-input {
            padding: 50px 10px 0px;

            .label {
                color: #333;
                font-size: 16px;
                line-height: 30px;
                padding: 10px 0px;
            }

            .verification-code-box,
            .password-box {
                position: relative;
                display: flex;
                justify-content: center;
                flex-wrap: nowrap;

                .key-box {
                    align-items: center;
                    height: 35px;
                    width: 35px;
                    color: #333;
                    font-size: 16px;
                    display: flex;
                    margin: 0 4px;
                    justify-content: center;
                    position: relative;

                    &.used {
                        background-color: #f2f2f2;

                        .icon-dot {
                            display: block;
                            height: 5px;
                            width: 5px;
                            line-height: 5px;
                            border-radius: 5px;
                            background-color: #000;
                        }
                    }

                    &:before {
                        content: "";
                        display: block;
                        padding-bottom: 100%;
                    }

                    &:after {
                        content: "";
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 200%;
                        height: 200%;
                        border: 1px solid #d9d9d9;
                        box-sizing: border-box;
                        transform-origin: 0 0;
                        transform: scale(0.5);
                        border-radius: 2px;
                        z-index: 2;
                    }

                    &.active {
                        &:after {
                            border-color: #fc9153;
                        }

                        .icon-blink {
                            width: 1px;
                            height: 20px;
                            display: block;
                            background-color: #fc9153;
                            animation: key-flash steps(2) 1s infinite;
                        }
                    }
                }
            }
        }
    }
}
</style>
