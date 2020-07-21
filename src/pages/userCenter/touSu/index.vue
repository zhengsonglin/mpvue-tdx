<template>
	<div class="page-index bg-fff vh100 over-auto touSu">
		<div class="content">
			<van-cell-group>
				<van-cell>
					<van-row>
					  <van-col span="6">投诉QQ：</van-col>
					  <van-col span="18"><span class="row-text bold ">3023591435</span></van-col>
					</van-row>
				</van-cell>
				<van-cell>
					<van-row>
					  <van-col span="6">工作时间：</van-col>
					  <van-col span="18"><div class="row-text">工作日：09:00-18:00</br>周六：10:00-18:00  ( 法定节假日除外 )</div></van-col>
					</van-row>
				</van-cell>
				<van-cell>
					<van-row>
					  <van-col span="6">投诉邮箱:</van-col>
					  <van-col span="18"><span class="row-text bold">tousu@taodaxiong.com</span></van-col>
					</van-row>
				</van-cell>
			</van-cell-group>
		</div>
	</div>	
</template>

<script>
	export default {
		name: 'touSu',
		data() {
			return {}
		},
		methods: {
			onClickLeft() {
				this.$router.back();
			},
		}
	}
</script>


<style scoped lang="scss">
	.page-index {
		padding: 0 10px;
		.content {
			padding: 4px 0;
			/deep/ .van-col{
				font-size: 13px;
				text-align: left;
			}
			.row-text{
				font-size: 13px;
			}
		}
	}
</style>