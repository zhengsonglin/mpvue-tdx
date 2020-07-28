<template>
	<div class="page-index bg-fff w100 vh100 over-auto sortProduct absolute">
		<div class="content flex h100">
			<div class="left-item h100 over-auto">
				<div :class="['nav-item', {active: category== item.id}]" v-for="(item,index) in categoryList" :key="index" @click.stop="changeCategory(item)">
					{{item.short_name}}
				</div>
			</div>
			<div class="right-item flex-1 h100 over-auto">
				<div class="right-wraper h100">
					<div class="top-item flex">
						<div :class="['status-tag flex-1 border-box', {active:statusItem.status == status}]" v-for="(statusItem, num) in productStatus" :key="num"
							 @click.stop="changeQueryStatus(statusItem)">{{statusItem.name}}</div>
					</div>
					<div class="bottom-item over-auto">
						
								<van-cell v-for="(item, index) in productList" :key="index" class="product-item">
									<div class="flex bg-fff">
										<div class="left-img">
											<!--<img :src="item.img" class="product-pic w100 h100" lazy-load/>-->
											<van-image mode="widthFix" width="100%" height="100%" lazy-load :src="item.img" class="product-pic " />
										</div>
										<div class="right-content flex-1 text-l">
											<div class="row-1 van-ellipsis">{{item.title}}</div>
											<div class="row-2">
												<span class="storeTag" v-show="index%2==0">需晒图</span>
											</div>
											<div class="row-3 over-hidden">
												<div class="left fl">
													<span class="title">垫付:</span> <p class="red inline-block">￥<span class="price bold">{{item.price}}</span></p></span>
												</div>
												<div class="right fr">
													<!--<span class="btn inline-block c-fff  text-c" @click="toProductDetail(item)">马上抢</span>-->
													<van-button type="danger" size="mini" class="buy-btn fr c-fff" @click.stop="toProductDetail(item)">马上抢</van-button>
												</div>
											</div>
											<div class="row-4 relative">
												<!--mpvue不支持在template中调用methods方法-->
												<div class="bar_box h100" :style="{color:'#666',width:item.widthPercent}"></div>
												<div class="bar_word w100 h100 c-fff absolute border-box">剩余{{item.task_count - item.order_count}}件/共{{item.task_count}}件 
													{{item.textPercent }}</div>
												
											</div>
										</div>
									</div>
								</van-cell>
							
					</div>
				</div>
			</div>
		</div>	
	</div>
</template>

<script>
	import data from './data'
	export default {
		name: 'sortProduct',
		data() {
			return {
				categoryList:[],
				productStatus:[
					{name:"进行中", status:null},
					{name:"即将开始", status:"1"},
					{name:"可预约", status:"2"},
				],
				productList:[],
				pageNo: 1,
				pageSize: 30,
				searchKey: "",
				category: 0,
				status: null,	//null进行中，1即将开始，2可预约
				loading: false,
				finished: false,
				refreshing: false,
			}
		},
		computed:{
			getParams(){
				return {
					page_no: this.pageNo,
					page_size: this.pageSize,
					keywords: this.searchKey,
					module_type: 1,
					status: this.status,
					type: 2,
					is_family: null,
					cid: this.category || 19
				}
			}
		},
		methods:{
			//改变查询商品类别
			changeCategory(item){
				this.category = item.id;
				this.productList = []
				let productList = []
				data.forEach((sItem, index)=>{
					if(item.id==0){
						productList.push(...sItem.products)
					}else{
						if(this.category == sItem.id){
							productList.push(...sItem.products)
						}
					}
				})
				
				this.productList = [...productList]
			},
			//改变查询商品状态
			changeQueryStatus(item){
				this.status = item.status
				this.onRefresh()
			},
			//查询所有商品类别
			getCategory(){
				return this.API.getCategory().then(({data, error})=>{
					this.categoryList = data
				})
			},
			
			onRefresh() {
				this.productList = []
				let productList = []
				data.forEach((item, index)=>{
					productList.push(...item.products)
				})
				
				this.productList = [...productList]
			},
			
			toProductDetail(item){
				//this.$router.push({path:"/productDetail", query:{shopId:item.FID, mark:"M"}})
				wx.navigateTo({ url: "/pages/home/productDetail/main?item="+JSON.stringify(item)})
			}
		},
		created(){
			/*this.getCategory().then(()=>{
				this.getProductList()
			});*/
			this.categoryList = [...data]
			let productList = []
			data.forEach((item, index)=>{
				productList.push(...item.products)
			})
			
			this.productList = [...productList]
		}
	}	
</script>


<style scoped lang="scss">
	.page-index {
		top:0;
		left: 0;
		z-index: 10;
		.content {
			.left-item{
				width: 64px;
				flex-basis: 64px;
				border-right: 1px solid #ddd;
				.nav-item{
					height: 48px;
					line-height: 48px;
					text-align: center;
					font-size: 14px;
					border-bottom: 1px solid #ddd;
					&.active{
						color: #e92322;
					}
				}
			}
			.right-item{
				.right-wraper{
					.top-item{
						border-bottom: 1px solid #ddd;
						.status-tag{
							height: 48px;
							line-height: 48px;
							text-align: center;
							&.active{
								border-bottom: 2px solid #fd3c3c;
							}
							&:not(last){
								border-right: 1px solid #ddd;
							}
						}
					}
					.bottom-item{
						background-color: #efeff4;
						height: calc(100% - 48px);
						/deep/ {
							.product-item{
								flex-direction: row;
								
								.left-img{
									width: 94px;
									flex-basis: 94px;
									height: 94px;
									border: 1px solid #eee; /*no*/
								} 
								.right-content{
									width: 0;
									box-sizing: border-box;
									padding-left: 12px;
									.row-1{
										font-size: 16px;
										line-height: 20px;
									}
									.row-2{
										height: 20px;
										line-height: 1;
										.storeTag{
											font-size: 12px;
											color: #ed7739;
	   	 									background: #fde9e0;
	   	 									padding: 2px 3px;
										}
									}
									.row-3{
										.left{
											span.title{
												color: #8f8f94;
												font-size: 12px;
											}
											p.red{
												color: #fd3c3c;
												font-size: 16px;
											}
										}
										.right{
											.btn{
												background-color: #fd3c3c;
												padding: 0px 6px;
	    										border-radius: 6px;
	    										font-size: 10px;
											}
										}
									}
									.row-4{
										width: 70%;
										height: 14px;
										margin-top: 10px;
										background-color: #ecc5ba;
										border-radius: 6px;
										line-height: 1;
										.bar_box{
											background-color: rgb(253, 60, 60);  border-radius: 0.5rem;
										} 
										.bar_word{
											padding-left:12px;
											font-size: 10px;
											top: 0;left: 0;
										}
									}
								}
							}
						}
					}
				} 
			}
		}
	}		
</style>