<template>
	<swiper :indicator-dots="indicatorDots" indicator-color="rgba(255,255,255, .3)" indicator-active-color="#ffffff" :autoplay="true" :interval="autoplayTime" :current="index" :circular="true"
		:style="{'height':height}">
	      <block v-for="(item, index) in datas" :key="index" >
		        <swiper-item>
		          	<image :src="item" mode="widthFix" class="w100"></image>
		        </swiper-item>
		    </block>
    </swiper>
</template>

<script>
	export default{
		name:"MySwiper",
		props:{
			autoplayTime: {
				type: String|Number,
				default: 3000,
			},
			height:{
				type: String|Number,
				default:"400rpx"
			},
			datas:{
				type: Array,
				default: ()=>{
					return [
						require('@/assets/img/s-1.jpg'),
						require('@/assets/img/s-2.jpg'),
						require('@/assets/img/s-3.jpg'),
						require('@/assets/img/s-4.jpg'),
					]
				}
			}
		},
		data(){
			return {
				index:0,
				indicatorDots:true,
				imgUrls: [
			        'http://mss.sankuai.com/v1/mss_51a7233366a4427fa6132a6ce72dbe54/newsPicture/05558951-de60-49fb-b674-dd906c8897a6',
			        'http://mss.sankuai.com/v1/mss_51a7233366a4427fa6132a6ce72dbe54/coursePicture/0fbcfdf7-0040-4692-8f84-78bb21f3395d',
			        'http://mss.sankuai.com/v1/mss_51a7233366a4427fa6132a6ce72dbe54/management-school-picture/7683b32e-4e44-4b2f-9c03-c21f34320870'
			    ]
			}
		},
		methods:{
			
		}
	}
</script>

<style>
</style>