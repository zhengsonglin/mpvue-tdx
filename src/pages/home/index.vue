<template>
	<div class="home">
		<my-swiper></my-swiper>
		 
	</div>
</template>

<script>
	import mySwiper from '@/components/swiper'
	export default{
		name: "home",
		components: {
		    mySwiper
		},
		data(){
			return {
				active: 0,
				indicatorDots: true,
				autoplay: true,
				interval: 3000,
				duration: 200,
				background: ['demo-text-1', 'demo-text-2', 'demo-text-3']
			}
		},
		methods:{
			
		}
	}
</script>

<style>
</style>