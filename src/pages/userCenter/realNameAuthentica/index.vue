<template>
	<div class="page-index bg-fff vh100 over-auto realNameAuthentica">
		<div class="content" v-show="userRealInfo.real_name">

			<van-cell-group class="cell-group">
				<van-field :value="form.reallyName" label="真实姓名" placeholder="真实姓名" :readonly="isDisabled"/>
				
				<div class="cus-field">
					<span>性别</span>
					<van-radio-group value="1" bind:change="onChange">
					  <van-radio name="1">单选框 1</van-radio>
					  <van-radio name="2">单选框 2</van-radio>
					</van-radio-group>
				</div>
				

				<van-field :value="form.txt_age" type="digit" label="年龄" placeholder="年龄" :readonly="isDisabled"/>
				<van-field :value="form.wangwang " label="淘宝会员名" placeholder="淘宝会员名" :readonly="isDisabled" />
				<p class="tb-tips">绑定平台做任务的旺旺号</p>

				<van-field name="uploader" label="支付宝截图" v-if="!isDisabled">
					<!--<template #input>
						<van-uploader v-model="fileList" :max-count="1" />
					</template>-->
					<van-uploader :file-list="fileList"  /><!--bind:after-read="afterRead"-->
				</van-field>
			</van-cell-group>

			<div style="margin: 16px;" v-if="!isDisabled">
				<van-button block type="info" size="small" @click="submit">提交认证申请</van-button>
			</div>
			<div class="real_name_example" v-if="!isDisabled">
				打开手机支付宝登录支付宝 → 点击“我的” → 点击“昵称” → 截图（需要显示真实姓名和旺旺账号）
			</div>
			
			<div class="imgShow">
				<img :src="form.picture" mode="widthFix" style="width:100%"/>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'realNameAuthentica',
		data() {
			return {
				userRealInfo: {
					"is_submit": false,
					"real_name": "郑松林 ",
					"ww_name": "zold811691503",
					"gender": "男",
					"age": 27,
					"prove_img": "https://taodaxiong-1259123353.cos.ap-shanghai.myqcloud.com/Documents/f7051976-5fce-4f40-a664-53b50631ad96.jpg"
				},
				form: {},
				fileList: [],	//要上传的图片列表,(还未提交到后台)
				isDisabled : true,
				showEdit:false
			}
		},
		methods: {
			onClickLeft() {
				this.$router.back();
			},
			getLoginUserInfo() {
				this.API.getLoginUserInfo().then(({data, error}) => {
					this.userRealInfo = data
					let picture = ""
					//data.FISRealName = 2
					//data.CheckCode = "B"
					if(data.FISRealName == 1){
						this.showEdit = true
						picture = data.FCaptureAddress
					}else if(data.FISRealName == 2){
						this.isDisabled = false
						//设置审核客服微信二维码， 也可以使用本地对应的tt和qt二维码
						if (data.CheckCode == "A") {
							picture = "http://www.taodaxiong.cn/Content/Mobile/img/tt.jpg"		
						}else if(data.CheckCode == "B"){
							picture = "http://www.taodaxiong.cn/Content/Mobile/img/qt.jpg"
						}
					}
					this.form = {
						fid:data.FID,
						reallyName: data.real_name,
						sex: data.gender=="男"?0:1,
						txt_age: data.age,
						wangwang: data.ww_name,
						picture: data.prove_img
					}
				})
			},
			CheckAge(num) {
	            var myreg = /^[1-9]+[0-9]*]*$/;
	            console.log(typeof num)
	            if (!myreg.test(num)) {
	                return false;
	            } else {
	                return true;
	            }
	        },
	        forceEdit(){
	        	if(this.isDisabled){
	        		this.$dialog.confirm({
					  title: '编辑',
					  message: '你确定要强制编辑吗?',
					}).then(() => {
					    this.isDisabled = false
					}).catch(() => {});
	        	}else{
	        		this.isDisabled = true
	        	}
	        },
			submit() {
				let {reallyName, sex, txt_age, wangwang, picture} = this.form
				if(reallyName ==""){
					this.$wxToast("真实姓名不能为空")
				}else if(txt_age == ""){
					this.$wxToast("请输入年龄")
				}else if(!this.CheckAge(txt_age) ){
					this.$wxToast("请输入正确的年龄")
				}else if(wangwang == ""){
					this.$wxToast("请输入淘宝账号")
				}else if(this.fileList.length ==0){
					this.$wxToast("请上传支付宝截图")
				}else{
					
					this.form.File1 = this.fileList.slice(0,1).file
					
					this.API.updateUserAuthentica(this.form).then((data)=>{
						console.log(data)
						if (data.ErrorCode == 100) {
					
							this.getLoginUserInfo()
						}else if (data.ErrorCode == 101) {
		                    this.$wxToast({
							  	//forbidClick: true,
							  	type: "fail",
							  	message: data.Content
							});
		                } else {
		                    //location.href = "/Mobile/MobileLogin";
		                    this.$router.push("login")
		                }

					})
				}
				
			},
		},
		created() {
			//this.getLoginUserInfo()
			this.form = {
				fid:this.userRealInfo.FID,
				reallyName: this.userRealInfo.real_name,
				sex: this.userRealInfo.gender=="男"?0:1,
				txt_age: this.userRealInfo.age,
				wangwang: this.userRealInfo.ww_name,
				picture: this.userRealInfo.prove_img
			}
		}
	}
</script>

<style scoped lang="scss">
	.page-index {
		.content {
			padding: 0 10px;
			.cell-group {
				/deep/ .van-cell{
					font-size: 13px;
				}
				.cus-field{
					height: 20px;
					line-height: 20px;
					padding: 15px 10px 15px 18px;
					border-bottom: 1px solid #f1f1f1;
					/deep/ ._span{
						width: 106px;
						vertical-align: middle;
						display: inline-block;
					}
					/deep/ ._van-radio-group{
						vertical-align: middle;
						display: inline-block;
						._van-radio{
							display: inline-block;
							&:first-child{
								margin-right: 40px;
							}
						}
					}
				}
				.tb-tips {
					color: #fd3c3c;
					margin: 6px 90px 0;
				}
			}
			.real_name_example {
				padding: 10px;
				color: #fd3c3c;
			}
			.imgShow{
				border: 1px solid #ddd;
				margin: 20px 10px;
			}
		}
	}
</style>