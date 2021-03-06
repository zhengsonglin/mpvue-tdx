function formatNumber(n) {
	const str = n.toString()
	return str[1] ? str : `0${str}`
}

export function formatTime(date) {
	const year = date.getFullYear()
	const month = date.getMonth() + 1
	const day = date.getDate()

	const hour = date.getHours()
	const minute = date.getMinutes()
	const second = date.getSeconds()

	const t1 = [year, month, day].map(formatNumber).join('/')
	const t2 = [hour, minute, second].map(formatNumber).join(':')

	return `${t1} ${t2}`
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min)
}

export function shuffle(arr) {
	let _arr = arr.slice()
	for(let i = 0; i < _arr.length; i++) {
		let j = getRandomInt(0, i)
		let t = _arr[i]
		_arr[i] = _arr[j]
		_arr[j] = t
	}
	return _arr
}

//延迟执行function
export function debounce(func, delay) {
	let timer

	return function(...args) {
		if(timer) {
			clearTimeout(timer)
		}
		timer = setTimeout(() => {
			func.apply(this, args)
		}, delay)
	}
}

export function getRandomFromArray(arr, len, isRepeat) { // 数组，长度， 是否可重复
	let shuffled = [...arr].slice(0),
		l = shuffled.length,
		result = []

	for(let n = 0; n < len; n++) {

		if(isRepeat) { //可重复
			let r = Math.floor(Math.random(l) * 10)
			result.push(shuffled[r])
		} else {
			let r = Math.max(0, Math.floor(Math.random() * shuffled.length) - 1)
			result.push(shuffled.splice(r, 1)[0])
		}
	}

	return result
}

//手机验证正则表达式
export function checkMobilePhone(phone) {
	var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
	if(!myreg.test(phone)) {
		return false;
	} else {
		return true;
	}
}

//判断为空（去掉前后空格）
export function isEmpty(val) {
	if(val == null || val == undefined || (val + "").replace(/(^\s*)|(\s*$)/g, "").length == 0) {
		return true
	}
	return false
}

//判断不为空
export function isNotEmpty(val) {
	return !this.isEmpty(val)
}

// 判断多个全部非空(多个, 用，隔开) 
export function isNotEmptyAll(...params) {
	var flag = true;
	for(var k in params) {
		flag = flag && this.isNotEmpty(params[k]);
	}
	return flag;
}

//判断多个全部为空
export function isEmptyAll(...params) {
	var flag = true;
	for(var k in params) {
		flag = flag && this.isEmpty(params[k]);
	}
	return flag;
}

export default {
	formatNumber,
	formatTime,
	shuffle,
	debounce,
	checkMobilePhone,
	getRandomFromArray,
	isEmpty,
	isNotEmpty,
	isNotEmptyAll,
	isEmptyAll
}