<template>
	<div class="page-index bg-fff vh100 over-auto cardBind">
		<div class="content">
			<van-cell-group class="cell-group">
				<van-field :value="form.phone" label="手机号码" placeholder="手机号码" :readonly="isDisabled"/>
				<van-field v-model="form.reallyName" label="真实姓名" placeholder="真实姓名" :readonly="isDisabled"/>
				<van-field :value="form.bankName" label="开户银行" placeholder="开户银行" :readonly="isDisabled"/>
				<van-field v-model="form.area" label="开户地区" placeholder="开户地区" :readonly="isDisabled"/>
				<van-field :value="form.subBankName" label="开户支行" placeholder="开户支行" :readonly="isDisabled"/>
				<van-field v-model="form.bankNum" label="银行卡号" placeholder="银行卡号" :readonly="isDisabled"/>
			
				<div class="card_bind_item c-fff" >银行卡卡主姓名必须和实名认证姓名一致，否则无法正常提现返款</div>
			
				<div class="card_bind_item c-fff">
		            <p class="card_bind_item_word">对不起! 您的账户已绑定银行卡，如需更改银行卡信息，请联系客服处理！</p>
		            <a class="concat" @click="concatCus">联系平台客服</a>
		        </div>
			</van-cell-group>	
		</div>	
	</div>	
</template>

<script>
	export default {
		name: 'realNameAuthentica',
		data() {
			return {
				isDisabled: true,
				form: {
					phone:"18598271045",
					reallyName: "张三疯",
					bankName: "中国银行",
					area:"广东省、深圳市",
					subBankName:"中国银行股份有限公司南山支行",
					bankNum: "6216895634653562623"
				}
			}
		},
		methods: {
			//联系客服
	        concatCus(){
	        	this.$wxToast("如有疑问，请及时联系淘大熊客服（晴天或者熊大）")
	        },
		}
	}	
</script>

<style scoped lang="scss">
	.page-index {
		font-size: 13px;
		.content {
			padding: 0 10px;
			.cell-group{
				/deep/ .van-cell{
					font-size: 13px;
				}
				/deep/ .van-field__input{
					color: #999;
				}
				.card_bind_item{
					position: relative;
					background:#fd3c3c;
					font-size: 12px;
					margin: 10px 0;
					padding: 10px 5px;
					line-height: 20px;
					.concat{
						position: absolute;
						right: 10px;
						bottom: 10px;
						color: #006FD9;
					}
				}
			}
		}	
	}
</style>