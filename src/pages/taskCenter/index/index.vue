<template>
	<div class="page-taskCenter w100 vh100 over-auto">
		<div class="fix-nav">
			<van-tabs active="a" animated>
			  <van-tab :title="item.name" name="a" v-for="(item, index) in category" :key="state">
			  	<div class="product bg-fff" v-for="(sItem, sIndex) in item.product" :key="id">
			  		
					<div class="top-wrap flex c-fff">
						<div class="task-shop"><span class="cu-tag c-fff">淘宝</span>{{sItem.shop_name}}</div>
						<div class="task-state">任务状态:<span class="span-df">{{sItem.stateText}}</span></div>
					</div>	
					
					<div class="center-wrap flex">
						<div class="o-top-l">
							<!--<img :src="sItem.url" mode="widthFix" class="w100" lazy-load/>-->
							<van-image width="100%" height="100%" mode="widthFix" lazy-load :src="sItem.url" class="w100" />
						</div>
						<div class="o-top-r flex-1 padding-xs span-sm">
							<div class="span-df van-ellipsis"><span>{{sItem.title}}</span></div>
							<div class="margin-top-xs ">订单号:<span class="margin-left-xs">{{sItem.orderNo}}</span></div>
							<div class="margin-top-xs ">总价:<span class="margin-left-xs span-orange">{{sItem.price}}</span></div>
							<div class="margin-top-xs ">实拍:<span class="margin-left-xs span-pink">{{sItem.actPrice}}</span></div>
							<div class="margin-top-xs">买家旺旺:<span class="margin-left-xs span-blue">zold845517008</span></div>
						</div>
					</div>
					
					<div class="o-bottom">
						<div>
							<van-button color="#e54d42" size="mini" class="margin-left-sm" @click.stop="showGoodsInfo(sItem)">商品信息</van-button>
							<van-button color="#0081ff" size="mini" class="margin-left" @click.stop="toRefundDetail(sItem)">申请售后</van-button>
							<van-button color="#39b54a" size="mini" class="margin-left" @click.stop="uploadScreenShot(sItem)">查看好评截图</van-button>
							<van-button color="#e03997" size="mini" class="margin-left" @click.stop="showRemarkDialog(sItem)">查看商家备注</van-button>
						</div>
						<div class="flex time-info">
							<span class="sub text-left">申请时间：{{sItem.create_time}}</span>
							<span class="sub text-right">完成时间：{{sItem.finish_time}}</span>
						</div>
					</div>
			  	</div>
			  </van-tab>
			</van-tabs>
		</div>
	
		<van-dialog class="van-dialog" :show="showProductDialog" use-slot use-title-slot>
			<div slot="title"> <div class="custom-title c-fff van-ellipsis">【{{productItem.title}}】</div></div>
			
			<div class="product-info">
				<div class="info-item red">店铺名: 匠石独韵</div>
				<div class="info-item red">下单价: ￥{{toDecimal2(productItem.price)}}</div>
				<div class="info-item red">礼品: {{productItem.FGoodsName || productItem.title}}</div>
				<div class="shop-img text-c">
					<img :src="productItem.url" mode="widthFix" class="p-img"/>
				</div>
			</div>
		</van-dialog>
	</div>
</template>

<script>
	import data from './data'

	export default {
		name:"taskCenter",
		data(){
			return {
				category:[...data],
				showProductDialog: false,
				productItem: {}
			}
		},
		created(){
			let result = []
			data.forEach((item)=>{
				result.push(...item.product)
			})
			data[0].product = [...result]
			this.category = [...data]
		},
		methods:{
			showGoodsInfo(sItem){
				this.productItem = Object.assign({}, sItem)
				this.showProductDialog = true
			},
			toRefundDetail(item){
				wx.navigateTo({ url: "/pages/taskCenter/refundDetail/main?item="+JSON.stringify(item)})
			},
			uploadScreenShot(item){
				wx.navigateTo({ url: "/pages/taskCenter/uploadScreenShot/main?item="+JSON.stringify(item)})
			},
			showRemarkDialog(){
				wx.showModal({
				  title: '商家备注信息',
				  content: '双收藏，货比三家，至少停留3分钟，禁止用券，禁止用红包、集分宝，不要走淘客链接,',
				  showCancel: false,
				  confirmText: '知道了',
				  confirmColor: '#1989fa',
				  success (res) {
				    if (res.confirm) {
				      console.log('用户点击确定')
				    } else if (res.cancel) {
				      console.log('用户点击取消')
				    }
				  }
				})
				
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	
	.product{
		margin: 10px;
		
	    .top-wrap{
		    padding: 8rpx 12rpx;
		    background: #cdc0bf;
		    font-size: 26rpx;
		    justify-content: space-between;
		    .cu-tag{
		    	font-size: 12px;
				vertical-align: middle;
				position: relative;
				display: inline-flex;
				align-items: center;
				justify-content: center;
				box-sizing: border-box;
				padding: 0px 8px;
				height: 24px;
				font-family: Helvetica Neue, Helvetica, sans-serif;
				white-space: nowrap;
				margin-right: 10px;
				background-color: #f37b1d;
		    }
		    .span-df{
		    	margin-left: 10px;
		    	font-size: 14px;
		    }
		}
		.center-wrap{
			padding: 2px 0 5px;
			.o-top-l{
			    width:130px;
			    height: 128px;
			    padding: 5px;
			    box-sizing: border-box;
			}
			.o-top-r{
			    color: #333;
			    font-size: 12px;
			    box-sizing: border-box;
			    padding: 5px;
			    .span-df{
			    	font-size: 15px;
			    }
			    .margin-top-xs{
			    	margin-top: 6px;
			    	font-size: 13px;
			    	.margin-left-xs{
			    		margin-left: 5px;
			    	}
			    	.span-orange{color: #f37b1d;}
			    	.span-pink{color: #e03997;}
			    	.span-blue{color: #0081ff;}
			    }
			}
		}
		.o-bottom{
			.margin-left-sm{
				margin-left: 5px;
			}
			.margin-left{
				margin-left: 10px;
			}
			.time-info{
				font-size: 12px;
				justify-content: space-around;
				padding: 5px 0;
				margin-top: 5px;
			}
		}
	}
	.van-dialog{
		.custom-title{
			background: linear-gradient(to right, #f0785d, #e35e40);
			padding: 10px 6px;
			margin-top: -30px;
		}
		.product-info{
			width: 90%;
			margin: 10px 20px auto;
			line-height: 26px;
			font-size: 16px;
			color: #fd3c3c;
			.shop-img{
				margin-top: 5px;
				.p-img{
					object-fit: contain;
					width: 80%;
				}
			}
		}
	}

</style>