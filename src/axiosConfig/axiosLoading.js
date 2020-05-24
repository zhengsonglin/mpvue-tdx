//import Toast from 'path/to/@vant/weapp/dist/toast/toast';
//import Toast from '../../static/vant/toast/toast';
let Toast = (options)=>{
	if(typeof options == "string"){
		wx.showToast({
			title: options,
			icon: 'none',
			duration: 2000
		})
	}else if(typeof options == "object"){
		return wx.showToast(options)
	}
}
let needLoadingRequestCount = 0,
		toastInstance = null;

export function showFullScreenLoading() {
	return new Promise((resolve, reject)=>{
		if (needLoadingRequestCount === 0) {
			toastInstance = Toast.loading({
			  message: '加载中...',
			  forbidClick: true,
			});
		}
		needLoadingRequestCount++
		resolve()
	})
}

export function tryHideFullScreenLoading() {
	return new Promise((resolve, reject)=>{
		if (needLoadingRequestCount <= 0){
			resolve()	//resolve会终止promise但后面的js代码任然会执行
		}else{
			needLoadingRequestCount--
			if (needLoadingRequestCount === 0) {
				toastInstance.clear();
			}
			resolve()
		}
	})
}
