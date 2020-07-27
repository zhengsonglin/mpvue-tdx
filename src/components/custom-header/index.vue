<template>
	<div class="header-wrap" :style="{height:customBarHeight}">
		<div class="header c-fff text-c" :style="{height:customBarHeight, paddingTop: statusBarHeight, lineHeight: lineHeight, background: bgImage}">
			<div class="action" @click="BackPage" v-if="isBack">
				<van-icon name="arrow-left" />
				<slot name="backText"></slot>
			</div>
			<div class="content">{{title}}</div>
		</div>
	</div>
</template>

<script>
	import store from '../../store'
	export default {
		name: 'customeHeader',
		props:{
			isBack: false,
			title: {
				type: String,
				default: "淘大熊",
			},
			bgImage: {
				type: String,
				default: "linear-gradient(45deg, #39b54a, #8dc63f)"
			}
		},
		data() {
			return{
				customBarHeight: store.state.customBarHeight +"px",
				statusBarHeight: store.state.statusBarHeight +"px",
				lineHeight: store.getters.customBarContentHeight +"px",
			}
		},
		methods: {
			BackPage(){
				wx.navigateBack({
			        delta: 1
			    });
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
		z-index: 100;
	}
</style>