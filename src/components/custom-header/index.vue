<template>
	<div class="header-wrap" :style="{height:customBarHeight}">
		<div class="header c-fff flex" :style="{height:customBarHeight, paddingTop: statusBarHeight, background: bgColor}">
			<!-- isCustom和isBack属性只能二选一，否则样式冲突 -->
			<div class="action flex" @click="BackPage" v-if="isBack">
				<van-icon name="arrow-left" size="20px"/>
				<slot name="backText"></slot>
			</div>
			<!-- isCustom和isBack属性只能二选一，否则样式冲突 -->
			<div class="action flex border-custom" v-if="isCustom" :style="{width:customWidth, height: customHeight, marginLeft: customMarginLeft }">
				<van-icon name="arrow-left" class="flex-1 cus-icon" size="20px" @click="BackPage"/>
				<van-icon name="wap-home" class="flex-1 cus-icon" size="20px" @click="toHome"/>
			</div>
			<div class="content van-ellipsis" :style="{top:statusBarHeight}">
				<slot name="content"></slot>
			</div>
		</div>
	</div>
</template>

<script>
	import store from '../../store'

	export default {
		name: 'customeHeader',
		props:{
			isBack: false,	//isCustom和isBack属性只能二选一，否则样式冲突 
			isCustom: false,	//isCustom和isBack属性只能二选一，否则样式冲突 
			bgColor: {
				type: String,
				default: "linear-gradient(45deg, #39b54a, #8dc63f)"
			}
		},
		data() {
			return{
				customBarHeight: store.state.customBarHeight +"px",
				statusBarHeight: store.state.statusBarHeight +"px",
				custom: store.state.capsule
				//lineHeight: store.getters.customBarContentHeight +"px",
			}
		},
		computed:{
			customWidth(){
				return this.custom.width+'px';
			},
			customHeight(){
				return this.custom.height +'px'
			},
			customMarginLeft(){
				//return calc(100% - this.custom.right+'px')
				console.log(wx.getSystemInfoSync().windowWidth - this.custom.right)
				return (wx.getSystemInfoSync().windowWidth - this.custom.right)+"px"
			}
		},
		methods: {
			BackPage(){
				wx.navigateBack({
			        delta: 1
			    });
			},
			toHome(){
				wx.reLaunch({
			        url: '/pages/home/index/main',
			    })
			}
		}
	}	
</script>

<style scoped="scoped" lang="scss">
	.header{
		box-sizing: border-box;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		padding-right: 110px;
		z-index: 100;
		align-items: center;
		.action {
			align-items: center;
			height: 100%;
			justify-content: space-between;
			max-width: 100%;
			&.border-custom {
				position: relative;
				background: rgba(0, 0, 0, 0.15);
				border-radius: 500px;
				height: 30px;
			}
			.cus-icon{
				display: block;
				margin: auto !important;
				text-align: center;
			}
		}
		.action:first-child {
			margin-left: 10px;
			font-size: 16px;
		}
		 .content {
			position: absolute;
			text-align: center;
			width: calc(100% - 220px);
			left: 0;
			right: 0;
			bottom: 0;
			top: 0;
			margin: auto;
			height: 30px;
			font-size: 16px;
			line-height: 30px;
			cursor: none;
			pointer-events: none;
		}
	}
</style>