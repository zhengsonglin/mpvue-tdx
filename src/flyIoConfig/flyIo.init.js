import Fly from 'flyio/dist/npm/wx'
const fly = new Fly()
import qs from 'qs'
import { showFullScreenLoading, tryHideFullScreenLoading } from './flyIoLoading'

const host = process.env.NODE_ENV === "development" ? "http://www.taodaxiong.cn/api/" : "http://www.taodaxiong.cn/"
fly.config.baseURL = host
fly.config.headers = {
	"X-Tag": "flyio",
	'content-type': 'application/json',
	//'Authorization': '',
	//'sign': ""
} //设置你的请求头

const defaultConfig = {
	showLoading:true
}

function handleLoading(showLoading) {
	return new Promise((resolve, reject) => {
		if(showLoading) {
			showFullScreenLoading().then(resolve)
		} else {
			tryHideFullScreenLoading().then(resolve)
		}
	})
}

// 添加请求拦截器
fly.interceptors.request.use((request) => {
	console.log("request.use", request)

	return request;
});

// 添加响应拦截器
fly.interceptors.response.use(
	(response) => {
		console.log("response.use", response);
		handleLoading(false).then(() => {
			if(response.status == 200) {
				if(response.data.code && response.data.code != "100") {
					wx.showToast({
						title: response.data.Content,
						icon: 'none',
						duration: 1500
					})
				}
			} else {
				wx.showToast({
					title: response.data.Content,
					icon: 'none',
					duration: 1500
				})
			}
		})
		return response; // 请求成功之后将返回值返回
	}, (err) => { // 请求出错，根据返回状态码判断出错原因

		console.log(err);
		handleLoading(false)
		if(err) {
			return Promise.reject(error.response || "请求失败");
		};
	}
);

export default {
	get: (url, data = {}, config = {}) => {
		let mergeConfig = { ...defaultConfig,
			...config
		};
		handleLoading(mergeConfig.showLoading);

		return new Promise((resolve, reject) => {
			fly.get(url, {
				params: data,
				...mergeConfig
			}).then(res => {
				resolve(res)
			}).catch(err => {
				//console.log(err);
				reject(err)
			})
		})
	},
	post: (url, data = {}, config = {}) => {
		let mergeConfig = { ...defaultConfig,
			...config
		};
		handleLoading(mergeConfig.showLoading);

		return new Promise((resolve, reject) => {
			fly.post(url, data, { ...mergeConfig
			}).then(res => {
				resolve(res)
			}).catch(err => {
				reject(err)
			})
		})
	},
	delete: (url, data = {}, config = {}) => {
		let mergeConfig = { ...defaultConfig,
			...config
		};
		handleLoading(mergeConfig.showLoading);

		return new Promise((resolve, reject) => {
			fly.delete(url, {
				data
			}, { ...mergeConfig
			}).then(res => {
				resolve(res)
			}).catch(err => {
				reject(err)
			})
		})
	},
	/*delete: (url, data={}, config={}) => {
		let mergeConfig = {...defaultConfig, ...config};
		handleLoading(mergeConfig.showLoading);

		return $.delete(url, {data})
	},*/
	postByQS: (url, data = {}, config = {}) => {
		config.headers = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
		}
		let mergeConfig = { ...defaultConfig,
			...config
		};
		handleLoading(mergeConfig.showLoading);
		return new Promise((resolve, reject) => {
			fly.post(url, qs.stringify(data), { ...mergeConfig }).then(res => {
				console.log(2, res)
				resolve(res)
			}).catch(err => {
				console.log(3, err)
				reject(err)
			})
			
		})
	},
	postUpload: (url, data = {}, config = {}) => {
		config.headers = {
			'Content-Type': 'multipart/form-data'
		}
		let mergeConfig = { ...defaultConfig,
			...config
		};
		handleLoading(mergeConfig.showLoading);

		let param = new FormData() // 创建form对象
		Object.keys(data).forEach((key) => {
			param.append(key, data[key])
		})
		//param.append('file', data.file)  // 通过append向form对象添加数据
		//param.append('age', '18') // 添加form表单中其他数据

		return new Promise((resolve, reject) => {
			fly.post(url, param, { ...mergeConfig
			}).then(res => {
				resolve(res)
			}).catch(err => {
				reject(err)
			})
		})
	}
}