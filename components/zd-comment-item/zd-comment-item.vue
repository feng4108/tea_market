<template>
	<view class="flex bg-white justify-start align-start hot-goods padding-sm " @tap="onClick">
		<image class="avatar" mode="aspectFill" :src="item.url"></image>
		<view class="flex flex-direction justify-center align-start margin-left-sm" style="flex-grow: 1;">
			<view class="price-symbol">{{ item.name }}</view>
			<view class="price-value">{{ item.content }}</view>
			<view class="pay-count">{{ item.date }}</view>
		</view>
		<view class="appre align-center justify-center"  @tap="appreciate"> 
			<view class="appre-icon" :class="item.appreciate ? 'iconfont icongood-fill' : 'iconfont icongood'"></view>
		<view class="appre-state  margin-left-xs">{{ item.count }}</view>
		</view>
		
	</view>
</template>

<script>
import Vue from 'vue';

export default {
	data() {
		return {};
	},
	name: 'zd-comment-item',
	props: {
		item: {
			type: Object,
			default: {}
		}
	},
	methods: {
		onClick() {
			this.$emit('onClick', this.item);
		},
		appreciate() {
			if (this.item.appreciate) {
				this.item.count--;
			} else {
				this.item.count++;
			}
			this.item.appreciate = !this.item.appreciate;
		}
	}
};
</script>

<style lang="scss">
.hot-goods {
	border-radius: 10rpx;
}

.price-symbol {
	font-size: 28rpx;
	line-height: 40rpx;
	color: #999999;
}

.price-value {
	font-family: PingFang-SC-Medium;
		font-size: 28rpx;
		line-height: 44rpx;
		color: #333333;
}
.pay-count {
	font-size: 22rpx;
	font-weight: normal;
	font-stretch: normal;
	color: #999999;
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
.appre{
	display: flex;
	width: 100rpx;
	height: 36rpx;
	flex-shrink: 0;
}

.appre-icon{
	font-size: 32rpx;
}
.appre-state {
	font-size: 28rpx;
}
.avatar {
	width: 66rpx;
	height: 66rpx;
	border-radius: 6rpx;
	flex-shrink: 0;
}
</style>
