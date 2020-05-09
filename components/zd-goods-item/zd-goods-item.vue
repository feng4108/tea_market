<template>
	<view class="bg-white margin-top-sm justify-center align-center hot-goods padding-sm" @tap="onClick">
		<view class="flex justify-center align-center">
			<view class="price-symbol">￥</view>
			<view class="price-value">500</view>
			<view class="pay-count">208人付款</view>
		</view>
		<view class="sell-state">3日内有成交</view>
		<view class="flex align-center justify-center">
			<image class="ware-cover margin-top-sm" :src="item.url" mode="aspectFill" v-if="item.type == 'image'"></image>
		</view>

		<view class="ware-name">2020年新春热卖大红袍2.0金罐10罐装 新春热卖大红袍</view>
		<image  class="bar-code" mode="aspectFill" src="/static/img/barcode.png"></image>
	</view>
</template>

<script>
	import Vue from 'vue';
	
	export default {
		data() {
			return {
			};
		},
		name: 'zd-goods-item',
		props: {
			item: {
				type: Object,
				default: {}
			},
		},
		methods: {
			onClick(){
				this.$emit("onClick", item);
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
		width: 120rpx;
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
	.bar-code{
		width: 285rpx;
		height: 60rpx;
		border-radius: 4rpx;
		border: solid 2rpx #eeeff3;
	}
</style>
