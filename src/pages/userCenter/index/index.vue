<template>
	<div class="userCenter">
		<div class="content">
			<div class="user-info">
				<div class="order-num-info c-fff text-c">
					<p><span class="total-num">{{userInfo.AB30Count | parseExcludeZero(999) }}</span></p>
					<p><span class="total-num-desc">免单30天总单量</span></p>
				</div>
				<!--userInfo.FAccountBalance ? userInfo.FAccountBalance:999.98-->
				<div class="btn-grop c-fff text-c">
					<div class="btn-plain inline-block">账户余额：<span>{{userInfo.balance | parseExcludeZero(999.98)}}</span></div>
					<div class="btn-plain inline-block">积分：<span>0</span></div>
					<p class="tips">100积分=1元</p>
				</div>
				<div class="per-bill-img"></div>
			</div>
			<div class="invit-info">
				<div class="con-per-username">用户名：<label id="lbl_UserName">{{userInfo.account | parseExcludeZero(18899996666) }}</label></div>
				<div class="con-per-invide">邀请码：<label id="lbl_InviteCode">{{userLoginInfo.invite_code | parseExcludeZero(888888) }}</label></div>
			</div>

			<div class="card-info bg-fff">
				<div class="row-1">
					<span :class="['free_activity', {'color_red':orderType==0}]" @click="orderType=0">限量免单任务</span>
					<span :class="['second_activity', {'color_red':orderType==1}]" @click="orderType=1">熊抢购任务</span>
				</div>
				<div class="row-2">
					<van-row>
						<van-col span="6">
							<div class="order-state text-c">
								<p><span class="li-icon iconfont icon-moban c_red f22" style="color:#d17575" /></span>
								</p>
								<p>已申请</p>
								<p v-if="userInfo.order_num">{{orderType==0?userInfo.order_num.free.received_num:userInfo.order_num.xqg.received_num}}</p>
							</div>
						</van-col>
						<van-col span="6" v-if="orderType==0">
							<div class="order-state text-c">
								<p><span class="li-icon iconfont icon-tijiao c_blue f22" style="color:#509de8"></span></p>
								<p>已提交</p>
								<p v-if="userInfo.order_num">{{orderType==0?userInfo.order_num.free.submitted_num:userInfo.order_num.xqg.submitted_num}}</p>
							</div>
						</van-col>
						<van-col span="6">
							<div class="order-state text-c">
								<p><span class="li-icon iconfont icon-shenhe2 c_orange f22" style="color:#ecb071"></span></p>
								<p>待审核</p>
								<p v-if="userInfo.order_num">{{orderType==0?userInfo.order_num.free.pending_review_num:userInfo.order_num.xqg.pending_review_num}}</p>
							</div>
						</van-col>
						<van-col span="6">
							<div class="order-state text-c">
								<p><span class="li-icon iconfont icon-wancheng c_black f22" style="color:#e9769f"></span></p>
								<p>已完成</p>
								<p v-if="userInfo.order_num">{{orderType==0?userInfo.order_num.free.completed_num:userInfo.order_num.xqg.completed_num}}</p>
							</div>
						</van-col>
					</van-row>
				</div>
			</div>

			<div class="my-fans-info">
				<van-row gutter="20">
					<van-col span="12">
						<div class="item bg-fff h100">
							<p>推荐人数</p>
							<p class="red">{{userInfo.InviteCount | parseExcludeZero(998) }}</p>
						</div>
					</van-col>
					<van-col span="12">
						<div class="item bg-fff">
							<p>免单总数</p>
							<p class="red">{{userInfo.ABCount | parseExcludeZero(999) }}</p>
						</div>
					</van-col>
				</van-row>
			</div>

			<div class="other-info over-hidden">
				<van-grid clickable :column-num="3" :border="true">
					<van-grid-item  text="分析给好友" link-type="navigateTo" url="/pages/userCenter/recommendFriend/main">
				  		<span class="mui-icon iconfont icon-fenxiang bg-pink" slot="icon"></span>
				  	</van-grid-item>
					<van-grid-item text="定制金返款" link-type="navigateTo" url="/pages/userCenter/refundRecord/main">
						<span class="mui-icon iconfont icon-baozhengjin1 bg-green" slot="icon"></span>
					</van-grid-item>
					<van-grid-item text="预定任务" link-type="navigateTo" url="/pages/userCenter/reservationRecord/main">
						<span class="mui-icon iconfont icon-yuding bg-blue" slot="icon"></span>
					</van-grid-item>
					<van-grid-item text="实名认证" link-type="navigateTo" url="/pages/userCenter/realNameAuthentica/main">
						<span class="mui-icon iconfont icon-shimingrenzheng bg-red" slot="icon"></span>
					</van-grid-item>
					<van-grid-item text="银行卡绑定" link-type="navigateTo" url="/pages/userCenter/cardBind/main">
						<span class="mui-icon iconfont icon-yinxingqia bg-orange" slot="icon"></span>
					</van-grid-item>
					<van-grid-item text="提现记录" link-type="navigateTo" url="/pages/userCenter/financeCenter/main">
						<span class="mui-icon iconfont icon-tixianfc bg-blue" slot="icon"></span>
					</van-grid-item>
					<van-grid-item text="账户提现" link-type="navigateTo" url="/pages/userCenter/withDrawCash/main">
						<span class="mui-icon iconfont icon-tixian bg-blue" slot="icon"></span>
					</van-grid-item>
					<van-grid-item text="财务中心" link-type="navigateTo" url="/pages/userCenter/financeCenter/main">
						<span class="mui-icon iconfont icon-caiwu bg-yellow" slot="icon"></span>
					</van-grid-item>
					<van-grid-item text="基本资料" link-type="navigateTo" url="/pages/userCenter/baseUserInfo/main">
						<span class="mui-icon iconfont icon-iconfontgerenzhongxin bg-green" slot="icon"></span>
					</van-grid-item>
					<van-grid-item text="新手攻略" link-type="navigateTo" url="/pages/userCenter/newUserStrategy/main">
						<span class="mui-icon iconfont icon-bangzhu bg-purple" slot="icon"></span>
					</van-grid-item>
					<van-grid-item text="投诉与建议" link-type="navigateTo" url="/pages/userCenter/touSu/main">
						<!--<span class="mui-icon van-icon van-icon-manager bg-pink" slot="icon"></span>-->
						<van-icon name="manager" class="mui-icon bg-pink" style="line-height: 70rpx;" slot="icon"/>
					</van-grid-item>
					<van-grid-item text="修改密码" link-type="navigateTo" url="/pages/userCenter/changePwd/main">
						<span class="mui-icon iconfont icon-xiugaimima2 bg-black" slot="icon"></span>
					</van-grid-item>
				</van-grid>
			</div>

			<div class="suggestion-bk bg-fff text-c over-hidden">
				<van-row>
					<van-col span="12">
						<p class="item line" @click="toFeedBack">意见反馈</p>
					</van-col>
					<van-col span="12">
						<p class="item" @click="toUpdateDescription">更新说明</p>
					</van-col>

				</van-row>
			</div>
		</div>
		<div class="login-out over-hidden">
			<van-button type="danger" block @click="logout">退出登录</van-button>
		</div>
	</div>
</template>

<script>
	import store from '../../../store'
	export default {
		name: "userCenter",
		data() {
			return {
				userInfo: {
					"avatar": "",
					"is_family": -1,
					"mobile": "18598271043",
					"account": "18598271043",
					"balance": 181.9,
					"integral": 0,
					"fan_num": 3,
					"verified_status": 3,
					"qq": "8116",
					"amount_raised": 0,
					"order_month_num": 0,
					"order_num": {
						"free": {
							"received_num": 0,
							"submitted_num": 2,
							"pending_review_num": 0,
							"after_sale_num": 0,
							"completed_num": 27
						},
						"xqg": {
							"received_num": 0,
							"submitted_num": 0,
							"pending_review_num": 0,
							"after_sale_num": 0,
							"completed_num": 0
						}
					},
					"un_msg_num": 2
				},
				orderType: 0, //0淘抢购订单，1熊抢购订单
				userLoginInfo: store.state.userLoginInfo
			}
		},

		methods: {
			toFeedBack(){
				wx.navigateTo({ url: "/pages/userCenter/feedBack/main"})
			},
			toUpdateDescription(){
				wx.navigateTo({ url: "/pages/userCenter/updateDescription/main"})
			},
			logout() {
				//this.$cookies.set("user_session","25j_7Sl6xDq2Kc3ym0fmrSSk2xV2XkUkX")   
				//console.log(this.$cookies.get("UserInfo"))
				//console.log(document.cookie)
				//this.$router.push("login")
				//wx.navigateTo({ url: "/pages/login/main"})
				wx.reLaunch({ url: "/pages/login/index/main"})
			}
		},

	}
</script>

<style lang="scss">
	.userCenter {
		font-size: 12px;
		.content {
			.user-info {
				background: linear-gradient(90deg, #eb3c3c, #ff7459);
				min-height: 112px;
				position: relative;
				.order-num-info {
					padding: 20px 0;
					.total-num {
						font-size: 30px;
						margin: 0 auto;
					}
					.total-num-desc {
						font-size: 16px;
					}
				}
				.btn-grop {
					/*padding-bottom: 10px;*/
					position: relative;
					z-index: 10;
					.btn-plain {
						width: 35%;
						border: 1px solid #eee;
						border-radius: 10px;
						background: linear-gradient(90deg, #eb3c3c, #ff7459);
						height: 28px;
						line-height: 28px;
						font-size: 14px;
						margin: 0 6px;
					}
					p.tips {
						position: absolute;
						left: calc(50% + 10px);
						bottom: -22px;
						width: 35%;
					}
				}
				.per-bill-img {
					width: 44px;
					height: 44px;
					border-radius: 50%;
					background-color: #f4f4f4;
					;
					padding: 5px;
					position: absolute;
					left: 50%;
					transform: translateX(-27px);
					bottom: -70px;
					z-index: 10;
				}
				&::after {
					position: absolute;
					left: 0;
					right: 0;
					bottom: -44px;
					z-index: 1;
					content: ' ';
					height: 80px;
					width: 100%;
					border-radius: 0 0 50% 50%;
					background: linear-gradient(90deg, #eb3c3c, #ff7459);
				}
			}
			.invit-info {
				margin-top: 66px;
				padding-left: 24px;
				.con-per-username {
					font-size: 20px;
					color: #80c7c7;
					margin-bottom: 10px;
					font-weight: bolder;
				}
				.con-per-invide {
					font-size: 16px;
					font-weight: bolder;
					color: #fd3c3c;
				}
			}
			.card-info {
				background-clip: padding-box;
				box-shadow: 0 1px 2px rgba(0, 0, 0, .3);
				margin: 20px 10px;
				border-radius: 10px;
				.row-1 {
					font-size: 16px;
					padding: 12px;
					position: relative;
					.free_activity,
					.second_activity {
						margin-right: 10px;
						&.color_red {
							color: #fd3c3c;
							font-weight: 900;
						}
					}
					&::after {
						position: absolute;
						bottom: 0;
						right: 0;
						left: 0;
						height: 1px;
						content: '';
						/*-webkit-transform: scaleY(.5);
					    transform: scaleY(.5);*/
						background-color: #c8c7cc;
					}
				}
				.row-2 {
					.order-state {
						padding: 16px 0;
						font-size: 14px;
					}
				}
			}
			.my-fans-info {
				margin: 20px;
				.item {
					background-clip: padding-box;
					box-shadow: 0 1px 2px rgba(0, 0, 0, .3);
					overflow: auto;
					border-radius: 10px;
					border-bottom: 1px solid #d4d4d4;
					p {
						font-size: 16px;
						text-align: center;
						margin: 10px 0 8px;
						&.red {
							color: #fd3c3c;
						}
					}
				}
			}
			.other-info {
				margin: 20px 10px;
				border-radius: 10px;
				.van-grid-item__content::after {
					border-width: 0 3px 3px 0;/*no*/
				}
				.mui-icon {
					font-size: 20px;
					position: relative;
					height: 32px;
					line-height: 32px;
					width: 32px;
					border-radius: 5px;
					color: #fff;
					font-weight: 900;
					display: inline-block;
					text-align: center;
					margin-bottom: 6px;
				}
				.van-grid-item__content--clickable {
					padding: 22px 0;
				}
				.bg-pink {
					background: linear-gradient(to right, #f0785d, #e35e40);
				}
				.bg-purple {
					background: linear-gradient(to right, #edb2f8, #df93ed);
				}
				.bg-blue {
					background: linear-gradient(to right, #509de8, #006fd9);
				}
				.bg-red {
					background: linear-gradient(to right, #d17575, #a93d3d);
				}
				.bg-orange {
					background: linear-gradient(to right, #ecb071, #fa8103);
				}
				.bg-black {
					background: linear-gradient(to right, #9be8e6, #16ccec);
				}
				.bg-green {
					background: linear-gradient(to right, #a3e4a6, #06c00e);
				}
				.bg-yellow {
					background: linear-gradient(to right, #db916f, #d36331);
				}
			}
			.suggestion-bk {
				margin: 10px;
				border-radius: 10px;
				font-size: 15px;
				padding: 16px 0;
				box-shadow: 0 0.026667rem 0.053333rem rgba(0, 0, 0, 0.3);
				.item {
					height: 32px;
					line-height: 32px;
					position: relative;
					&.line::after {
						content: "";
						height: 100%;
						width: 0;
						border: 1px solid #666;
						position: absolute;
						right: 0;
						top: 0;
						-webkit-transform: scaleX(.5);
					}
				}
			}
		}
		.login-out {
			margin: 24px 10px;
			border-radius: 10px;
		}
	}
</style>