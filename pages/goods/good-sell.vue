<template>
	<view class="flex flex-direction">
		<zd-title-bar :title="goodsName" v-on:btnclick="onShare"></zd-title-bar>
		<view :style="[{'height': (statusBarHeight+165) + 'rpx'}]" style="width: 750rpx;background-color: #ff0000;"></view>
		<image class="margin-top-sm" :src="imgUrl" style="width: 750rpx;height: 400rpx;"></image>
		<view class="flex align-baseline justify-center">
			<view class="price-tag">最新价：</view>
			<view class="price-symbol">￥</view>
			<view class="price-value flex align-end">{{ price }}</view>
			<view class="price-change margin-left-lg">+{{ change }}%</view>
			<view class="iconfont icondingdan margin-left-lg"></view>
		</view>
		<scroll-view id="tab-bar" class="flex scroll-h bg-white align-center text-center" :scroll-x="true" :show-scrollbar="false" :scroll-into-view="scrollInto">
			<view v-for="(tab, index) in tabs" :key="tab.id" class="uni-tab-item" :id="tab.id" :data-current="index" @tap="tabSelect">
				<text class="uni-tab-item-title" :class="tabIndex == index ? 'uni-tab-item-title-active' : ''">{{ tab.name }}</text>
			</view>
		</scroll-view>
		<view class="divider margin-top-sm margin-bottom-sm"></view>

		<view class="flex" style="padding-left: 15rpx;padding-right: 15rpx;">
			<view class="flex flex-direction" style="width: 350rpx;">
				<view class="text-bold padding-left">卖方报价</view>
				<view v-for="(item, index) in buyList" :key="item.id">
					<view class="flex align-center justify-center  padding-top-sm padding-bottom-sm">
						<image class="avatar" :src="item.url"></image>
						<view class="user-name">{{ item.name }}</view>
						<view class="user-price  text-center" style="width: 110rpx;" >￥{{ item.price }}</view>
						<view class="user-num text-center" style="width: 110rpx;" >{{ item.num }}</view>
					</view>
					<view class="divider" style="width: 350rpx;"></view>
				</view>
				
			</view>
			<view class="flex flex-direction" style="width: 350rpx;margin-left: 20rpx;">
				<view class="text-bold  padding-right text-right" style="width: 100%;">买方报价</view>
				<view v-for="(item, index) in sellList" :key="item.id">
				<view class="flex align-center justify-center padding-top-sm padding-bottom-sm">
					<image class="avatar" :src="item.url"></image>
					<view class="user-name">{{ item.name }}</view>
					<view class="user-price  text-center" style="width: 80rpx;" >￥{{ item.price }}</view>
					<view class="user-num  text-center" style="width: 80rpx;" >{{ item.num }}</view>
					<view class="bg-sell-out flex align-center justify-center">变现</view>
				</view>
				<view class="divider" style="width: 350rpx;"></view>
				</view>
			</view>
			
		</view>
		<view style="height: 102rpx;"></view>
		<!-- 底部分享弹窗 -->
		<uni-popup ref="showshare" type="bottom" @change="shareChange">
			<view class="uni-share">
				<text class="uni-share-title">分享到</text>
				<view class="uni-share-content">
					<view v-for="(item, index) in shareList" :key="index" class="uni-share-content-box">
						<view class="uni-share-content-image">
							<image :src="item.icon" class="content-image" mode="widthFix" />
						</view>
						<text class="uni-share-content-text">{{ item.text }}</text>
					</view>
				</view>
				<text class="uni-share-btn" @click="cancel('share')">取消分享</text>
			</view>
		</uni-popup>
		<view class="bg-white flex align-center justify-center" style="position: fixed;bottom: 0rpx;height: 102rpx;">
			<view class="bg-button flex justify-start align-center">
				<view class="bt-hint">没有合适的价格？</view>
				<view class="bt-action">+卖出上架</view>
			</view>
		</view>
	</view>
</template>

<script>
	import mock from '@/mock/mock-data.js';
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
export default {
	components:{
		uniPopup
	},
	data() {
		return {
			statusBarHeight:this.StatusBar,
			goodsName:'特级乌龙茶 高山冻顶乌龙茶拼装茶叶礼盒装 80g 顺丰包邮',
			imgUrl: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg',
			price: 500,
			change: 3.53,
			tabs: [
				{ id: 'consign-sell', name: '寄售卖出' },
				{ id: 'store-sell', name: '专店卖出' },
				{ id: 'pre-sell', name: '预售卖出' },
				{ id: 'promotion-sell', name: '促销卖出' },
				{ id: 'live-sell', name: '直播卖出' }
			],
			scrollInto: '',
			tabIndex: 0,
			buyList: [
				
			],
			sellList: [
				
			],
			shareList:[]
		};
	},
	onShow(){
		this.buyList = mock.buyList;
		this.sellList = mock.sellList;
		this.shareList = mock['share'];
	},
	methods: {
		onShare(){
			uni.showToast({
				title: '你点了分享按钮',
				icon: 'none'
			});
			this.$nextTick(() => {
				this.$refs['showshare'].open()
			})
		},
		cancel(type) {
			this.$refs['show' + type].close()
		},
		shareChange(e) {
			console.log('是否打开:' + e.show)
		},
		tabSelect(e) {
			let index = parseInt(e.target.dataset.current || e.currentTarget.dataset.current);
			this.switchTab(index);
		},
		switchTab(index) {
			if (this.tabIndex === index) {
				return;
			}
			this.tabIndex = index;
			this.scrollInto = this.tabs[index].id;
		}
	}
};
</script>

<style lang="scss">
page {
	height: 100%;
	background-color: #ffffff;
}

.scroll-h {
	width: 100%;
	height: 80rpx;
	flex-direction: row;
	white-space: nowrap;
}
.uni-tab-item {
	display: inline-block;
	flex-wrap: nowrap;
	padding-left: 25rpx;
	padding-right: 15rpx;
}
.uni-tab-item-title {
	font-size: 30rpx;
	height: 80rpx;
	line-height: 80rpx;
	flex-wrap: nowrap;
	color: #999999;
	/* #ifndef APP-PLUS */
	white-space: nowrap;
	/* #endif */
}
.uni-tab-item-title-active {
	color: #333333;
	font-weight: bold;
	font-size: 30rpx;
	padding: 0rpx 0rpx 20rpx;
	border-bottom: 4rpx solid;
}
.price-tag {
	font-family: PingFang-SC-Bold;
	font-size: 30rpx;
	font-weight: normal;
	font-stretch: normal;
	line-height: 40rpx;
	letter-spacing: 0rpx;
	color: #333333;
}

.price-symbol {
	font-family: PingFang-SC-Heavy;
	font-size: 36rpx;
	font-weight: normal;
	letter-spacing: 0rpx;
	color: #ee572f;
	margin-left: 20rpx;
}

.price-value {
	font-family: PingFang-SC-Heavy;
	font-size: 48rpx;
	font-weight: normal;
	letter-spacing: 0rpx;
	color: #ee572f;
}
.price-change {
	font-family: PingFang-SC-Bold;
	font-size: 28rpx;
	font-weight: normal;
	letter-spacing: 0rpx;
	color: #ee572f;
}

.avatar {
	width: 40rpx;
	height: 40rpx;
	background-color: #00bfa6;
	border-radius: 20rpx;
	flex-shrink: 0;
}

.user-name {
	width: 80rpx;
	font-family: PingFang-SC-Regular;
	margin-left: 10rpx;
	font-size: 20rpx;
	font-weight: normal;
	font-stretch: normal;
	line-height: 40rpx;
	color: #333333;
}
.user-price {
	font-family: PingFang-SC-Bold;
	font-size: 20rpx;
	font-weight: normal;
	font-stretch: normal;
	line-height: 40rpx;
	color: #ee572f;
}
.user-num {
	font-size: 20rpx;
	font-weight: normal;
	font-stretch: normal;
	line-height: 40rpx;
	color: #333333;
}
.bg-sell-out {
	width: 80rpx;
	height: 40rpx;
	background-color: #fae100;
	border-radius: 6rpx;
	font-size: 18rpx;
	color: #333333;
	text-align: center;
}
.divider{
	height: 1rpx;
	background-color: #AAAAAA;
}
.bg-button {
	width: 690rpx;
	height: 72rpx;
	background-color: #fae100;
	border-radius: 8rpx;
	margin-top: 15rpx;
	margin-left: 30rpx;
}
.bt-hint {
	margin-left: 36rpx;
	font-family: PingFang-SC-Regular;
	font-size: 20rpx;
	font-weight: normal;
	font-stretch: normal;
	line-height: 58rpx;
	letter-spacing: 0rpx;
	color: #666666;
	
	
}
.bt-action{
		font-family: PingFang-SC-Heavy;
		font-size: 32rpx;
		line-height: 58rpx;
		letter-spacing: 0rpx;
		color: #333333;
		margin-left: 100rpx;
}
</style>
