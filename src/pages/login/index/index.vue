<template>
	<div class="page-login vh100 bg-fff">
		<!--<div class="header c-fff text-c">
			<p>登录</p>
		</div>-->
		<div class="content">
			<div class="login-pic text-c">
				<img src="../../../assets/img/logo.png" />
			</div>
			<div class="login-form">
				<div class="login-input text-input">
					<input type="text" id="txt_UserName" class="input" v-model="form.txt_UserName" placeholder="请输入账号">
				</div>
				<div class="login-input pass-input">
					<input type="password" id="txt_PassWord" class="input" v-model="form.txt_PassWord" placeholder="请输入密码">
				</div>
				<div class="other">
					<span class="register fl" @click="toRegister">注册</span>
					<span class="forget fr" @click="forgetPass">忘记密码</span>
				</div>
				<div class="btn-grop c-fff text-c" @click="handleLogin">
					<span class="btn">登录</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { checkMobilePhone } from '@/assets/js/util.js'
	
	export default {
		name: 'login',
		data() {
			return {
				form: {
					txt_UserName: "18598271043",
					txt_PassWord: "zsl123456"
				},
				hasCommit: false,
			}
		},
		methods: {
			handleLogin() {
				let {
					txt_UserName,
					txt_PassWord
				} = this.form
				if(!checkMobilePhone(txt_UserName)) {
					this.$wxToast('请输入正确手机号');
				} else if(txt_PassWord == "") {
					this.$wxToast('请输入密码');
				} else {
					this.hasCommit = true
					/*this.API.login(this.form).then((data) => {
						if(data.ErrorCode == 100) {
							this.loginSuccess(data)
						} else {
							this.hasCommit = false
							this.$wxToast.fail(data.Content)
						}
					})*/
					//wx.reLaunch({ url: "/pages/home/index/main"})
					wx.reLaunch({ url: "/pages/home/index/main"})
				}
			},
			loginSuccess(data) {
				let type = "0"
				if(type != "0") {
					this.API.checkKDJ({
						shopid: type
					}).then((data) => {
						if(data.ErrorCode == 100) {
							//location.href = "http://www.taodaxiong.cn/Mobile/ProductDetail?ShopId=0"
							//this.$router.push("home")
						} else {
							this.$router.push("home")
						}
					})

				} else {
					this.$router.push("home")
				}

				console.log(data)
			},
			toRegister() {
				//this.$router.push({ path: "/pages/login/register/main"})
				wx.navigateTo({ url: "/pages/login/register/main"})
			},
			forgetPass() {
				//this.$router.push("forgetPwd")
				wx.navigateTo({ url: "/pages/login/forgetPwd/main"})
			}
		}
	}
</script>

<style scoped lang="scss">
	input[type=text],
	input[type=password] {
		height: 44px;
		line-height: 22px;
		border-radius: 8px;
		outline: 0;
		background-color: #fff;
		-webkit-appearance: none;
		font-size: 15px;
	}
	.page-login {
		.header {
			background: #EE580F;
			height: 45px;
			line-height: 45px;
			font-size: 17px;
		}
		.content {
			.login-pic {
				img {
					margin: 60px auto 40px;
					width: 56%;
					height: 75px;
				}
			}
			.login-form {
				.login-input {
					width: 80%;
					margin: 0 auto 20px;
					.input {
						display: block;
						margin: auto;
						border: 1px solid #ccc;
						padding-left: 10px;
					}
				}
				.other {
					width: 80%;
					margin: 0 auto 20px;
					overflow: auto;
					font-size: 15px;
					.register {}
					.forget {}
				}
				.btn-grop {
					width: 80%;
					margin: 0 auto;
					background: #EE580F;
					height: 44px;
					line-height: 44px;
					border-radius: 6px;
				}
			}
		}
	}
</style>