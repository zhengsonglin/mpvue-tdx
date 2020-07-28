<template>
	<div class="page-index skillProduct vh100 over-auto">
		<van-search
		  :value="keywords"
		  placeholder="请输入搜索关键词"
		  use-action-slot
		  bind:change="onChange"
		>
		  <div slot="action">
		  	<van-button round color="#39b54a" size="mini" @click="onSearch">搜索</van-button>
		  </div>
		</van-search>
		<div class="nav-wraper bg-fff">
			<van-tabs swipeable sticky @click="onTabClick" class="nav-tabs">
			  <van-tab :title="item.short_name" v-for="(item, index) in category" :key="item.id">
			  	
			  	<van-row gutter="10">
				  <van-col span="12" v-for="(sItem, sIndex) in item.products" :key="sItem.t_id">
			  		<div class="product-item bg-fff">
			  			<div class="row">
			  				<!--<img :src="sItem.img" mode="widthFix" class="product-pic w100"/>-->
			  				
			  			</div>
			  		</div>
				  </van-col>
				  
				</van-row>
	
			  </van-tab>
			 
			</van-tabs>
		</div>
	</div>
</template>

<script>
	import data from './data'
	export default{
		name:"skillProduct",
		data(){
			return {
				keywords:"",
				category:[...data]
			}
		},
		methods:{
			onChange(){},
			onSearch(){},
			onTabClick(){
				
			},
			toProductDetail(item){
				wx.navigateTo({ url: "/pages/home/productDetail/main?item="+JSON.stringify(item)})
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.skillProduct{
		.nav-wraper{
			margin-top: 6px;
			

			.nav-tabs{
			
			}
			.product-item{
				padding: 10px;
				box-shadow: 0 15px 10px rgba(0, 0, 0, 0.2);
			}
		}
		
	}
</style>