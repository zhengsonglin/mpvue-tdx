import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
//import storage from 'good-storage';

export default new Vuex.Store({
	state: {
		statusBarHeight: null,	//系统状态栏高度
		capsule: {},	//胶囊按钮属性
		customBarHeight: null,	//自定义导航栏高度
		winWidth: wx.getSystemInfoSync().windowWidth,	//小程序窗口宽度
		winHeight: wx.getSystemInfoSync().windowHeight,	//小程序窗口高度
		userLoginInfo: {
			"avatar":"",
			"is_ab":"",
			"prove_group":"A",
			"account":"18598271043",
			"mobile":"18598271043",
			"invite_code":"14983716",
			"platform":"2c",
			"status":1
		},//storage.get("userLoginInfo", {}),
		advertisingList: [{
				id: "1",
				text: "全国商品免费包邮领取"
			},
			{
				id: "2",
				text: "【紧急通知】禁止吸粉"
			},
			{
				id: "3",
				text: "淘大熊商家操作教程"
			},
			{
				id: "4",
				text: "平台内测，实名认证"
			},
			{
				id: "5",
				text: "实名认证联系客服审核"
			},
			{
				id: "6",
				text: "【必读】放单节奏问题"
			},
		],
	},
	getters: {
		customBarContentHeight(state){
			console.log(state.customBarHeight , state.statusBarHeight)
			return state.customBarHeight - state.statusBarHeight
		}
	},
	mutations: {
		setUserLoginInfo(state, userLoginInfo) {
			storage.set("userLoginInfo", userLoginInfo)
			//storage.set("tdx-Login", userLoginInfo);
			state.userLoginInfo = userLoginInfo
		},
		setStatusBarHeight(state, statusBarHeight) {
			state.statusBarHeight = statusBarHeight
		},
		setCapsule(state, capsule){
			state.capsule = capsule
		},
		setCustomBarHeight(state, customBarHeight){
			state.customBarHeight = customBarHeight 
		}
	},
	actions: {
		setSystemInfo({commit}){
			 // 获取系统状态栏信息
			wx.getSystemInfo({
			    success: e => {
			        commit('setStatusBarHeight', e.statusBarHeight)	//系统状态栏高度, 属性单位px
			        
			        let capsule = wx.getMenuButtonBoundingClientRect(); //胶囊按钮属性, 属性单位px
			        let customBarHeight = null;
			        //console.log(capsule, e.statusBarHeight)
			        if (capsule) {
			            commit('setCapsule', capsule)
			            customBarHeight = capsule.bottom + capsule.top - e.statusBarHeight+2;
			        } else {
			            customBarHeight = e.statusBarHeight + 50;
			        }
			        commit('setCustomBarHeight', customBarHeight)
			    }
			})
			
		}
	},
	modules: {}
})