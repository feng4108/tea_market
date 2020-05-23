<template>
	<view class="bg-white">
		<zd-title-bar :title="goodsName" v-on:btnclick="onShare"></zd-title-bar>
		<view :style="'height: ' + (statusBarHeight + 165) + 'rpx'"></view>
		<scroll-view id="tab-bar" class="flex scroll-h bg-white align-center text-center" :scroll-x="true" :show-scrollbar="false" :scroll-into-view="scrollInto">
			<view v-for="(tab, index) in tabs" :key="tab.id" class="uni-tab-item" :id="tab.id" :data-current="index" @tap="tabSelect">
				<text class="uni-tab-item-title" :class="tabIndex == index ? 'uni-tab-item-title-active' : ''">{{ tab.name }}</text>
			</view>
		</scroll-view>
		<view class="flex flex-direction">
			<view :style="'height: 80rpx'"></view>
			<!--商品图片轮播-->
			<swiper
				id="id-all-detail"
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
			<view class="flex align-start justify-center margin-bottom-sm margin-top-sm">
				<view class="flex flex-direction flex-grow-1  align-center justify-center  buyer-seller-list">
					<view class="flex align-center justify-center  want padding-top-xs padding-bottom-xs" style="width: 310rpx;" @tap="have = !have">
						<view style="40rpx" :class="have ? 'iconfont iconchenggong' : 'iconfont iconchenggong1'"></view>
						<view class="text-lg  margin-lr-sm">我有</view>
					</view>
					<view class="buyer-seller-list margin-bottom-sm">
						<uni-grid :column="4" :showBorder="false">
							<view class="" v-for="(item, index) in 8" :key="index">
								<view class="buyer-avatar" style="background-color: #F2F2F2;" v-if="index == 7"><text style="font-size: 24rpx;color: #999999;">13</text></view>
								<image v-else class="buyer-avatar" src="https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg" mode=""></image>
							</view>
						</uni-grid>
					</view>
				</view>
				<view class="flex flex-direction flex-grow-1  align-center justify-start buyer-seller-list">
					<view class="flex align-center justify-center want padding-top-xs padding-bottom-xs" style="width: 310rpx;" @tap="like = !like">
						<view style="40rpx" :class="like ? 'iconfont iconaixin1' : 'iconfont iconaixin'"></view>
						<view class="text-lg margin-lr-sm">想要</view>
					</view>
					<view class="buyer-seller-list  margin-bottom-sm">
						<uni-grid :column="4" :showBorder="false">
							<view class="" v-for="(item, index) in 3" :key="index">
								<view class="buyer-avatar" style="background-color: #F2F2F2;" v-if="index == 7"><text style="font-size: 24rpx;color: #999999;">13</text></view>
								<image v-else class="buyer-avatar" src="https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg" mode=""></image>
							</view>
						</uni-grid>
					</view>
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
			<view id="id-all-deal" class="flex padding-sm bg-white justify-center">
				<view class="block-title  flex-grow-1">购买记录(2324)</view>

				<view style="width: 20%;">
					<xfl-select
						:list="transType"
						:clearable="false"
						:showItemNum="5"
						:listShow="false"
						:isCanInput="false"
						style_Container="height: 50rpx; font-size: 22rpx;"
						initValue="全部规格"
						:selectHideType="'independent'"
					></xfl-select>
				</view>

			</view>
			<view v-for="(item, index) in transRecordList" :key="item.id" class="uni-tab-item bg-white" :id="item.id" :data-current="index" @tap="tabSelect">
				<view class="flex trans-record-item align-center justify-center">
					<view class="trans-record-item-content" :style="'width:25%'">{{ item.date }}</view>
					<view class="flex align-center justify-center" :style="'width:50%'">
						<view class="trans-record-item-content">{{ item.userId }}</view>
						<view class="trans-record-item-content margin-left-xs">{{ item.year }}</view>
						<view class="trans-record-item-type margin-left-xs">{{ item.type }}</view>
					</view>

					<view class="trans-record-item-content" :style="'width:25%'">￥{{ item.price }}</view>
				</view>
			</view>
			<view class="flex padding" style="font-size: 24rpx;">
				<view class="text-black text-bold" style="flex-grow: 1;">
					查看购买
				</view>
				<view class="text-gray cuIcon-right">
					2863付款/332热门求购
				</view>
			</view>
			<view id="id-all-comments" class="flex padding-sm bg-white">
				<view class="block-title flex-grow-1">讨论(2324)</view>
				<view class="bg-add-comment flex align-center justify-center" @tap="addComment()"><view class="text-black text-lg" :class="'cuIcon-add'">添加</view></view>
			</view>
			<view v-for="(item, index) in discussList" :key="item.id" class="uni-tab-item bg-white" :data-current="index" @tap="tabSelect">
				<view class="flex flex-direction">
					<zd-comment-item :item="item"></zd-comment-item>
					<view v-for="(subItem, subIndex) in item.list.slice(0, item.list.length > 3 ? 3 : item.list.length)" :key="subItem.id" class="second-comment-item">
						<zd-comment-item :item="subItem"></zd-comment-item>
					</view>
					<view v-if="item.list.length > 3" class="second-comment-item" style="font-size: 22rpx;color: #999999;">{{ item.list.length }}条更多回复</view>
				</view>
			</view>
			<view id="id-all-promotion" class="flex padding-sm bg-white"><view class="block-title flex-grow-1">热门推荐</view></view>
			<view id="id-all-pics" class="flex padding-sm bg-white"><view class="block-title flex-grow-1">商品图片</view></view>
			<view style="height:150rpx;"></view>
			<uni-popup ref="showpopup" type="bottom" @change="change">
				<view style="width: 750rpx;height: 420rpx;" class="flex flex-direction bg-white padding justify-center">
					<view class="flex justify-between ">
						<text class="bg-add-comment flex align-center justify-center bg-white" @click="cancel('popup')">取消</text>
						<text class="bg-add-comment flex align-center justify-center  bg-white" @click="sendComment">发送评论</text>
					</view>
					<textarea
						class="bg-white margin-top-sm"
						:auto-height="false"
						placeholder="请输入评论"
						style="height: 300rpx;width: 710rpx;padding: 20rpx;border-radius: 10rpx;background-color: #EBEEF5;border-width: 1px;"
						@input="onInputComment"
					></textarea>
				</view>
			</uni-popup>
			<!-- 底部分享弹窗 -->
			<uni-popup ref="showshare" type="bottom" @change="change">
				<view class="uni-share">
					<text class="uni-share-title">分享到</text>
					<view class="uni-share-content">
						<view v-for="(item, index) in shareList" :key="index" class="uni-share-content-box">
							<view class="uni-share-content-image"><image :src="item.icon" class="content-image" mode="widthFix" /></view>
							<text class="uni-share-content-text">{{ item.text }}</text>
						</view>
					</view>
					<text class="uni-share-btn" @click="cancel('share')">取消分享</text>
				</view>
			</uni-popup>
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

import zdCommentItem from '@/components/zd-comment-item/zd-comment-item.vue';
import uniGrid from '@/components/uni-grid/uni-grid.vue';
import uniGridItem from '@/components/uni-grid-item/uni-grid-item.vue';
import uniPopup from '@/components/uni-popup/uni-popup.vue';
import xflSelect from '../../components/xfl-select/xfl-select.vue';
export default {
	components: {
		zdCommentItem,
		uniGrid,
		uniGridItem,
		uniPopup,
		xflSelect
	},
	data() {
		return {
			statusBarHeight: this.StatusBar,
			goodsName: '特级乌龙茶 高山冻顶乌龙茶拼装茶叶礼盒装 80g 顺丰包邮',
			tabs: [
				{ id: 'tab-detail', name: '商品', index: 'id-all-detail' },
				{ id: 'tab-deal', name: '成交', index: 'id-all-deal' },
				{ id: 'tab-comments', name: '评论', index: 'id-all-comments' },
				{ id: 'tab-recommend', name: '推荐', index: 'id-all-promotion' },
				{ id: 'tab-pics', name: '照片', index: 'id-all-pics' }
			],
			scrollInto: '',
			tabIndex: 0,
			swiperList: [], //轮播图
			cardCur: 0,
			dotStyle: true,
			like: false, //喜欢
			have: false, //我有
			transType: ['全部规格', '预售', '团购', '订单'],
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
			discussList: [], //讨论列表
			shareList: [],
			tempComment: ''
		};
	},
	onLoad() {
		this.swiperList = mock['banner'];
		this.discussList = mock['comments'];
		this.shareList = mock['share'];
	},
	onReady() {
		this.calcPosition();
	},
	methods: {
		onShare() {
			uni.showToast({
				title: '你点了分享按钮',
				icon: 'none'
			});
			this.$nextTick(() => {
				this.$refs['showshare'].open();
			});
		},
		cancel(type) {
			this.$refs['show' + type].close();
		},
		change(e) {
			console.log('是否打开:' + e.show);
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
			uni.pageScrollTo({
				duration: 0,
				scrollTop: this.tabs[index].offTop
			});
		},
		calcPosition() {
			let self = this;
			for (let i = 0; i < this.tabs.length; i++) {
				uni.createSelectorQuery()
					.select('#' + this.tabs[i].index)
					.boundingClientRect(data => {
						//目标节点
						console.log('查找的view----', data);
						let st = data.top - (this.statusBarHeight + 105);
						self.tabs[i].offTop = st;
					})
					.exec();
			}
		},
		buyOrSell(type) {
			uni.navigateTo({
				url: './good-sell'
			});
		},
		onInputComment(e) {
			this.tempComment = e.target.value;
		},
		addComment() {
			this.tempComment = '';
			this.$nextTick(() => {
				this.$refs['showpopup'].open();
			});
		},
		sendComment() {
			if (!this.tempComment) {
				uni.showToast({ title: '请输入评论', icon: 'none' });
				return;
			}
			this.cancel('popup');
			this.discussList.unshift({
				id: 'c--' + new Date().getMilliseconds().toString(),
				url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg',
				count: 10,
				name: '张***3',
				appreciate: false,
				date: '刚刚',
				content: this.tempComment,
				list: []
			});
		}
	}
};
</script>

<style lang="scss">
.scroll-h {
	width: 100%;
	height: 80rpx;
	flex-direction: row;
	white-space: nowrap;
	position: fixed;
	top: var(--status-bar-height) + 80;
	z-index: 1024;
	background-color: #ffffff;
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
	background-color: #efefef;
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

.buyer-seller-list {
	width: 340rpx;
}
.buyer-avatar {
	width: 60rpx;
	height: 60rpx;
	margin: 12rpx 12rpx;
	border-radius: 8rpx;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.second-comment-item {
	display: inline-block;
	flex-wrap: nowrap;
	padding-left: 80rpx;
}
</style>
