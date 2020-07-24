<template>
	<div class="page-register vh100 bg-fff">
		<!--<div class="header c-fff text-c">
			<p>注册</p>
		</div>-->
		<div class="content">
			<div class="register-form">
				<div class="login-input text-input">
					<input type="text" id="txt_UserName" class="input-height input" v-model.trim="form.username" placeholder="请输入账号">
				</div>
				<div class="login-input pass-input">
					<input type="digit" id="txt_Yzm" class="input-height input" v-model.trim="form.yzm" placeholder="请输入验证码" maxlength="6">
					<div class="reg-get-code">
						<van-button type="warning" @click="sendCode" size="mini" :disabled="validCode.isDisabled">{{validCode.btnText}}</van-button>
					</div>
				</div>
				<div class="login-input pass-input">
					<input type="password" id="txt_PassWord" class="input-height input" v-model.trim="form.pwd" placeholder="请输入密码">
				</div>
				<div class="login-input pass-input">
					<input type="password" id="txt_RePassWord" class="input-height input" v-model.trim="form.repwd" placeholder="再次输入登录密码">
				</div>
				<div class="login-input text-input">
					<input type="text" id="txt_Code" class="input-height input" v-model.trim="form.code" placeholder="请输入邀请码（比填）" maxlength="8">
				</div>
				<div class="other">
					<span class="register fl" @click="toLogin">已有账号</span>
					<!--<span class="forget fr" @click="forgetPass">忘记密码</span>-->
				</div>
				<div class="btn-grop c-fff text-c" >
					<van-button type="primary" class="vbtn" color="#EE580F" size="small" block @click="handleRegister" :loading="loginBtn.isLoading" :loading-text="loginBtn.loadingText">注册</van-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {checkMobilePhone} from '@/assets/js/util.js'
	export default {
		name: 'register',
		data(){
			return {
				form:{
					username:"18598271043",
					pwd:"",
					repwd:"",
					yzm:"",
					code:""
				},
				hasCommit:false,
				validCode:{
					btnText:"获取验证码",
					isDisabled:false
				},
				loginBtn:{
					isLoading: false,
					loadingText: "注册中..."
				}
			}
		},
		methods:{
			handleRegister(){
				if(!this.hasCommit){
					let {username, pwd, repwd, yzm, code} = this.form
					if(!checkMobilePhone(username)){
						this.$wxToast('请输入正确手机号');
					}else if(yzm==""){
						this.$wxToast('验证码不能为空');
					}else if(pwd.length<6){
						this.$wxToast('密码长度必须是六位以上');
					}else if(pwd != repwd){
						this.$wxToast('两次密码输入不相同');
					}else if(code==""){
						this.$wxToast('邀请码不能为空');
					}else{
						let copyForm = Object.assign({}, this.form);
						delete copyForm.repwd
						this.hasCommit = true
						this.loginBtn.isLoading = true
						setTimeout(()=>{
							this.loginBtn.isLoading = false
		                    this.$wxToast("注册成功！");
		                    wx.navigateBack()
						},2000)
						/*
						this.API.register(copyForm).then((data)=>{
							if (data.ErrorCode == 100) {
								this.loginBtn.isLoading = false
		                        this.$wxToast("注册成功！");
		                        this.$router.push("login")
		                    } else {
		                        this.$wxToast.fail(data.Content)
		                    }

						})
						*/
					}
				}

			},
			toLogin(){
				//this.$router.push("login")
				wx.navigateBack()
			},
			sendCode(){
				if(!checkMobilePhone(this.form.username)){
					this.$wxToast('请输入正确手机号');
				}else{
					this.validCode.isDisabled = true
					/*this.API.sendCode({ phone: this.form.username, txt: "用户注册", type: 1 }).then((data)=>{
						if (data.ErrorCode == 100) {
	                        this.resetBtn()
	                    } 
					})*/
					this.resetBtn()
					this.$wxToast('马上发送验证码');
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
			//this.$wxToast('提示文案');
		}
	}
</script>

<style scoped lang="scss">
	input[type=text],
	input[type=password],
	input[type=digit] {
		height: 44px;
		line-height: 22px;
		border-radius: 8px;
		outline: 0;
		background-color: #fff;
		-webkit-appearance: none;
		font-size: 15px;
	}
	.page-register {
		font-size: 12px;
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
					.input{
						width: 100%;
					    display: block;
					    margin: auto;
					    border: 1px solid #ccc;
					    padding-left: 10px;
					}
					.reg-get-code{
						position: absolute;
						right: 4px;
						top: 10px;
						color: #EE580F;
						/deep/ .van-button{
							padding: 0 5px;
						}
					}
				}
				.other{
					width: 80%;
					margin: 0 auto 20px;
					overflow: auto;
					font-size: 15px;
					.register{}
					.forget{}
				}
				.btn-grop{
					width: 80%;
					margin: 0 auto;
					.vbtn{
						/deep/ .van-button{
							height: 44px;
							border-radius: 6px;
						}
					}
				}
			}
		}
	}
</style>