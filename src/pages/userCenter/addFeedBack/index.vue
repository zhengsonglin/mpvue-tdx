<template>
	<div class="page-index bg-fff vh100 over-auto addFeedBack">
		<div class="content">
			<div class="form-group">
				<div class="cell-row">
					<div class="title">标题:</div>
					<div class="cell-input">
				  		<input type="text" class="field-input title-input w100" v-model.trim="form.title" placeholder="请输入反馈标题" :readonly="isDetail"/>
				  	</div>
				</div>
				
				<div class="cell-row">
					<div class="title">内容:</div>
					<div class="cell-input">
				  		<textarea v-model.trim="form.content" rows="5"  class="field-input content-input w100" placeholder="请输入反馈内容"
				  			:readonly="isDetail"></textarea>
				  	</div>
				</div>	
				
				<div class="cell-row" v-if="isDetail">
					<div class="title">提交时间:</div>
					<div class="cell-input">
				  		<input type="text" class="field-input title-input w100" :value="form.FTime"  readonly/>
				  	</div>
				</div>	
			</div>
			
			<div class="btn-group" v-if="!isDetail">	
				<van-button block class="vbtn" size="small" color="linear-gradient(to right, #4bb0ff, #6149f6)" @click="submit" >提交</van-button>
			</div>
		</div>
	</div>	
</template>

<script>
	import utils from "@/assets/js/util"
	export default {
		name: 'addFeedBack',
		data(){
			return {
				form:{},
				title:"添加意见",
				FID:"",
				isDetail:false,
			}
		},
		
		created(){
			/*let {FID} = this.$route.query;
			this.FID = FID;
			this.isDetail = utils.isNotEmpty(FID);*/
		},
		methods:{
			submit(){
				let {title, content} = this.form;
				if(utils.isNotEmptyAll(title, content)){
					
				}else{
					this.$toast("标题与内容不能为空！")
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.page-index {	
		.content {
			padding: 20px 0;
			.form-group{
				padding: 0 20px;
				.cell-row{
					display: flex;
					margin: 30px 0 0;
					.title{
						width: 50px;
						flex-basis: 50px;
						font-size: 18px;
						line-height: 38px;
					}
					.cell-input{
						flex: 1;
						.field-input{
							box-sizing:border-box;
							border-radius: 6px;
							text-indent: 8px;
							border: 1px solid #ddd;
							outline: none;
							font-size: 16px;
							&.title-input{
								height: 40px;
								line-height: 40px;
							}
							&.content-input{
								padding: 5px 10px;
    							text-indent: 0;
							}
						}
					}
				}
			}
			
			.btn-group{
				margin: 50px 15px 0;
				.vbtn{
					/deep/ .van-button{
						height: 44px;
						border-radius: 12px;
					}
				}
			}
		}
	}		
</style>