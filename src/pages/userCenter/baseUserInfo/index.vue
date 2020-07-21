<template>
	<div class="page-index bg-fff h100 over-auto baseUserInfo">
		<div class="content">
			<van-cell-group class="cell-group">
				<van-cell title="注册时间" :value="form.registerTime" />
  				<van-cell title="用户名" :value="form.userName" />

				<van-cell title="性别" is-link :value="form.sexName" @click="showSexPicker = true"/>
				<van-popup :show="showSexPicker" position="bottom">
				  	<van-picker show-toolbar :columns="sexColumns" :default-index="setDefaultIndex(sexColumns, form.sexName)" @cancel="showSexPicker = false" @confirm="onSexConfirm" />
				</van-popup>
				
				<van-cell title="年龄" is-link :value="form.age" @click="openDialog('age')"/>
				<van-cell title="QQ号码" is-link :value="form.qq" @click="openDialog('qq')"/>
				<van-cell title="我的邮箱" is-link :value="form.email" @click="openDialog('email')"/>
				
				<van-cell title="婚姻状况" is-link :value="form.marryName" @click="showMarryPicker = true"/>
				<van-popup :show="showMarryPicker" position="bottom">
				  	<van-picker show-toolbar :columns="marryColumns" @cancel="showMarryPicker = false" @confirm="onMarryConfirm" />
				</van-popup>
				
				<van-cell title="教育程度" is-link :value="form.eduStateName" @click="showEduPicker = true"/>
				<van-popup :show="showEduPicker" position="bottom">
				  	<van-picker show-toolbar :columns="eduColumns" :default-index="setDefaultIndex(eduColumns, form.eduStateName)" @cancel="showEduPicker = false" @confirm="onEduConfirm" />
				</van-popup>
				
				<van-cell title="所属人群" is-link :value="form.perTypeName" @click="showPerTypePicker = true"/>
				<van-popup :show="showPerTypePicker" position="bottom">
				  	<van-picker show-toolbar :columns="perTypeColumns" :default-index="setDefaultIndex(perTypeColumns, form.perTypeName)" @cancel="showPerTypePicker = false" @confirm="onPerTypeConfirm" />
				</van-popup>
				
				<van-cell title="所属地区" is-link :value="form.area" @click="showAreaPicker = true"/>
				<van-popup :show="showAreaPicker" position="bottom" >
				    <van-area :area-list="areaList" :value="setAreaDefaultValue(form.area, 2)" :columns-num="2" ref="myArea" title="开户地区" @change="onAreaChange" @confirm="onAreaConfirm" @cancel="showAreaPicker=false"/>
				</van-popup>
			</van-cell-group>
			
			<div class="btn-group">
				<van-button class="vbtn" size="small" block round color="linear-gradient(to right, #4bb0ff, #6149f6)" @click="submit" >提交</van-button>
			</div>
			
			<van-dialog class="van-dialog" :show="dialog.show" use-slot :title="dialog.title" show-cancel-button  @close="onDialogClose" async-close><!--@open="onDialogOpen"-->
				<!--<div class="sub-title text-c">{{dialog.subTitle}}</div>-->
			  	<div class="input-item text-input">
					<input type="text"  v-model="dialog.value" v-if="dialog.vType==0" class="text u-input">
					<input type="number"  v-model="dialog.value"  v-if="dialog.vType==1" class="digit u-input">
					<input type="password"  v-model="dialog.value" v-if="dialog.vType==2" class="pass u-input">
					<!--<van-field v-model="dialog.value" type="text" placeholder="" v-if="dialog.vType==0" class="text"/>
					<van-field v-model="dialog.value" type="digit" placeholder="" v-if="dialog.vType==1" class="digit"/>
					<van-field v-model="dialog.value" type="password" placeholder="" v-if="dialog.vType==2" class="pass"/>-->
				</div>
			</van-dialog>
		</div>
	</div>	
</template>

<script>
	import areaList from '@/assets/js/area.js'
	import utils from '@/assets/js/util.js'

	export default {
		name: 'baseUserInfo',
		data() {
			return {
				areaList,
				userBaseInfo: {},
				form:{},
				dialog:{
					show: false,
					title: "标题",
					subTitle:"",
					value:"",
					vType:"0",		//输入类型, 0:文本， 1：整数, 2:密码
					vTypeName:"",	//如 age, qq, email 等用于confirm后赋值给form
				},
				showSexPicker:false,	//性别picker
				sexColumns:[{text:"男", value:0},{text:"女", value:1}],
				showMarryPicker:false,	//婚姻状况picker
				marryColumns:[{text:"已婚", value:0},{text:"未婚", value:1}],
				showEduPicker: false,  //教育程度picker
				eduColumns: [
					{text:"初中", value:'10806326'},{text:"高中", value:"10806327"},
					{text:"中专", value:'10806328'},{text:"大专", value:"10806329"},
					{text:"本科", value:'10806330'},{text:"研究生", value:"10806331"},
					{text:"博士", value:'10806332'}
				],
				showPerTypePicker: false,	//所属人群picker
				perTypeColumns: [
					{text:"宝妈", value:'10806333'},{text:"全职太太", value:'10806334'},
					{text:"上班", value:'10806336'},{text:"房产", value:'10806337'},
					{text:"事业单位", value:'10806338'},{text:"医疗单位", value:'10806339'},
					{text:"白领", value:'10806340'},{text:"自主经营", value:'10806341'},
				],
				showAreaPicker: false, //所属地区picker
				selectedArea:[],	//已选择的所属地区

			}
		},
		methods: {
			getFilterNameById(arrayList =[], filterId){
				let arr = arrayList.filter(({value})=>value == filterId)
				return arr.length?arr[0].text:""
			},
			getFilterValueByName(arrayList =[], filerName){
				let arr = arrayList.filter(({text})=>text == filerName)
				return arr.length?arr[0].value:""
			},
			//设置picker的默认选项
			setDefaultIndex(Columns =[], value){
				let index = ""
				Columns.forEach(({cValue, text}, num)=>{
					if(value == cValue || value == text){
						index = num;
						return num
					}
				})
				return index
			},
			//设置area默认值
			setAreaDefaultValue(strValue, columnNum){	//columnNum 从1开始，第一列，第二列...
				if(!strValue) return "";
				let arr = strValue.split("、"), filterAreaObj = {}, rKey="";
				
				if(arr.length>=columnNum){
					let text = arr[columnNum-1];
					if(columnNum == 1){
						filterAreaObj = areaList.province_list		//省
					}else if(columnNum == 2){
						filterAreaObj = areaList.city_list		//市
					}else if(columnNum == 3){
						filterAreaObj = areaList.county_list	//区
					}
					
					//return 
					Object.entries(filterAreaObj).some(([key, value], fIndex)=>{
						rKey = key
						return value.includes(text)
					})
					return rKey
				}else{
					return ""
				}
			},
			parseProvince(province){
				let spelProvince = ["北京市", "天津市", "重庆市", "上海市"],
					result = "";
				spelProvince.some((value)=> {
					if(value.includes(province)){
						result = value
					}else{
						result = province+"省"
					}
					return value.includes(province)
				})
				return result
			},
			//查询用户基本个人信息
			getBaseUserInfo(){
				//this.API.getBaseUserInfo().then(({data, error})=>{
				let data = 
						{"create_time":"2020-04-07","avatar":"","account":"18598271043","mobile":"18598271043",
						"age":27,"gender":"男","marriage":"已婚","education":"高中","email":"8116915@qq.com",
						"crowd":"待业","province":"山西","city":"太原","qq":"8116"
						}	
					this.userBaseInfo = data
					let {create_time, account, gender, age, qq, email, FMarryStaus, marriage, education, crowd, province, city} = data
					let params = {
						registerTime:create_time,
						userName: account,
						sexId: this.getFilterValueByName(this.sexColumns, gender),	//FUserSex,
						sexName: gender,	//this.getFilterNameById(this.sexColumns, FUserSex),
						age: age,
						qq: qq,
						email: email,
						marryId: this.getFilterValueByName(this.marryColumns, marriage),	//FMarryStaus,
						marryName: marriage,	//this.getFilterNameById(this.marryColumns, FMarryStaus),
						eduStateId: this.getFilterValueByName(this.eduColumns, education),
						eduStateName: education, 
						perTypeId : this.getFilterValueByName(this.perTypeColumns, crowd),
						perTypeName: crowd,
						area: this.parseProvince(province)+"、"+city+"市",
						province: province,
						city: city
					}
					this.form = Object.assign({}, this.form, params)
				//})
			},
			//性别确认
			onSexConfirm(event){
				const {text, value} = event.mp.detail.value;
				this.form.sexName = text
				this.form.sexId = value
				this.showSexPicker = false
			},
			//婚姻状况确认
			onMarryConfirm(event){
				const {text, value} = event.mp.detail.value;
				this.form.marryName = text
				this.form.marryId = value
				this.showMarryPicker = false
			},
			//教育程度确认
			onEduConfirm(event){
				const {text, value} = event.mp.detail.value;
				this.form.eduStateName = text
				this.form.eduStateId = value
				this.showEduPicker = false
			},
			//所属人群确认
			onPerTypeConfirm(event){
				const {text, value} = event.mp.detail.value;
				this.form.perTypeName = text
				this.form.perTypeId = value
				this.showPerTypePicker = false
			},
			onDialogClose(event){
				const action = event.mp.detail;
				console.log(event)
			
				if(action == "confirm"){//confirm、cancel
					if(utils.isNotEmpty(this.dialog.value)){
						let {vTypeName, value} = this.dialog
						this.form[vTypeName] = value
						this.dialog.show = false
					}else{
						//this.$notify({ type: 'primary', message: this.dialog.title });
						this.$wxToast(this.dialog.title)
					}
				}
				setTimeout(()=>{
					this.dialog.title = "标题"
					this.dialog.vType = "0"
					this.dialog.value = ""
					this.dialog.show = false
				},200)
			},
			openDialog(vTypeName){
				
				if(vTypeName == 'age'){
					this.dialog.title = "请输入您的年龄"
					this.dialog.vType = "1"
				}else if(vTypeName == 'qq'){
					this.dialog.title = "请输入您的QQ"
					this.dialog.vType = "1"
				}else if(vTypeName == 'email'){
					this.dialog.title = "请输入您的邮箱"
					this.dialog.vType = "0"
				}else if(vTypeName == 'pass'){
					this.dialog.title = "请输入您的密码"
					this.dialog.vType = "2"
				}
				this.dialog.vTypeName = vTypeName
				this.dialog.value = this.form[vTypeName]
				this.dialog.show = true
			},
			//
	        onAreaChange(event){
	        	const { values:pItem, index, picker} = event.mp.detail;
	        	//console.log(event)
	           /* let val = picker.getValues();
	            let areaName = ''
	            for (var i = 0; i < val.length; i++) {
	                areaName = areaName+(i==0?'':'/')+val[i].name
	            }*/
	        },
	        //确定选择开户地区
	        onAreaConfirm(event){
	        	const { values:pItem, index} = event.mp.detail;
	        	//console.log(event)
	            this.form.area = pItem[0].name+"、"+pItem[1].name;
	            this.selectedArea = [...pItem]
	            this.showAreaPicker = false//关闭弹框
	            
	        },
	        //取消选中城市
	        onAreaCancel(){
	             this.showAreaPicker = false
	             this.$refs.myArea.reset()// 重置城市列表
	        },
	        submit(){
	        	//{ sex: sex, age: age, qq: qq, email: email, hf: hf, edu: edu, belon: belon, province: province, city: city },

	        	let { sexId, sexName, age, qq, email, marryName, eduStateName, perTypeName, province, city } = this.form
				
	        	if(this.selectedArea.length){
	        		province = this.selectedArea[0].name.slice(0, -1),	//如湖北省不能带上“省”
	        		city = this.selectedArea[1].name.slice(0, -1);	//如武汉市不能带上“市”
	        	}
	        	let params = {
	        		gender:sexName, age, qq, email,
	        		marriage: marryName,
	        		education: eduStateName,
	        		crowd: perTypeName,
	        		province,
	        		city
	        	}
	        	//console.log(params)
	        	this.API.setBaseUserInfo(params).then(({data, error})=>{
	        		if (error.errno == 200) {
                        this.$wxToast({
                        	duration: 600, // 持续展示 toast
						  	forbidClick: true,
						  	type: "success",
						  	message: '设置成功',
						  	onClose:()=>{this.$router.back()}
						});
                      
                    } else if (error.errno == 101) {
                        this.$wxToast({
						  	//forbidClick: true,
						  	type: "fail",
						  	message: error.usermsg
						});
                    } else {
                        //var url = "/MobileUserCenter/BaseUserInfo";
                        //location.href = "/MobileUserCenter/UserCenter?rturl=" + url;
                        //this.$router.push({path:"/login", query:{rturl:"/baseUserInfo"}})
                        this.$wxToast({
						  	//forbidClick: true,
						  	type: "fail",
						  	message: error.usermsg
						});
                    }

	        	})
	        }
		},
		created(){
			this.getBaseUserInfo()
		}
	}
</script>

<style scoped lang="scss">
	.page-index {
		.content {
			.cell-group{
				/deep/ .van-cell {
					padding: 8px 14px;
					 .van-cell__title, .van-cell__value{
						font-size: 13px;
					}
					
				}	
			}
			.van-dialog{
				.input-item{
					padding: 20px 15px;
					.u-input{
						height: 42px;
						line-height: 42px;
					    border: 1px solid rgba(0, 0, 0, .2);
					    border-radius: 6px;
					    padding-left: 10px;
					}
				}
			}
			.btn-group{
				margin-top: 30px;
				padding: 0 10px;
				.vbtn{
					/deep/ .van-button{
						height: 40px;
					}
				}
			}
		}
	}
</style>