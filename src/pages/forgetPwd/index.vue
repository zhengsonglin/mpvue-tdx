<template>
	<div class="page-register h100 bg-fff">
		<!--<div class="header c-fff text-c">
			<p>找回密码</p>
		</div>-->
		<div class="content">
			<div class="register-form">
				<div class="login-input text-input">
					<input type="text" id="txt_UserName" class="input-height" v-model.trim="form.username" placeholder="请输入账号">
				</div>
				<div class="login-input pass-input">
					<input type="text" id="txt_Yzm" class="input-height" v-model.trim="form.yzm" placeholder="请输入验证码" maxlength="6">
					<div class="reg-get-code">
						<van-button type="warning" @click="sendCode" size="mini" :disabled="validCode.isDisabled">{{validCode.btnText}}</van-button>
					</div>
				</div>
				<div class="login-input pass-input">
					<input type="password" id="txt_PassWord" class="input-height" v-model.trim="form.pwd" placeholder="请输入新密码">
				</div>
				<div class="login-input pass-input">
					<input type="password" id="txt_RePassWord" class="input-height" v-model.trim="form.repwd" placeholder="请确认密码">
				</div>
				<div class="btn-grop c-fff text-c" >
					<van-button type="primary" color="#EE580F" size="small" block @click="handleRegister" :loading="loginBtn.isLoading" :loading-text="loginBtn.loadingText">提交密码</van-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {checkMobilePhone} from '@/assets/js/util.js'
	export default {
		name: 'forgetPwd',
		data(){
			return {
				form:{
					username:"18598271043",
					pwd:"123456",
					repwd:"123456",
					yzm:"123456",
				},
				hasCommit:false,
				validCode:{
					btnText:"获取验证码",
					isDisabled:false
				},
				loginBtn:{
					isLoading: false,
					loadingText: "提交中..."
				}
			}
		},
		methods:{
			handleRegister(){
				if(!this.hasCommit){
					let {username, pwd, repwd, yzm} = this.form
					if(!checkMobilePhone(username)){
						this.$toast('请输入正确手机号');
					}else if(yzm==""){
						this.$toast('验证码不能为空');
					}else if(pwd.length<6){
						this.$toast('密码长度必须是六位以上');
					}else if(pwd != repwd){
						this.$toast('两次密码输入不相同');
					}else{
						let copyForm = Object.assign({}, this.form);
						delete copyForm.repwd
						this.hasCommit = true
						this.loginBtn.isLoading = true
						
						setTimeout(()=>{
							this.loginBtn.isLoading = false
		                    this.$toast("设置成功！");
		                    wx.navigateBack()
						},2000)
						/*
						this.API.editPwd(copyForm).then((data)=>{
							if (data.ErrorCode == 100) {
								this.loginBtn.isLoading = false
		                        this.$toast("设置成功！");
		                        //this.$router.push("login")
		                        wx.navigateBack()
		                    } else {
		                    	this.hasCommit = false
		                        this.$toast.fail(data.Content)
		                    }

						})
						*/
					}
				}
				
			},
			onClickLeft(){
				this.$router.push("login")
			},
			sendCode(){
				if(!checkMobilePhone(this.form.username)){
					this.$toast('请输入正确手机号');
				}else{
					this.validCode.isDisabled = true
					/*this.API.getBackPwd({ phone: this.form.username}).then((data)=>{
						if (data.ErrorCode == 100) {
	                        this.resetBtn()
	                    } 
					})*/
					this.resetBtn()
					this.$toast('马上发送验证码');
				}
			},
			resetBtn(){
				let nums = 60, timer;

				this.validCode.btnText = nums + "秒后重新获取";
				timer = setInterval(()=>{
					nums--;
					if (nums > 0) {
		                this.validCode.btnText = nums + "秒后重新获取";
		            } else {
		                clearInterval(timer); //清除js定时器
		                this.validCode.isDisabled = false;
		                this.validCode.btnText = '获取验证码';
		            }
					
				},1000)
			}
		},
		created(){
			//this.$toast('提示文案');
		}
	}
</script>

<style scoped lang="scss">
	input.input-height{
		height: 40px;
		line-height: 20px;
		border-radius: 3px;
		outline: 0;
		background-color: #fff;
		-webkit-appearance: none;
	}
	.page-register {
		.header {
			background: #EE580F;
			height: 45px;
			line-height: 45px;
			font-size: 17px;
		}
		.content {
			.register-form {
				padding: 50px 0;
				.login-input {
					width: 80%;
					margin: 0 auto 20px;
					position:relative;
					input{
						width: 100%;
					    display: block;
					    margin: auto;
					    border: 1px solid #ccc;
					    padding-left: 10px;
					}
					.reg-get-code{
						position: absolute;
						right: 6px;
						top: 10px;
						color: #EE580F;
					}
				}
				.btn-grop{
					width: 80%;
					margin: 0 auto;
				}
			}
		}
	}
</style>