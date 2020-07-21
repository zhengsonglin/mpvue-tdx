<template>
	<div class="page-recommend bg-fff vh100">
		<div class="content">
			<div class="title">1、复制链接分享给好友或朋友圈</div>
			<div class="link">http://www.taodaxiong.cn/Mobile/MobileRegister?code=30234671</div>
			<div class="title">2、长按二维码保存到手机分享给好友或朋友圈</div>
			<div class="rec_fri_img text-c">
				<img src="../../../assets/img/recommend-qrcode1.png"/>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'recommend',
		data(){
			return {
				
			}
		},
		methods:{
			onClickLeft(){
				wx.navigateBack()
			}
		}
	}	
</script>


<style scoped lang="scss">
	.page-recommend {
		.content {
			padding: 10px 0;
			overflow: auto;
			.title{
				font-size: 16px;
				font-weight: bold;
				margin: 10px;
			}
			.link{
				margin: 20px 20px;
				font-size: 14px;
			}
			.rec_fri_img{
				padding: 30px 0;
				img{
					width: 160px;
					height: 160px;
				}
			}
		}
	}	
</style>