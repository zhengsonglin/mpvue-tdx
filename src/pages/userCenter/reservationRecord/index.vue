<template>
	<div class="page-index reservationRecord bg-fff vh100 over-auto">
		<div class="content">
			<van-tabs @click="onClick" v-model="active">
			  <van-tab title="已预订商品">
			  	<div class="v-tab-content">
			  		<div class="row-title flex bold text-c f14">
			  			<span class="date">预定日期</span><span class="detail">商品详情</span><span class="hand">操作</span>
			  		</div>
			  		<div class="text-c f12">
				  		<div class="row-data flex" v-for="n in 5">
				  			<span class="date">2020-05-06 13:30:42</span><span class="detail">书包</span><span class="hand">
				  				<van-button type="primary" size="mini">删除</van-button>
				  			</span>
				  		</div>
			  		</div>
			  	</div>
			  </van-tab>
			  <van-tab title="预订商品记录">
			  	<div class="v-tab-content">
			  		<div class="row-title flex bold text-c f14">
			  			<span class="date">预定日期</span><span class="detail">商品详情</span><span class="hand">操作</span>
			  		</div>
			  		<div class="text-c f12">
				  		<div class="row-data flex" v-for="n in 3">
				  			<span class="date">2020-06-12 14:22:34</span><span class="detail">羽毛球拍</span><span class="hand">
				  			<van-button type="primary" size="mini">删除</van-button>
				  			</span>
				  		</div>
			  		</div>
			  	</div>
			  </van-tab>
			</van-tabs>
		</div>
	</div>	
	
</template>

<script>
	export default {
		name: 'reservation-record',
		data(){
			return {
				active:0,
				list1: [],
				list2: [],
			}
		},
		methods:{
			//获取用户已预定商品
			getUserReserve(){
				this.API.getUserReserve().then((data)=>{
					this.list1 = data
				})
			},
			//获取用户预定商品记录
			getUserReserveRecord(){
				this.API.getUserReserveRecord().then((data)=>{
					this.list2 = data
				})
			},
			onClick(index, title) {
		      console.log(name, title);
		      if(index==0){
		      	//this.getUserReserve()
		      }else{
		      	//this.getUserReserveRecord()
		      }
		    },
		    deleteUserReserve(item){
		    	this.API.deleteUserReserve({fid:item.FID }).then((data)=>{
		    		if (data.ErrorCode == 100) {
                        this.$wxToast('操作成功！');
                        if(this.active==0){
					      	this.getUserReserve()
					    }else{
					      	this.getUserReserveRecord()
					    }
                    } else if (data.ErrorCode == 101) {
                        this.$wxToast(data.Content);
                    } else {
                        var url = "/MobileUserCenter/ReservationRecord";
                        //location.href = "/Mobile/MobileLogin?rturl=" + url;
                        this.$router.push({path:"/login", query:{rturl:url}})
                    }

		    	})
		    },
		    handleDelete(item){
				this.$dialog.confirm({message: '确定要删除吗?'}).then(() => {
					console.log(678)
				    //this.deleteUserReserve(item)
				}).catch((e) => {
					console.log(e)
				    // on cancel
				});
		    }
		}
	}	
</script>

<style scoped lang="scss">
	.page-index {
		.content {
			padding: 0 10px;
			.v-tab-content{
				.row-title, .row-data{
					align-items: center;
					height: 50px;
					border-bottom: 2px solid #eee;
					.date{
						width: 30%;
						flex-basis: 30%;
					}
					.detail{
						width: 40%;
						flex-basis: 40%;
					}
					.hand{
						width: 30%;
						flex-basis: 30%;
					}
				}
			}
		}
	}		
</style>