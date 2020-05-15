<template>
	<view class="bg-white">
		<view class="flex flex-direction">
			<scroll-view id="tab-bar" class="flex scroll-h bg-white align-center text-center" :scroll-x="true" :show-scrollbar="false" :scroll-into-view="scrollInto">
				<view v-for="(tab, index) in tabs" :key="tab.id" class="uni-tab-item" :id="tab.id" :data-current="index" @tap="tabSelect">
					<text class="uni-tab-item-title" :class="tabIndex == index ? 'uni-tab-item-title-active' : ''">{{ tab.name }}</text>
				</view>
			</scroll-view>
			<!--商品图片轮播-->
			<swiper
				class="screen-swiper2  bg-white"
				:class="dotStyle ? 'square-dot' : 'round-dot'"
				:indicator-dots="true"
				:circular="true"
				:autoplay="true"
				interval="5000"
				duration="500"
				indicator-color="#aaaaaa"
				indicator-active-color="#ffffff"
			>
				<swiper-item v-for="(item, index) in swiperList" :key="index" :class="cardCur == index ? 'cur' : ''">
					<image :src="item.url" mode="aspectFill" v-if="item.type == 'image'"></image>
				</swiper-item>
			</swiper>
			<view class="flex align-center justify-center margin-bottom-sm margin-top">
				<view class="text-bold text-sm">最新成交价:</view>
				<view class="text-bold text-lg">￥</view>
				<view class="text-bold text-xl">500</view>
			</view>
			<view class="flex justify-center"><view class="view-all align-center" :class="'cuIcon-right'">查看全部报价</view></view>
			<view class="flex align-center justify-center margin-bottom-sm margin-top-sm">
				<view class="flex align-center justify-center  want padding-left-lg  padding-right-lg padding-top-xs padding-bottom-xs" @tap="have = !have">
					<view class="text-lg  text-lg" :class="have ? 'cuIcon-roundcheckfill' : 'cuIcon-roundcheck'"></view>
					<view class="text-lg">我有</view>
				</view>
				<view class="flex align-center justify-center margin-left-lg  want padding-left-lg  padding-right-lg padding-top-xs padding-bottom-xs" @tap="like = !like">
					<view class="text-lg " :class="like ? 'cuIcon-likefill' : 'cuIcon-like'"></view>
					<view class="text-lg">想要</view>
				</view>
			</view>
			<view class="flex flex-direction platform-service align-start justify-center padding-sm">
				<view class="tag-platform-service">专业平台多重鉴别</view>
				<view class="flex margin-top-sm justify-start align-center">
					<view class="text-sm" :class="'cuIcon-roundcheck'"></view>
					<view class="platform-service-item">平台联合鉴别</view>
					<view class="margin-left-sm" :class="'cuIcon-roundcheck'"></view>
					<view class="platform-service-item">正品保障</view>
					<view class="margin-left-sm" :class="'cuIcon-roundcheck'"></view>
					<view class="platform-service-item">假一赔三</view>
				</view>
			</view>
			<view class="flex padding-sm bg-white">
				<view class="block-title  flex-grow-1">购买记录(2324)</view>
				<view class="flex align-center">
					<view class="filter-condition">全部规格</view>
					<view :class="'cuIcon-triangledownfill'" :style="'font-size:40rpx'"></view>
				</view>
			</view>
			<view v-for="(item, index) in transRecordList" :key="item.id" class="uni-tab-item bg-white" :id="item.id" :data-current="index" @tap="tabSelect">
				<view class="flex trans-record-item align-center justify-center">
					<view class="trans-record-item-content" :style="'width:25%'">{{ item.date }}</view>
					<view class="flex align-center justify-center" :style="'width:50%'">
						<view class="trans-record-item-content">{{item.userId}}</view>
						<view class="trans-record-item-content margin-left-xs">{{item.year}}</view>
						<view class="trans-record-item-type margin-left-xs">{{ item.type }}</view>
					</view>

					<view class="trans-record-item-content" :style="'width:25%'">￥{{ item.price }}</view>
				</view>
			</view>
			<view class="flex padding-sm bg-white">
				<view class="block-title flex-grow-1">讨论(2324)</view>
				<view class="bg-add-comment flex align-center justify-center"><view class="text-black text-lg" :class="'cuIcon-add'">添加</view></view>
			</view>
			<view v-for="(item, index) in discussList" :key="item.id" class="uni-tab-item bg-white" :id="item.id" :data-current="index" @tap="tabSelect">
				<zd-comment-item :item="item"></zd-comment-item>
			</view>
			<view :style="'height:130rpx'"></view>
		</view>
		<!--		底部按钮-->
		<view class="flex bottom-action bg-white">
			<view class="flex text-white bg-btn-sell align-center justify-center margin-left-sm">
				<view class="flex flex-direction flex-grow-1  align-center justify-center">
					<view class="text-sm text-center">最高购买价</view>
					<view class="text-lg text-center text-bold">￥305</view>
				</view>
				<view class="bg-white margin-left margin-right" :style="'height:80%;width:1px'"></view>
				<view class="flex-grow-1 text-xxl" @tap="buyOrSell('sell')">出售</view>
			</view>
			<view class="flex text-black bg-btn-buy  align-center justify-center margin-left-sm margin-right-sm">
				<view class="flex flex-direction flex-grow-1 align-center justify-center">
					<view class="text-sm">最低出售价</view>
					<view class="text-lg text-bold">￥345</view>
				</view>
				<view class="bg-black margin-left margin-right" :style="'height:80%;width:1px'"></view>
				<view class="flex-grow-1 text-xxl" @tap="buyOrSell('buy')">购买</view>
			</view>
		</view>
	</view>
</template>

<script>
import mock from '@/mock/mock-data.js';
import zdCommentItem from '@/components/zd-comment-item/zd-comment-item.vue'
export default {
	components:{
		zdCommentItem
	},
	data() {
		return {
			title: '66666666666',
			tabs: [{ id: 'detail', name: '商品' }, { id: 'deal', name: '成交' }, { id: 'comment', name: '评论' }, { id: 'recommend', name: '推荐' }, { id: 'pics', name: '照片' }],
			scrollInto: '',
			tabIndex: 0,
			swiperList: [], //轮播图
			cardCur: 0,
			dotStyle: true,
			like: false, //喜欢
			have: false, //我有
			transRecordList: [
				{
					date: '刚刚',
					userId: '10003',
					type: '预售',
					price: 512.32,
					year: '2020年'
				},
				{
					date: '3分钟前',
					userId: '10013',
					type: '团购',
					price: 512.32,
					year: '2020年'
				},
				{
					date: '昨天',
					userId: '10006',
					type: '订单',
					price: 512.32,
					year: '2020年'
				},
				{
					date: '5天前',
					userId: '10652',
					type: '预售',
					price: 512.32,
					year: '2020年'
				}
			], //交易记录
			discussList: [] //讨论列表
		};
	},
	onLoad() {
		this.swiperList = mock['banner'];
		this.discussList = mock['comments'];
	},
	onNavigationBarButtonTap(e) {
		uni.showToast({
			title: '你点了分享按钮',
			icon: 'none'
		});
	},
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
		buyOrSell(type) {}
	}
};
</script>

<style lang="scss">
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
.screen-swiper2 {
	height: 750rpx;
	padding-top: 47rpx;
}

.screen-swiper2 image,
.screen-swiper2 video,
.swiper-item image,
.swiper-item video {
	width: 750rpx;
	display: block;
	height: 100%;
	pointer-events: none;
}
.view-all {
	font-size: 24rpx;
	font-weight: normal;
	font-stretch: normal;
	line-height: 40rpx;
	letter-spacing: 0rpx;
	color: #999999;
}

.want {
	border-radius: 10rpx;
	border: solid 2rpx #999999;
}

.platform-service {
	width: 684rpx;
	background-color: #cc9756;
	border-radius: 8rpx;
	margin-left: 34rpx;
}
.tag-platform-service {
	font-family: PangMenZhengDao;
	font-size: 30rpx;
	font-weight: normal;
	font-stretch: normal;
	line-height: 40rpx;
	letter-spacing: 0rpx;
	color: #333333;
}

.platform-service-item {
	font-family: PingFang-SC-Medium;
	font-size: 18rpx;
	font-weight: normal;
	font-stretch: normal;
	line-height: 40rpx;
	letter-spacing: 0rpx;
	color: #555555;
}

.block-title {
	font-family: PingFang-SC-Bold;
	font-weight: bold;
	font-size: 36rpx;
	font-weight: normal;
	font-stretch: normal;
	line-height: 40rpx;
	letter-spacing: 0rpx;
	color: #333333;
}

.flex-grow-1 {
	flex-grow: 1;
}
.flex-grow-2 {
	flex-grow: 2;
}

.filter-condition {
	font-family: PingFang-SC-Regular;
	font-size: 28rpx;
	font-weight: normal;
	font-stretch: normal;
	line-height: 40rpx;
	letter-spacing: 0rpx;
	color: #333333;
}
.trans-record-item-type {
	width: 74rpx;
	border-radius: 6rpx;
	padding-top: 2rpx;
	padding-bottom: 2rpx;
	border: solid 1rpx #999999;
	font-size: 16rpx;
	letter-spacing: 0rpx;
	color: #333333;
	text-align: center;
}
.trans-record-item {
	width: 710rpx;
	height: 114rpx;
	padding-left: 20rpx;
	padding-right: 20rpx;
	background-color: #ffffff;
	box-shadow: 0rpx 1rpx 0rpx 0rpx #eeeeee;
}
.trans-record-item-content {
	font-family: PingFang-SC-Regular;
	font-size: 28rpx;
	font-weight: normal;
	font-stretch: normal;
	line-height: 40rpx;
	letter-spacing: 0rpx;
	color: #333333;
}

.bg-add-comment {
	width: 142rpx;
	height: 58rpx;
	border-radius: 6rpx;
	border: solid 2rpx #eeeeee;
}

.bottom-action {
	position: fixed;
	bottom: 0;
	height: 140rpx;
	padding-bottom: 10rpx;
	padding-top: 10rpx;
}

.bg-btn-sell {
	width: 350rpx;
	height: 118rpx;
	background-color: #333333;
	border-radius: 8rpx;
}

.bg-btn-buy {
	width: 350rpx;
	height: 118rpx;
	background-color: #fae100;
	border-radius: 8rpx;
}
</style>
