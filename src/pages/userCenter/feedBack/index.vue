<template>
	<div class="page-index bg-fff vh100 over-auto feedBack">
		<div class="content">
			<van-cell-group v-if="list.length">
				<van-cell>
					<van-row class="cell-table text-c bold">
					  <van-col span="8">时间</van-col>
					  <van-col span="8">标题</van-col>
					  <van-col span="8">处理情况</van-col>
					</van-row>
				</van-cell>
			  	<van-cell v-for="(item, index) in list" :key="index">
			  		<van-row class="cell-table f12 text-c">
						  <van-col span="8">
						  	<p class="dayTime">{{moment(item.FTime).format("YYYY-MM-DD")}}</p>
						  	<p class="day">{{moment(item.FTime).format('HH:mm:ss dddd')}}</p>
						  </van-col>
						  <van-col span="8" @click="toDetail(item)">
						  	<p class="fTitle f16">{{item.FViewsTitle}}</p>
						  	<p class="btn-detail">查看详情</p>
						  </van-col>
						  <van-col span="8"><p class="fStatus f16">{{item.FName}}</p></van-col>
					</van-row>
			  	</van-cell>
			</van-cell-group>
			<van-empty description="呜呜~啥也没有" v-else />
		</div>
		
		<div class="addFeedBack absolute">
			<van-icon name="add-o" size="32px" color="#EE580F" @click="addfeedBack"/>
		</div>
	</div>	
</template>

<script>
	//import utils from "@/utils/utils"
	export default {
		name: 'feedBack',
		data() {
			return {
				list:[]
			}
		},
		methods: {
			addfeedBack(){
				//this.$router.push("addFeedBack")
				wx.navigateTo({ url: "/pages/userCenter/addFeedBack/main"})
			},
			getFeedBackList(){
				this.API.getFeedBackList().then((data)=>{
					this.list = data || []
				})
			},
			toDetail(item){
				//this.$router.push({path:"/addFeedBack", query:{FID:item.FID}})
				wx.navigateTo({ url: "/pages/userCenter/addFeedBack/main?FID="+item.FID})
			}
		},
		created(){
			//this.getFeedBackList()
		}
	}
</script>

<style scoped lang="scss">
	.page-index {
		.header {
			background: #EE580F;
			font-size: 17px;
			/deep/ .van-icon,
			/deep/ .van-nav-bar__title {
				color: #fff;
			}
		}
		.content {
			margin-top: 46px;
			/deep/ .cell-table{
				.fStatus{
					line-height: 46px;
				}
				.btn-detail{
					color: dodgerblue;
				}
			}
		}
		.addFeedBack{
			bottom: 50px;
			right:26px;
		}
	}		
</style>