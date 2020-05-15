<template>
	<view class="flex bg-white justify-start align-start hot-goods padding-sm " @tap="onClick">
		<image class="avatar" mode="aspectFill" :src="item.url"></image>
		<view class="flex flex-direction justify-center align-start margin-left-sm">
			<view class="price-symbol">{{ item.name }}</view>
			<view class="price-value">{{ item.content }}</view>
			<view class="pay-count">{{ item.date }}</view>
		</view>
		<view class="sell-state  margin-left-sm" :class="item.appreciate ? 'cuIcon-appreciatefill' : 'cuIcon-appreciate'" @tap="appreciate">{{ item.count }}</view>
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
				this.item.count++;
			} else {
				this.item.count--;
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
	font-weight: normal;
	font-stretch: normal;
	line-height: 40rpx;
	letter-spacing: 0rpx;
	color: #999999;
}

.price-value {
	font-family: PingFang-SC-Medium;
		font-size: 28rpx;
		font-weight: normal;
		font-stretch: normal;
		line-height: 44rpx;
		letter-spacing: 0rpx;
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
.sell-state {
	height: 36rpx;
	width: 100rpx;
	background-color: #e60012;
	border-radius: 6rpx;
	margin-top: 10rpx;
	padding-top: 4rpx;
	padding-bottom: 4rpx;
	font-size: 18rpx;
	font-stretch: normal;
	text-align: center;
	color: #ffffff;
	flex-shrink: 0;
}
.avatar {
	width: 66rpx;
	height: 66rpx;
	border-radius: 6rpx;
	flex-shrink: 0;
}
</style>
