<template>
	<div class="home">
		<!--<custome-header title="首页"></custome-header>-->
		<custome-header>
			<view slot="content">首页</view>
		</custome-header>
		
		<div class="swiper-wraper" style="height: 400rpx;overflow: hidden;">
			<my-swiper height="400rpx"></my-swiper>
		</div>
		
		<div class="row-wraper">
			<van-row class="activity-type">
				<van-col span="12">
					<div @click="sortProduct" class="row bg-fff text-c">
						<img src="../../../assets/img/nav-1.png" mode="heightFix" />
					</div>
				</van-col>
				<van-col span="12">
					<div class="row bg-fff text-c" @click="changeSkillTaskList">
						<img src="../../../assets/img/nav-2.png" mode="heightFix" />
					</div>
				</van-col>
			</van-row>
		</div>

		<advertising-vertical :datas="advertisingList">
			<!--<template v-slot:title>
				<p class="adv-title">商城头条
					<van-icon name="bullhorn-o" />
				</p>
			</template>-->
		</advertising-vertical>

		<div class="content">
			<div v-for="(item, index) in list" :key="index" class="product-item bg-fff block">
				<van-row class="bg-fff product-item-row" @click.stop="toProductDetail(item)">
					<div class="flex">
						<div class="left-item">
							<div class="imgShow w100 h100">
								<van-image width="100%" height="100%" mode="widthFix" lazy-load :src="item.img" class="product-pic w100" />
							</div>
						</div>
						<div class="right-item flex-1">
							<div class="product-info">
								<div class="p-title">{{item.title}}</div>
								<div class="p-tag"><span class="inline-block" v-show="item.is_img==1">需晒图</span></div>
								<div class="p-price over-auto"><span>垫付:</span><span class="price">￥{{item.price}}</span>
									<van-button type="danger" size="mini" class="buy-btn fr c-fff" @click.stop="toProductDetail(item)">马上抢</van-button>
								</div>
								<div class="progress">
									<!--//mpvue中不支持在template中调用methods方法，可调用computed属性, 下面的percent方法都是无效的
									<div class="bar_box inline-block h100" :style="{width:percent(item.order_count/item.task_count, 0)}"></div>
									<div class="bar_txt w100 h100 c-fff">剩余{{item.task_count - item.order_count}}件/共{{item.task_count}}件{{percent(item.order_count/item.task_count, 0)}} </div>
									-->
									<div class="bar_box inline-block h100" :style="{width:item.widthPercent}"></div>
									<div class="bar_txt w100 h100 c-fff">剩余{{item.task_count - item.order_count}}件/共{{item.task_count}}件{{widthPercent}} </div>
								</div>
							</div>
						</div>
					</div>
				</van-row>
			</div>
			<div class="load-more text-c">
				<p v-show="isLoadingMore"><van-loading size="18px" type="spinner">加载中...</van-loading></p>
				<p v-show="nodata" class="nodata">没有数据了</p>
			</div>
			
		</div>
	</div>
</template>

<script>
	import customeHeader from '@/components/custom-header'
	import mySwiper from '@/components/swiper'
	import advertisingVertical from '@/components/advertising/advertising-vertical'
	import store from '@/store'
	import data from './data'
	import {getRandomFromArray} from '@/assets/js/util'
	
	
	export default {
		name: "home",
		components: {
			customeHeader,
			mySwiper,
			advertisingVertical
		},
		data() {
			return {
				advertisingList: store.state.advertisingList,
				list: [],	//...data
				isLoadingMore: false,
				nodata:false
			}
		},
		created(){
			data.forEach((item, index)=>{
				data[index].widthPercent = this.percent(item.order_count/item.task_count, 0)
			})
			console.log(data)
			this.list = [...data]
			
		},
		methods: {
			sortProduct(){
				wx.navigateTo({ url: "/pages/home/sortProduct/main"})
			},
			changeSkillTaskList(){
				wx.navigateTo({ url: "/pages/home/skillProduct/main"})
			},
			toProductDetail(item){
				wx.navigateTo({ url: "/pages/home/productDetail/main?item="+JSON.stringify(item)})
			}
		},
		onPullDownRefresh(){
		    console.log("我正在下拉刷新") //用于测试下拉刷新
		    setTimeout(()=>{
		    	this.list = [...data]
		    	this.nodata = false
		    	wx.stopPullDownRefresh() //调用微信停止下拉刷新的函数
		    },2000)
		},
		onReachBottom: function() {
		    // Do something when page reach bottom.
		    //console.log("底部了")
		    let appData = getRandomFromArray([...data], 4, false)
		    
		    if(!this.isLoadingMore && !this.nodata){
		    	this.isLoadingMore = true
		    	setTimeout(()=>{
		    		this.isLoadingMore = false
		    		this.list.push(...appData)
		    		
		    		if(this.list.length>20){
		    			this.nodata = true
		    		}
		    	},2000)
		    }
		    
		},
	}
</script>

<style lang="scss" scoped="scoped">
	.row-wraper {
		margin: 10px;
		.activity-type {
			img {
				height: 76px;
			}
		}
	}

	.content {
		.product-item {
			min-height: 120px;
			padding: 0;
			border-radius: 6px;
			margin: 0 10px 10px;
			
			.product-item-row {
				.left-item{
					width: 122px;
					height: 122px;
					.imgShow {
						margin: 6px;
						.product-pic {
							object-fit: cover;
							min-height: 100px;
							max-height: 150px;
						}
					}
				}
				.right-item{
					.product-info {
						font-size: 14px;
						height: 130px;
						display: flex;
						flex-direction: column;
						justify-content: space-around;
						padding-left: 14px;
						.p-title {}
						.p-tag {
							span {
								color: #ed7739;
								background: #fde9e0;
								padding: 2px 3px;
								line-height: 24px;
							}
						}
						.p-price {
							>span {
								vertical-align: middle;
								color: #8f8f94;
								&.price {
									color: #fd3c3c;
									font-size: 16px;
									font-weight: 800;
									margin-left: 10px;
								}
							}
							.buy-btn {
								margin-right: 10px;
							}
						}
						.progress {
							width: 70%;
							position: relative;
							height: 14px;
							background-color: #ecc5ba;
							border-radius: 10px;
							line-height: 1;
							.bar_box {
								background-color: #fd3c3c;
								border-radius: 0.5rem;
							}
							.bar_txt {
								position: absolute;
								left: 0;
								top: 0;
								font-size: 12px;
								text-indent: 10px;
							}
						}
					}
				}
			}
			
		}
		.load-more{
			padding-bottom:10px;	
			.nodata{
				font-size: 16px;
				color: #969799;
			}	
		}
		
	}
</style>