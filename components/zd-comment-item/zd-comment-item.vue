<template>
	<view class="flex bg-white justify-center align-center hot-goods padding-sm " @tap="onClick">
		<image  class="avatar" mode="aspectFill" :src="item.url"></image>
		<view class="flex flex-direction justify-center align-center">
			<view class="price-symbol">{{item.name}}</view>
			<view class="price-value">{{item.content}}</view>
			<view class="pay-count">{{item.date}}</view>
		</view>
		<view class="sell-state" :class="item.appreciate?'cuIcon-appreciatefill':'cuIcon-appreciate'" @tap="appreciate">{{item.count}}</view>
	</view>
</template>

<script>
	import Vue from 'vue';
	
	export default {
		data() {
			return {
			};
		},
		name: 'zd-comment-item',
		props: {
			item: {
				type: Object,
				default: {}
			},
		},
		methods: {
			onClick(){
				this.$emit("onClick", this.item);
			},
			appreciate(){
				if(this.item.appreciate){
					this.item.count++;
				}else {
					this.item.count--;
				}
				this.item.appreciate = !this.item.appreciate;
			}
		}
	}
</script>

<style lang="scss">
	.hot-goods{
		border-radius: 10rpx;
	}


	.price-symbol {
		font-family: PingFang-SC-Bold;
		font-weight: bold;
		font-size: 20rpx;
		line-height: 36rpx;
		color: #333333;
	}

	.price-value {
		font-family: PingFang-SC-Bold;
		font-weight: bold;
		font-size: 28rpx;
		color: #333333;
		flex-grow: 1;
	}
	.pay-count {
		font-family: PingFang-SC-Bold;
		font-weight: bold;
		font-size: 22rpx;
		line-height: 36rpx;
		color: #999999;
		flex-grow: 1;
		text-align: right;
	}
	.ware-cover {
		width: 254rpx;
		height: 203rpx;
	}
	.ware-name {
		width: 243rpx;
		font-family: PingFang-SC-Bold;
		font-weight: bold;
		font-size: 22rpx;
		line-height: 36rpx;
		letter-spacing: 0rpx;
		color: #333333;
	}
	.sell-state {
		height: 36rpx;
		width: 140rpx;
		background-color: #e60012;
		border-radius: 6rpx;
		margin-top: 10rpx;
		padding-top: 4rpx;
		padding-bottom: 4rpx;
		font-size: 18rpx;
		font-stretch: normal;
		text-align: center;
		color: #ffffff;
	}
	.avatar{
		width: 66rpx;
		height: 66rpx;
		border-radius: 6rpx;
	}
</style>
