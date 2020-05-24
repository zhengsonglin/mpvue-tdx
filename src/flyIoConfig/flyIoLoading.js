
let needLoadingRequestCount = 0;

export function showFullScreenLoading() {
	return new Promise((resolve, reject)=>{
		if (needLoadingRequestCount === 0) {
			wx.showLoading({
			    title: "加载中",
			    mask: true
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
				wx.hideLoading();
			}
			resolve()
		}
	})
}
