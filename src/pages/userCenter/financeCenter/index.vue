<template>
	<div class="page-index financeCenter bg-fff vh100 over-auto">
		<div class="content">
			<div class="container_title text-c">交易明细<i class="iconfont icon-icon-dsj"></i></div>
			<div class="refund-record">
				<div class="cell-table tb-title text-c bold flex">
					<div class="column column-title">时间</div>
					<div class="column column-title">金额</div>
					<div class="column column-title">状态</div>
				</div>
				<div class="cell-table tb-data text-c flex" v-for="(item, index) in list" :key="index">
					<div class="column column-data">
						<!--//mpvue中不支持在template中调用methods方法，可调用computed属性
						<p class="dayTime">{{moment(item.time)}}</p>
						<p class="day">{{moment3(item.time)}}</p>-->
						<p class="dayTime">{{item.time}}</p>
					</div>
					<div class="column column-data">
						<p class="price">{{item.money}} 元(人民币)</p>
						<p class="remark">{{item.comment}}</p>
					</div>
					<div class="column column-data">
						<p class="state">{{ item.status }}</p>
					</div>
				</div>
			</div>	
		</div>
	</div>
</template>

<script>
	export default {
		name: 'financeCenter',
		data(){
			return {
				list: [{
					"time": "2020-07-16 09:36:18",
					"comment": "--",
					"type": "银行卡提现",
					"id": 1758364,
					"status": "待打款",
					"money": 286.7
				}, {
					"time": "2020-06-30 11:24:23",
					"comment": "--",
					"type": "银行卡提现",
					"id": 1740632,
					"status": "已打款",
					"money": 437
				}, {
					"time": "2020-06-16 08:08:45",
					"comment": "--",
					"type": "银行卡提现",
					"id": 1725798,
					"status": "已打款",
					"money": 359
				}, {
					"time": "2020-06-10 11:00:48",
					"comment": "--",
					"type": "银行卡提现",
					"id": 820539,
					"status": "已打款",
					"money": 200.5
				}, {
					"time": "2020-05-24 19:08:58",
					"comment": "--",
					"type": "银行卡提现",
					"id": 802780,
					"status": "已打款",
					"money": 193.5
				}, {
					"time": "2020-05-15 11:26:32",
					"comment": "--",
					"type": "银行卡提现",
					"id": 792623,
					"status": "已打款",
					"money": 436.2
				}, {
					"time": "2020-04-30 20:03:12",
					"comment": "--",
					"type": "银行卡提现",
					"id": 776948,
					"status": "已打款",
					"money": 502.8
				}, {
					"time": "2020-04-23 10:42:35",
					"comment": "--",
					"type": "银行卡提现",
					"id": 767283,
					"status": "已打款",
					"money": 234
				}, {
					"time": "2020-04-21 13:19:37",
					"comment": "--",
					"type": "银行卡提现",
					"id": 764764,
					"status": "已打款",
					"money": 291.5
				}, {
					"time": "2020-04-14 10:05:08",
					"comment": "--",
					"type": "银行卡提现",
					"id": 754877,
					"status": "已打款",
					"money": 45
				}]
			}
		},
		methods:{},
		created(){
			//console.log(this.moment("2020-07-16 09:36:18"))
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
				.cell-table{
					border-bottom: 1px solid #eee;	
					.column{
						flex: 1;
						height: 30px;
						font-size: 13px;
						&.column-title{
							line-height: 30px;
							padding: 8px 0;
						}
						&.column-data{
							color:#666;
							padding: 12px 0;
							.state{
								line-height: 30px;
								color: red;
							}
						}
					}
				}
			}
		}	
	}
</style>