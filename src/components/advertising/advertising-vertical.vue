<template>
	<div class="row-advertising">
		<van-row class="bg-fff">
			<van-col span="6">
				<!--<slot name="title"><p class="adv-title">{{title}}</p></slot>-->
				<p class="adv-title">商城头条<van-icon name="bullhorn-o" /></p>
			</van-col>
			<van-col span="18">
				<slot name="right-content">
					<div class="adv-content" v-if="datas.length">
						<swiper :autoplay="true" :interval="3000" :vertical="true" :circular="true" class="adv-swipe">
					      	<block v-for="(item, index) in datas" :key="index" >
						        <swiper-item>{{item.text}}</swiper-item>
						    </block>
					    </swiper>
					</div>
				</slot>
				
			</van-col>
		</van-row>

	</div>
</template>

<script>
	export default {
		name:"advtisingVertical",
		props:{
			title:{
				type: String,
				default: "",
			},
			datas:{
				type: Array,
				default: ()=>[]
			}
		},
		data() {
			return {
				
			};
		},
	};
</script>

<style scoped lang="scss">
	.row-advertising{
		font-size: 14px;
		/deep/ .van-row{
			margin: 10px;
			padding: 4px 10px;
			border-radius: 10px;
			line-height: 2;
			background: #FFFFFF;
			.adv-swipe{
				height: 22px;
			}
		}
	}
</style>