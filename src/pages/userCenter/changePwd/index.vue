<template>
	<div class="page-index bg-fff vh100 over-auto changePwd">
		
		<div class="content">
			<div class="container_title text-c">修改登录密码<i class="iconfont icon-icon-dsj"></i></div>
			<van-cell-group class="form-group">
				<van-field v-model="form.old_pwd" placeholder="请输入原始密码" label="原始密码" />
				<van-field v-model="form.new_pwd" placeholder="请输入新登录密码" label="新登录密码"/>
				<van-field v-model="form.re_pwd" placeholder="请再次确认密码" label="确认密码"/>
			</van-cell-group>
			<div class="btn-group">	
				<van-button block round size="small" class="vbtn" color="linear-gradient(to right, #4bb0ff, #6149f6)" @click="submit" >提交</van-button>
			</div>
		</div>
	</div>	
</template>

<script>
	import utils from '@/assets/js/util.js'

	export default {
		name: 'changePwd',
		data() {
			return {
				form:{
					platform: "2c"
				}
			}
		},
		methods: {
		
			submit(){
				let {old_pwd, new_pwd, re_pwd} = this.form;
				if(utils.isEmpty(old_pwd)){
					this.$wxToast('请输入原始密码');
				}else if(utils.isEmpty(new_pwd)){
					this.$wxToast('请输入新登录密码');
				}else if(utils.isEmpty(re_pwd)){
					this.$wxToast('请确认新登录密码');
				}else if(new_pwd != re_pwd){
					this.$wxToast('两次密码输入不一致');
				}else{
					//console.log(this.form)
					
					this.API.updatePwd(this.form).then(({data, error})=>{
						if (error.errno == 200) {
							this.$wxToast({
	                        	duration: 600, // 持续展示 toast
							  	forbidClick: true,
							  	type: "success",
							  	message: '修改成功！请重新登录',
							  	onClose:()=>{this.$router.push("login")}
							});
							
	                    } else if (error.errno == 101) {
	                    	this.$wxToast({
							  	//forbidClick: true,
							  	type: "fail",
							  	message: error.usermsg
							});
	                    } else {
	                        //this.$router.push("login")
	                        this.$wxToast({
							  	//forbidClick: true,
							  	type: "fail",
							  	message: error.usermsg
							});
	                    }
	
					})
				}
			}
		}
	}
</script>


<style scoped lang="scss">
	.page-index {
		.content {
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
			.form-group{
				margin-top: 20px;
				/deep/ .van-cell__title{
					font-size: 13px;
				}
				/deep/ .van-cell__value{
					font-size: 13px;
				}		
			}
			.btn-group{
				margin: 30px 10px 0;
				.vbtn{
					/deep/ .van-button{
						height: 40px;
					}
				}
			}
		}
	}
</style>