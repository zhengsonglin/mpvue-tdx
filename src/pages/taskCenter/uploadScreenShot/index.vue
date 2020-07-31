<template>
	<div class="uploadScreenShot bg-fff vh100">
		<div class="section-1 flex">
			<van-cell-group>
			  <van-field  :value="productInfo.wangwang" required label="买家旺旺" placeholder="请输入买家旺旺" />
			
			  <van-field :value="productInfo.orderNo" label="订单号"  placeholder="请输入密码" required :border="true"/>
			</van-cell-group>
		</div>
		<div class="section-2">
			<p class="upload-title">图片上传</p>
			<van-uploader :file-list="fileList" multiple preview-size="67px" max-count="4" @afterread="afterRead"  @delete="deleteImg"/>
		</div>
		
		<div class="btn-group">
			
			<van-button class="vbtn" size="small" block color="linear-gradient(to right, #4bb0ff, #6149f6)" @click="submit" >提交</van-button>
		</div>
	</div>
</template>

<script>
	export default {
		name:"uploadScreenShot",
		data(){
			return {
				productInfo:{
					wangwang:"zold845517008",
					orderNo:""
				},
				fileList:[
					{url: '', status: 'done',  message: '上传完成', },
				    {url: 'https://img.yzcdn.cn/vant/leaf.jpg', status: 'uploading', message: '上传中', },
				    {url: 'https://img.yzcdn.cn/vant/tree.jpg', status: 'failed', message: '上传失败', },
				]
			}
		},
		methods:{
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
			submit(){}
		},
		mounted(){
			this.productInfo = Object.assign({}, this.productInfo, JSON.parse(this.$root.$mp.query.item))
			this.fileList[0].url = this.productInfo.url
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.uploadScreenShot{
		/deep/ .van-cell__title, /deep/ .van-cell__value{
			font-size: 15px;
			color: #666;
		}
		.section-2{
			padding-left: 16px;
			box-sizing: border-box;
			margin-top: 10px;
			.upload-title{
				color: #666;
				font-size: 15px;
				padding: 1px 0 6px;
			}
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