<template>
	<div class="number-keyboard fade" v-show="isShowPopup"  :style="{fontSize: fontSize + 'px' }">
		<transition name="slide-up" @after-enter="transitionEnd" @after-leave="transitionEnd">
		<div class="number-keyboard-dialog" v-show="isShowPopupBox" @touchmove.stop.prevent>
			<div class="number-keyboard-content">
				<div class="number-keyboard-body">
					<ul class="list-wrap">
						<li class="list-item" v-for="i in 9" :key="i" @click="onKeyDown(keyNumberList[i-1], $event)">{{keyNumberList[i-1]}}</li>
						<li class="list-item" :class="{'no-bg': isInteger}" @click="onKeyDown('.', $event)">{{ isInteger ? '' : '.'}}</li>
						<li class="list-item" @click="onKeyDown(keyNumberList[9], $event)">{{keyNumberList[9]}}</li>
						<li v-if="styleName=='popular'" class="list-item slidedown" @click="onSlideDown($event)"></li>
						<li v-else class="list-item no-bg delete" @click="onDelete($event)"></li>
					</ul>
				</div>
				<div class="number-keyboard-operate" v-if="styleName=='popular'">
					<ul class="list-wrap">
						<li class="list-item delete" @click="onDelete($event)"></li>
						<li class="list-item confirm" @click="onConfirm($event)">{{confirmText}}</li>
					</ul>
				</div>
			</div>
		</div>
		</transition>
	</div>
</template>

<script>
	module.exports = {
		data: function() {
			return {
				fontSize: 50, // 动态计算键盘的字体大小
				isShowPopup: false, // 是否显示外部弹窗
				isShowPopupBox: false, // 是否显示内部内容
				keyNumberList: [] // 数字列表
			}
		},
		props: {
			value: {
				type: Boolean,
				default: false
			},
			disorder: {
		    	type: Boolean,
		    	default: false
		   	}, // 数字键盘是否乱序
		   	styleName: {
		   		type: String,
		   		default: 'popular' // simple（无确认键和小数点，一般用于密码或验证码输入）、popular（有确认键和小数点，一般用于价格或金额输入）
		   	}, // 数字键盘风格
		   	confirmText: {
		      	type: String,
		      	default: '确定'
		    }, // 键盘确认键文案
		    isInteger: {
		    	type: Boolean,
		    	default: false
		    } // 是否是整数
		},
		watch: {
    		value(val) {
      			if(val){
      				this.show();
      			} else {
      				this.hide();
      			}
    		},
    		isShowPopup(val) {
      			this.$emit('input', val)
    		}
  		},
		created() {
			this.init();
			if(this.value) {
				this.show();
			}
		},
		methods: {
			init(){
				let _keyNumberList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
				if(this.disorder) {
					let count = 0, temp = null, index = null;
					while(count < 10){
						index = count + parseInt(Math.random() * (10 - count), 10);
						temp = _keyNumberList[index];
						_keyNumberList[index] = _keyNumberList[count];
						_keyNumberList[count] = temp;
						++count;
					}
				}
				this.keyNumberList = _keyNumberList;
				this.computeFontSize();
			},
			show(){
				this.isShowPopup = true;
				this.$nextTick(() => {
					this.isShowPopupBox = true;
				});
			},
			hide(){
				this.isShowPopupBox = false;
			},
			transitionEnd(){
				if(!this.isShowPopupBox) {
					this.isShowPopup = false;
				}
			},
			computeFontSize(){
				this.fontSize = ((document.body.clientWidth > 540 ? 540 : document.body.clientWidth) / 375 * 50).toFixed(2);
			},
			// 按键值
			onKeyDown(key, e){
				e.stopImmediatePropagation();
				if(key === "." && this.isInteger) {
					return;
				}
				this.$emit('keyDown', key);
			},
			// 隐藏
			onSlideDown(e){
				this.hide();
			},
			// 删除
			onDelete(e){
				e.stopImmediatePropagation();
				this.$emit('delete');
			},
			// 确认
			onConfirm(e){
				this.$emit('confirm');
			}
		}
	}
</script>

<style lang="less" scoped>
	.number-keyboard {
		
		.number-keyboard-dialog {
			width: 100%;
			max-width: 540px;
			transition: all .3s;
			position: fixed;
			transform: translateX(-50%);
    		left: 50%;
    		bottom: 0;
    		z-index: 999;
    		background: #FFFFFF;
    		height: 4.28em;
    		
    		&.slide-up-enter-active, .slide-up-leave-active {
				transform: translate(-50%, 0);
			}
			    
			&.slide-up-enter, .slide-up-leave-to {
				transform: translate(-50%, 70%);
			}
			    
			&.slide-up-leave-active {
				transform: translate(-50%, 100%);
			}
			
			.number-keyboard-content {
				display: flex;
    			width: 100%;
    			height: 100%;
    			position: relative;
    			box-shadow: 0px -2px 3px #E2E2E2;
    			
    			.number-keyboard-body, .number-keyboard-operate  {
    				display: flex;
    				
    				&:after {
    					content: " ";
					    display: table;
					    clear: both;
					    width: 0px;
    				}
    				
    				.list-wrap {
    					width: 100%;
    					float: left;
    					
    					.list-item {
    						float: left;
    						text-align: center;
    						transition: background .3s;
    						background: #FFFFFF;
    						position: relative;
    						
    						&:active {
    							background-color: #f0f0f0;
    						}
    						
    						&:before {
					        	content: "";
							    position: absolute;
							    z-index: 2;
							    background-color: #d9d9d9;
							    -webkit-transform-origin: 100% 50%;
							    transform-origin: 100% 50%;
							    transform: scaleX(.5) translateX(100%);
							    top: 0;
							    right: 0;
							    width: 1px;
							    height: 100%;
					        }
					        
					        &:after {
					        	content: " ";
							    position: absolute;
							    z-index: 2;
							    background-color: #d9d9d9;
							    -webkit-transform-origin: 100% 50%;
							    transform-origin: 100% 50%;
							    -webkit-transform: scaleY(.5) translateY(-100%);
							    transform: scaleY(.5) translateY(-100%);
							    top: 0;
							    left: 0;
							    width: 100%;
							    height: 1px;
					        }
    					}
    				}
    			}
    			
    			.number-keyboard-body {
    				flex: 3;
    				background: #ebebeb;
    				
    				.list-wrap {
    					
    					.list-item {
    						width: 33.3%;
    						height: 2.14em;
    						line-height: 2.14em;
    						font-size: .5em;
    						color: #666666;
    						
    						&.no-bg {
    							/*background: transparent;*/
    						}
    						
    						&:before {
					        	width: .04em;
					        }
					          
					        &:after {
					        	display: none;
					        }
					        
					        &:nth-of-type(n+4):after {
					        	display: inline;
					        	height: .04em;
					        }
					        
					        &:nth-of-type(3n):before {
					        	display: none;
					        }
					        
					        &.delete {
					        	background: url('./keyboard-del-simple.png') center no-repeat;
					          	background-size: .82em;
					        }
					        
					        &.slidedown {
					        	background: #fff url('./keyboard-hide.png') 50% no-repeat;
					          	background-size: 1.1em;
					        }
    					}
    				}
    			}
    			
    			.number-keyboard-operate {
    				flex: 1;
    				
    				.list-wrap {
    					display: flex;
    					flex-direction: column;
    					width: 100%;
    					
    					.list-item {
    						position: relative;
    						width: 100%;
    						
    						&:after {
				          		display: none;
				          	}
    						
    						&.delete {
					        	background: #fff url('./keyboard-del-simple.png') 50% no-repeat;
					          	background-size: .42em;
					          	flex: 1;
					          	&:before {
					          		display: -1px;
					          	}
					        }
					        
					        &.confirm {
					        	overflow: hidden;
    							color: #fff;
    							background: #fc9153;
    							display: flex;
    							flex: 3;
    							align-items: center;
    							justify-content: center;
							    font-size: .32em;
							    font-weight: 500;
							    
							    &:active {
							    	background-color: #dd7f49;
							    }
					          	
					          	&:before {
	    							display: none;
	    						}
					        }
    					}
    				}
    			}
			}
		}
	}
</style>