<template>
	<div class="page-index bg-fff vh100 over-auto updateDescription">
		<div class="content">
			<div class="update-item" v-if="data.length">
				<p v-for="(item, index) in data" :key="index">更新内容：{{item.FUpdateContent}} <span class="fr">{{item.FTime}}</span></p>
			</div>
			<van-empty description="暂无更新内容" v-else />
		</div>
	</div>	
</template>

<script>
	//import utils from "@/utils/utils"
	export default {
		name: 'updateDescription',
		data() {
			return {
				data:[]
			}
		},
		methods: {
			onClickLeft() {
				this.$router.back();
			},
			getSysInfo(){
				this.API.getSysInfo().then((data)=>{
					this.data = data
				})
			}
		},
		created(){
			//this.getSysInfo()
		}
	}
</script>

<style scoped lang="scss">
	.page-index {
		.content {
			
		}
	}		
</style>