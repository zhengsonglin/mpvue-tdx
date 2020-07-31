<template>
	<div class="refundDetail bg-fff vh100">
		<div class="section-1 flex">
			<div class="left-img">
				<img :src="productInfo.url" mode="widthFix" class="p-img w100"/>
			</div>
			<div class="right-content flex">
				<div><span>{{productInfo.title}}</span></div>
				<div class="row">订单号:<span class="margin-left-xs">{{productInfo.orderNo}}</span></div>
				<div class="row">总价:<span class="margin-left-xs span-orange">{{productInfo.price}}</span></div>
				<div class="row">实拍:<span class="margin-left-xs span-pink">{{productInfo.actPrice}}</span></div>
				<div class="row">买家旺旺:<span class="margin-left-xs span-blue">zold845517008</span></div>
			</div>
		</div>
		<div class="section-2">
			<van-cell title="申请原因" is-link :value="reason" @click="showPicker = true"/>
			<van-popup :show="showPicker" position="bottom">
			  	<van-picker show-toolbar :columns="reasonArray" :default-index="setDefaultIndex(reasonArray, reason)" @cancel="showPicker = false" @confirm="onConfirm" />
			</van-popup>
			
		</div>
		<div class="section-3">
			<van-field label="真实姓名" :value="realName" placeholder="请输入真实姓名" :border="true" @change="onChange" />
		</div>
		<div class="section-4">
			<van-uploader :file-list="fileList" multiple preview-size="67px" max-count="4" @afterread="afterRead"  @delete="deleteImg"/>
		</div>
		
		<div class="btn-group">
			<van-button class="vbtn" size="small" block color="linear-gradient(to right, #4bb0ff, #6149f6)" @click="submit" >提交</van-button>
		</div>
	</div>
</template>

<script>
	export default {
		name:"refundDetail",
		data(){
			return {
				productInfo: {url:''},
				showPicker:false,
				reason:"",
				reasonArray: [
					{text:"原因一", value:'1'},{text:"原因二", value:"2"},
					{text:"原因三", value:'3'},{text:"原因四", value:"4"},
				],
				fileList:[
					{url: '', status: 'done',  message: '上传完成', },
				    {url: 'https://img.yzcdn.cn/vant/leaf.jpg', status: 'uploading', message: '上传中', },
				    {url: 'https://img.yzcdn.cn/vant/tree.jpg', status: 'failed', message: '上传失败', },
				]
			}
		},
		methods:{
			onConfirm(event){
				const {text, value} = event.mp.detail.value;
				this.reason = text
				this.showPicker = false
			},
			afterRead(event){
				const { file, index } = event.mp.detail;

				let result = []
				if(Array.isArray(file) && file.constructor === Array){
					result = file.map((item)=>{
						return {url: item.path, status: 'done',  message: '上传完成', }
					})
				}else{
					result.push({url: file.path, status: 'done',  message: '上传完成',})
				}
				
				this.fileList.push(...result)
				/*
			    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
			    wx.uploadFile({
				      url: 'https://example.weixin.qq.com/upload', // 仅为示例，非真实的接口地址
				      filePath: file.path,
				      name: 'file',
				      formData: { user: 'test' },
				      success(res) {
				        // 上传完成需要更新 fileList
				        const { fileList = [] } = this.data;
				        fileList.push({ ...file, url: res.data });
				        this.setData({ fileList });
				      },
			    });
			    */
			},
			deleteImg(event){
				let index = event.mp.detail.index;
				this.fileList.splice(index,1)
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
			submit(){}
		},
		mounted(){
			this.productInfo = JSON.parse(this.$root.$mp.query.item)
			this.fileList[0].url = this.productInfo.url
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.refundDetail{
		/deep/ .van-cell__title, /deep/ .van-cell__value{
			font-size: 15px;
			color: #666;
		}
		.section-1{
			align-items: center;
			padding: 10px;
			box-sizing: border-box;
			.left-img{
				flex: 1;
				width: 0;
			}
			.right-content{
				flex: 2;
				width: 0;
				font-size: 14px;
				flex-direction: column;
				justify-content: space-around;
				padding-left: 5px;
				line-height: 25px;
				color: #666;
				.row{
					.margin-left-xs{margin-left: 5px;}
					.span-orange{color: #f37b1d;}
			    	.span-pink{color: #e03997;}
			    	.span-blue{color: #0081ff;}
				}
			}
		}
		.section-2{
			
		}
		.section-4{
			padding-left: 16px;
			box-sizing: border-box;
		}
		.btn-group{
			margin-top: 40px;
			padding: 0 10px;
			.vbtn{
				/deep/ .van-button{
					height: 40px;
					border-radius: 8px;
				}
			}
		}
	}
</style>