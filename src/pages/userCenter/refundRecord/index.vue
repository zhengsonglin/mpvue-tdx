<template>
	<div class="page-index refundRecord bg-fff vh100 over-auto">
		<div class="content">
			<div class="container_title text-c">定制金返款记录<i class="iconfont icon-icon-dsj"></i></div>
			<div class="refund-record">
				<van-cell class="van-cell">
					<div class="cell-table tb-title">
						<span>时间</span><span>订单号</span><span>记录</span><span>金额</span><span>状态</span>
					</div>
				</van-cell>
			  	<van-cell class="van-cell" v-for="(item, index) in list" :key="index">
			  		<div class="cell-table f12 tb-data flex">
			  			<span>{{item.time}}</span><span>{{item.order_sn }}</span>
			  			<span>{{(item.type)}}</span><span>{{item.comment}}</span>
			  			<span>已返款</span>
			  		</div>
			  	</van-cell>
				
			</div>
			
		</div>
	</div>
</template>

<script>
	import data from './data'
	export default {
		name: 'refundRecord',
		data(){
			return {
				list: [...data],
			    loading: false,
			    finished: false,
			}
		},
		methods:{
	        //解析返款状态
	        parseRefundState({FPingJiastatus, FNewStar}){
	        	console.log(FPingJiastatus, FNewStar)
	        	let stateText = "已返款"
	        	return stateText
	        },
			
		}
	}	
</script>


<style scoped lang="scss">
	.page-index {
		.content {
			padding: 0 10px;
			.container_title {
			    height: 46px;
			    line-height: 46px;
			    border-bottom: 1px solid #fd3c3c;
			    position: relative;
			    color: #fd3c3c;
			    font-size: 14px;
			    i {
				    position: absolute;
				    bottom: -18px;
				    right: 0;
    				left: 0;
				    color: #fd3c3c;
				    font-size: 30px;
				    width: 34px;
    				margin: 0 auto;
				}
			}
			.refund-record{
				.van-cell{
					font-size: 14px;
					.cell-table{
						padding: 10px 0;
	    				&.tb-title{
							font-weight: bold;
						}
						span{
							display: inline-block;
							text-align: center;
						}
						span:nth-of-type(1){width: 19%;}
						span:nth-of-type(2){width: 22%;padding: 0 2%;word-break: break-all;}
						span:nth-of-type(3){width: 20%;}
						span:nth-of-type(4){width: 16%;}
						span:nth-of-type(5){width: 18%;}
						&.tb-data{
							font-size: 12px;
							align-items: center;
							color: #555;
							border-bottom: 2rpx solid #eee;
							span:nth-of-type(5){
								font-size: 16px;
								color: #fd3c3c;
							}
						}
					}
					
					
				}
			}
		}
	}	
</style>