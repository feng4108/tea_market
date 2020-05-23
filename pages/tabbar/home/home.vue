<template>
	<view class="content">
		<view class="sticky-bar"></view>
		<uni-search-bar radius="8" bgColor="#f2f2f2" :placeholder="searchPlaceholder" @confirm="search" cancelText="搜索" @cancel="search" />

		<!--顶部分类-->
		<view class="flex bg-white sticky-box">
			<scroll-view id="tab-bar" class="scroll-h bg-white margin-left-sm" :scroll-x="true" :show-scrollbar="false" :scroll-into-view="scrollInto">
				<view v-for="(tab, index) in bids" :key="tab.id" class="uni-tab-item" :id="tab.id" :data-current="index" @tap="tabSelect">
					<text class="uni-tab-item-title" :class="tabIndex == index ? 'uni-tab-item-title-active' : ''">{{ tab.name }}</text>
				</view>
			</scroll-view>
			<view class="flex flex-direction more align-center justify-center">
				<view class="more-icon" :class="'cuIcon-cascades'"></view>
				<view class="more-text">分类</view>
			</view>
		</view>
		<!--		轮播广告-->
		<swiper
			class="screen-swiper  bg-white"
			:class="dotStyle ? 'square-dot' : 'round-dot'"
			:indicator-dots="true"
			:circular="true"
			:autoplay="true"
			interval="5000"
			duration="500"
			indicator-color="#aaaaaa"
			indicator-active-color="#ffffff"
			 @tap="onclick"
		>
			<swiper-item v-for="(item, index) in swiperList" :key="index" :class="cardCur == index ? 'cur' : ''">
				<image :src="item.url" mode="aspectFill" v-if="item.type == 'image'"></image>
			</swiper-item>
		</swiper>
		<!--		子分类-->
		<view class="cu-list grid bg-white" :class="['col-' + gridCol, gridBorder ? '' : 'no-border']">
			<view  v-for="(item, index) in subBids" :key="index" v-if="index < gridCol * 2">
				<view v-if="index<(gridCol*2-1)" class="flex flex-direction align-center justify-center">
					<image class="sub-class-icon" :src="item.url" mode="aspectFill"></image>
					<view class="sub-class-text">{{ item.name }}</view>
				</view>
				<view v-else class="flex flex-direction align-center justify-center">
					<image class="sub-class-icon" src="/static/img/ic_more.png" mode="aspectFill"></image>
					<view class="sub-class-text">全部</view>
				</view>

			</view>
		</view>
		<!--热门板块-->
		<view class="grid bg-white padding align-center justify-between" :class="['col-2', gridBorder ? '' : 'no-border']">
			<view class="flex align-start " v-for="(item, index) in hotBids" :key="index" v-if="index < 2 * 2" @tap="onclick">
				<view class="flex bg-white padding-bottom">
					<view class="flex flex-direction justify-start align-start">
						<view class="hot-class-name margin-bottom-sm">{{ item.name }}</view>
						<view class="flex align-bottom justify-start">
							<view class="price-symbol">￥</view>
							<view class="price-value">500</view>
						</view>
						<view class="pay-count">208人付款</view>
						<view class="sell-state">3日内有成交</view>
					</view>
					<image class="hot-class-cover margin-left-sm" :src="item.url" mode="aspectFill"></image>
				</view>
			</view>
		</view>
		<view class="flex align-center bg-white padding-bottom-lg justify-center">
			<view class="filter-tag  flex align-center justify-center">
				<view>热门推荐</view>
				<view class="more-icon margin-left-xs" :class="'cuIcon-triangledownfill'"></view>
			</view>

			<view class="filter-tag flex align-center justify-center">
				<view>筛选商品</view>
				<view class="more-icon margin-left-xs" :class="'cuIcon-filter'"></view>
			</view>
		</view>
		<!--		推荐商品-->
		<view class="grid align-center justify-between padding" :class="['col-2', gridBorder ? '' : 'no-border']">
			<view v-for="(item, index) in hotGoods" :key="index" v-if="index < 2 * 3">
				<zd-goods-item :item="item" v-on:onClick="onclick"></zd-goods-item>
			</view>
		</view>
	</view>
</template>

<script>
import mock from '@/mock/mock-data.js';
import zdTitleBar from '@/components/zd-title-bar/zd-title-bar';
import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue';
import zdGoodsItem from '@/components/zd-goods-item/zd-goods-item.vue';
export default {
	components: {
		zdTitleBar,
		uniSearchBar,
		zdGoodsItem
	},
	onLoad() {},
	onShow() {
		this.bids = mock['bids'];
		this.swiperList = mock['banner'];
		this.subBids = mock.subBids;
		this.hotBids = mock.hotBids;
		this.hotGoods = mock.hotGoods;
	},
	data() {
		return {
			statusBarHeight: this.StatusBar * 2,
			searchPlaceholder: '新品上市春茶',
			cardCur: 0,
			bids: [],
			scrollInto: '',
			tabIndex: 0,
			swiperList: [], //轮播图
			subBids: [], //分类
			hotBids: [], ///热门分类
			hotGoods: [],
			dotStyle: true,
			direction: '',
			gridCol: 4,
			gridBorder: false
		};
	},
	onLoad() {},
	methods: {
		tabSelect(e) {
			let index = parseInt(e.target.dataset.current || e.currentTarget.dataset.current);
			this.switchTab(index);
		},
		switchTab(index) {
			if (this.tabIndex === index) {
				return;
			}
			this.tabIndex = index;
			this.scrollInto = this.bids[index].id;
		},
		search(res) {
			let value = String(res.value).trim();
			if (value == '') return;
			//
		},
		onclick(e){
			uni.navigateTo({
				url: "/pages/goods/goods-detail"
			});
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: #f2f2f2;
	min-height: 100%;
}

.sticky-bar {
	/* #ifndef APP-PLUS-NVUE */
	display: flex;
	position: -webkit-sticky;
	/* #endif */
	position: sticky;
	top: 0;
	height: var(--status-bar-height);
	z-index: 99;
	background-color: #FFFFFF;
	width: 100%;
}
.sticky-box {
	/* #ifndef APP-PLUS-NVUE */
	display: flex;
	position: -webkit-sticky;
	/* #endif */
	position: sticky;
	top: var(--status-bar-height);
	z-index: 99;
}

.scroll-h {
	width: 670rpx;
	height: 80rpx;
	flex-direction: row;
	white-space: nowrap;
	position: sticky;
	top: 150rpx;
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
	color: #333333;
	/* #ifndef APP-PLUS */
	white-space: nowrap;
	/* #endif */
}

.uni-tab-item-title-active {
	color: #007aff;
	font-size: 40rpx;
}

.more {
	width: 80rpx;
	height: 80rpx;
}
.more-icon {
	font-size: 40rpx;
}
.more-text {
	font-family: PingFang-SC-Bold;
	font-size: 20rpx;
	font-weight: normal;
	font-stretch: normal;
	color: #333333;
	text-align: center;
}

.sub-class-icon {
	width: 108rpx;
	height: 108rpx;
}
.sub-class-text {
	font-family: PingFang-SC-Bold;
	font-size: 20rpx;
	font-weight: normal;
	font-stretch: normal;
	color: #333333;
	margin-top: 10rpx;
	margin-bottom: 10rpx;
}

.hot-class-cover {
	width: 180rpx;
	height: 180rpx;
}
.hot-class-name {
	font-family: PingFang-SC-Bold;
	font-weight: bold;
	font-size: 30rpx;
	color: #333333;
}

.filter-tag {
	font-family: PingFang-SC-Bold;
	font-weight: bold;
	font-size: 28rpx;
	color: #333333;
	flex-grow: 1;
	text-align: center;
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
</style>
