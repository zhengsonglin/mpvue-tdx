<template>
	<div class="page-index withDrawCash bg-fff vh100 over-auto">
		<div class="content">
			<van-cell-group>
			  	<van-field label="可提现金额 :" :value="withDrawCashInfo.balance" readonly input-align="right" label-width="94">
					<van-icon name="success" color="#3cb926" size="20" slot="right-icon"/>
				</van-field>
				<van-field label="提现方式 :" :value="withDrawCashInfo.withdrawalWay" readonly input-align="right" label-width="94">
					<van-icon name="checked" color="#1989fa" size="20" slot="right-icon" />
				</van-field>
			  	<!--<van-field name="radio" :value="withDrawCashInfo.withdrawalWay" label="提现方式 :" readonly class="cell-radio-field">
			
				</van-field>-->
			  	<van-field label="姓名 :" :value="withDrawCashInfo.real_name" readonly input-align="right"  />
			  	<van-field label="银行名称 :" :value="withDrawCashInfo.bank" readonly input-align="right" />
			  	<van-field label="银行卡号 :" :value="withDrawCashInfo.bank_card" readonly input-align="right" />
			  	<van-field label="提现金额 :" :value="withDrawCashInfo.balance" readonly input-align="right" />
			  	
			  	
			</van-cell-group>
			<van-button block  color="linear-gradient(to right, #4bb0ff, #6149f6)"  @click="submit" class="btn-submit" size="small">提交申请</van-button>
			
			<!-- 用户相关说明 -->
	        <div class="about-user">
	            <h4>用户提现相关说明</h4>
	            <ul>
	                <li>1、平台暂时只支持提现到银行卡账户</li>
	                <li>2、在国家法定假日和双休日期间，用户可以申请提现，但会在假期后第一个工作日予以处理。由此造成的不便，请多多谅解！</li>
	                <li>3、提现后需要2-3个工作日安排提现打款</li>
	                <li>4、提现金额不得低于1元，提现的所有手续费均由平台承担</li>
	                <li>5、如有相关问题，请联系平台客服咨询！</li>
	            </ul>
	        </div>
		</div>
		
		<van-overlay :show="showTips" @click="showTips = false" z-index="100" class="overlay-tips">
		  	<div class="wrapper vh100" @click.stop="showTips = false">
		  		<div class="tips-content over-hidden" @click.stop>
			    	<div class="header c-fff text-c">提醒</div>
			    	<div class="tips bg-fff text-c">
			    		<p class="p-text">因财务调整，建议优先选择绑定招商银行卡，招行卡提现会更便捷快速，其他银行卡提现、到账时间不变</p>
			    	</div>
		    	</div>
		  	</div>
		</van-overlay>
	</div>	
</template>

<script>
	export default {
		name: 'withDrawCash',
		data(){
			return {
				withDrawCashInfo: {
					balance: "87.5",
					withdrawalWay:'银行卡',
					real_name: "张三疯",
					bank: "招商银行",
					bank_card: "6216831380163216856",
				},
			    
			    showTips: true
			}
		},
		methods:{
			
		    submit(){
		   		/*
		   			if (error.errno == 200) {
                        this.$wxToast({
                        	duration: 600, // 持续展示 toast
						  	forbidClick: true,
						  	type: "success",
						  	message: '提现成功,请等待系统审核！',
						  	onClose:()=>{this.$router.back()}
						});
                        
                    } else if (error.errno == 101) {
                        if (data.Content == "无支行信息") {
                            this.$router.push("/cardBind")
                        } else {
                            this.$wxToast({
							  	//forbidClick: true,
							  	type: "fail",
							  	message: error.usermsg
							});
                        }
                    } else if (error.errno != 200) {
                        this.$wxToast({
						  	//forbidClick: true,
						  	type: "fail",
						  	message: error.usermsg
						});
                    }

		   		*/
		    }
		},
		
	}	
</script>

<style scoped lang="scss">
	.page-index {
		.content {
			padding: 0 10px;
			/deep/ .van-cell{
				.van-cell__title{
					font-size: 13px;
				}
				.van-cell__value{
					font-size: 13px;
				}
			} 
			.cell-radio-field{
				/deep/ .van-field__control--custom {
					flex-direction: row-reverse;
				}
			}
			.green{
				color: #3cb926;
				font-size: 18px;
			}
			.btn-submit{
				margin: 30px 0 0;
				/deep/ .van-button{
					height: 40px;
					border-radius: 6px;
				}
			}
			.about-user {
			    background-color: #f7efd2;
			    margin: auto;
			    margin-top: 30px;
			    padding: 20px;
			    >h4{
			    	font-size: 16px;
			    	margin-bottom: 10px;
			    }
			    ul>li{
			    	font-size: 14px;
			    }
			}
		}
		.overlay-tips{
			.wrapper{
				display: flex;
			    align-items: center;
			    justify-content: center;
			    flex-direction: column;
			    .tips-content{
			    	width: 94%;
					margin: 0 auto;
					border-radius: 6px;
					.header{
						height: 40px;
						line-height: 39px;
	    				background-color: red;
	    				font-size: 16px;
					}
					.tips{
						padding: 10px 20px 20px;
						background-color: #fff4f3;
						.p-text{
							line-height: 26px;
							font-size: 14px;
							color: #8f8f94;
						}
					}
				}
			}
			
		}
	}		
</style>