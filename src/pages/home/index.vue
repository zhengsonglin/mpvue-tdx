<template>
	<div class="home">
		home
		<van-tabbar :active="active" @change="onChange">
		  <van-tabbar-item icon="home-o">标签1</van-tabbar-item>
		  <van-tabbar-item icon="search">标签2</van-tabbar-item>
		  <van-tabbar-item icon="friends-o">标签3</van-tabbar-item>
		  <van-tabbar-item icon="setting-o">标签4</van-tabbar-item>
		</van-tabbar>
	</div>
</template>

<script>
	export default{
		name: "home",
		data(){
			return {
				active: 0
			}
		},
		methods:{
			onChange(event) {
				console.log(event)
				this.active = event.mp.detail
			    wx.showToast({
			      title: `点击标签 ${event.mp.detail + 1}`,
			      icon: 'none',
			    });
			},
		}
	}
</script>

<style>
</style>