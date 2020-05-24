<script>
	export default {
		created() {
			// 调用API从本地缓存中获取数据
			/*
			 * 平台 api 差异的处理方式:  api 方法统一挂载到 mpvue 名称空间, 平台判断通过 mpvuePlatform 特征字符串
			 * 微信：mpvue === wx, mpvuePlatform === 'wx'
			 * 头条：mpvue === tt, mpvuePlatform === 'tt'
			 * 百度：mpvue === swan, mpvuePlatform === 'swan'
			 * 支付宝(蚂蚁)：mpvue === my, mpvuePlatform === 'my'
			 */

			let logs
			if(mpvuePlatform === 'my') {
				logs = mpvue.getStorageSync({
					key: 'logs'
				}).data || []
				logs.unshift(Date.now())
				mpvue.setStorageSync({
					key: 'logs',
					data: logs
				})
			} else {
				logs = mpvue.getStorageSync('logs') || []
				logs.unshift(Date.now())
				mpvue.setStorageSync('logs', logs)
			}
		},
		log() {
			console.log(`log at:${Date.now()}`)
		}
	}
</script>

<style>
	/*@import './assets/css/common.css';*/
	.container {
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		padding: 200rpx 0;
		box-sizing: border-box;
	}
	/* this rule will be remove */
	
	* {
		transition: width 2s;
		-moz-transition: width 2s;
		-webkit-transition: width 2s;
		-o-transition: width 2s;
	}
	
	a{
  color: "#7e8c8d";
  -webkit-backface-visibility: hidden;
  text-decoration: none;
}
li{
  list-style: none;
}  

.fl{
	float: left;
}
.fr{
	float: right;
}
.w100{
	width: 100%;
}
.h100{
	height: 100%;
}
.text-l{
	text-align: left;
}
.text-r{
	text-align: right;
}
.text-c{
	text-align: center;
}
.c-fff{
	color: #fff;
}
.f12{
	font-size: 12px;
}
.f14{
	font-size: 14px;
}
.f16{
	font-size: 16px;
}
.f18{
	font-size: 18px;
}
.f20{
	font-size: 20px;
}
.f22{
	font-size: 22px;
}
.bg-fff{
	background: #fff;;
}
.bg-f00{
	background: #f00;
}
.over-auto{
	overflow: auto;
}
.over-hidden{
	overflow: hidden;
}

.bold{
	font-weight: bold;
}

.inline{
	display: inline;
}
.inline-block{
	display: inline-block;
}
.block{
	display: block;
}
.relative{
	position: relative;
}
.absolute{
	position: absolute;
}
.fixed{
	position: fixed;
}

.flex{
	display: flex;
}
.flex-1{
	flex: 1;
	width: 0;
	flex-basis: 0;
}
.border-box{
	box-sizing: border-box;
}

</style>