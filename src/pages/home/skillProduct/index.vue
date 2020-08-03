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
			<van-tabs swipeable sticky @click="onTabClick" class="nav-tabs"><!--swipeable-->
				<van-tab :title="item.short_name" v-for="(item, index) in category" :key="item.short_name">
				  	
				  	<div class="flex product-wraper">
				  		<div class="product-content bg-fff w100" v-for="(sItem, sIndex) in item.products" :key="sIndex">
				  			<p class="p-img"><img :src="sItem.img" mode="widthFix" class="product-pic w100"/></p>
				  			<p class="row p-title text-c van-ellipsis">{{sItem.title}}</p>
				  			<div class="flex row">
				  				<div class="p-price red">￥{{sItem.price}}</div>
				  				<div class="p-discount flex red">
				  					<span class="c-fff fanli">返利</span><span class="fl-price">￥2.80</span>
				  				</div>
				  			</div>
				  			<div class="flex row low-price">
				  				<p class="c-fff text">最低价 <span>￥{{sItem.price-1}}</span></p>
				  				<img class="taobao" mode="widthFix" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpFQjJCMDI0RjBGRkExMUVBODczQUM4NTlDOTZCNTZBMSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpFQjJCMDI1MDBGRkExMUVBODczQUM4NTlDOTZCNTZBMSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkVCMkIwMjREMEZGQTExRUE4NzNBQzg1OUM5NkI1NkExIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkVCMkIwMjRFMEZGQTExRUE4NzNBQzg1OUM5NkI1NkExIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+7hv6RQAAA6BJREFUeNrEl2lsTVsUx3/3ltLWVDOlMVV4xmgiiCAR8xBi/GAInob4IAgxRoiIMcJ7RaSJRIiIKURiKCHGxFRjDaXmUjXX2JZrLes251ZvOSS9XcnK3WfvdfZ/r+m/z/Ug4psUHi4/U0THicZRPHJXdKPock9iTo7HD7pPtBuhkSOivb1+T0MFqtJVdKrXH95Qy1hvMeb0VxLnpYSkaGCPB6o2gIhKzlzlWGg9oODcX0qp4KBynoTt0KIv5H2BTWPh4g7omADdp8O3r7BrBhz732yr1JND1ody1SBMtvzwEp5chdeP/xC4epyB/rAoA50nwrX90GGMP05hUKMxTE6G2DZQplzw3R9egB3TIP1MYd+kj32FZktHwPzrUCnGng8tE89zpPvmFrT7KnM3DsNNac0H5+DFPfM4rgsMXgFRVcQmF1Z2tkP8FlilfHXJ50B49wyepsLMsxAe6QCGCe9kyOHWdIf3Lwq/32kCDF1t40u7IWm4i+KKjYdBcuKzWyDtuOVbQbOzYMMQAc4zu2epNtZi+1kzbzv71WrmIsea05FJYvwP1GkFiX1g/2LoMRM2/ws9ZzuetxliGkw2BMxXqOGinXzf4NxWyP0MNZtYAWlxLJYiqtcWWvaTXKZb6N5nOe8lS4Q2j3c096OzFlHRBbAWgxaTAimg9nL/hbamuc64Jt4MhltHZfMvAXfPKbi811Hd54/7WCVLbrG14t2SJ1Ctkc31nge1m8Psi4XtJ+wuOtQq4VGQ88EFsIpWrvbs60f2fHwdXNnrrPeaA5HR/rX1ctg7EqGGVvW5nwruFRj6X1KmyjBpB28p61Wlyp6zoN0oAzv6H3zOdmxTdhqLKdnoel5AGrRefD6XwP0WWMXqSym7ILouxLQ0jawcnGbziyhe3osKsMl+7jLHysfaPioXtsGnNwV5N16K69V9ocooZy5BuLxseesKZb62I5y1txkuqlpB+y/yt5aEJ3mljVMPCdhDG+tlMHCpUWK+Xfppo0YlHK2JfLr9wdkpv/E4rLTcNPWd58t7hIFu2VgrcnkHyfFoqFjL5vQWykyTVjoJTboazeqNFV1HUrXQodcT611eEg3aw/BEI4KfyL1IWfLYIhEo7zJtj9SDLoHzi0Xz5VZiWgjTNTWvtZWe3pAb67x5HGz7IoFL7NMnBMBpJYB72+v/WxFqSVJgbdTkEIIeEF3l1T9QMtAvOyFi7hQTmBawfpLMUDIWzLzvAgwAR7gnISyU8Z4AAAAASUVORK5CYII="/>
				  			</div>
				  			<div class="buy-btn text-c" @click="toProductDetail(sItem)">
				  				马上抢
				  			</div>
				  			
				  		</div>
				  	</div>	
				  		
				  	
				  	
		
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
			.product-wraper{
				padding: 10px;
				flex-wrap: wrap;

				.product-content{
					width: 50%;
					box-sizing: border-box;
					padding: 15px;
					/*box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);*/
					border: 3px solid rgba(220, 220, 220,0.5);
					.p-img{
						overflow: hidden;
						.product-pic{height:auto}
					}
					.row{
						align-items: center;
						margin-bottom: 10px;
						.red{
							color: #e54d42;
						}
						.p-price{
							text-decoration: line-through;
						}
						.p-discount{
							border: 1px solid #e54d42;
							margin-left: 15px;
							align-items: center;
							.fanli{
								background: #e54d42;
								padding: 2px 6px;
							}
							.fl-price{
								padding: 2px 6px;
							}
						}
						&.low-price{
							justify-content: space-between;
							
							.text{
								background: #e54d42;
								border-radius: 0 14px 14px 0;
								padding: 2px 12px 2px 8px;
								font-size: 12px;
							}
							.taobao{
								width: 18px;
								height: 18px;
							}
						}
						
					}
					.buy-btn{
						color: #f50;
					    border: 1px solid #f50;
					    border-radius: 4px;
					    box-shadow: 0 0.08rem 0.02667rem 0 rgba(255,201,169,.43);
					    font-size: 14px;
					    margin-top: 10px;
					    padding: 3px 0;
					}
				}
			}
			
		}
		
	}
</style>