<template>
	<div class="page-taskCenter w100 vh100 over-auto">
		<div class="fix-nav">
			<van-tabs active="a" animated>
			  <van-tab :title="item.name" name="a" v-for="(item, index) in category" :key="item.state">
			  	内容 1
			  </van-tab>
			</van-tabs>
		</div>
	</div>
</template>

<script>
	import data from './data'
	export default {
		name:"taskCenter",
		data(){
			return {
				category:[...data]
			}
		},
		methods:{
			
		}
	}
</script>

<style>
</style>