<template>
	<view class="content">
		<view class="top-search align-center justify-center flex">
			<view class=" top-search icon" :class="'cuIcon-search'"></view>
			<view class="top-search text">新品上市春茶</view>
		</view>
		<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
			<view class="cu-item" :class="index==TabCur?'cur':''" v-for="(item,index) in bids" :key="index" @tap="tabSelect" :data-id="item.id">
				{{item.name}}
			</view>
		</scroll-view>
		<swiper class="screen-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
				:autoplay="true" interval="5000" duration="500" indicator-color="#aaaaaa" indicator-active-color="#ffffff">
			<swiper-item v-for="(item,index) in swiperList" :key="index" :class="cardCur==index?'cur':''">
				<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
			</swiper-item>
		</swiper>
        <view class="cu-list grid" :class="['col-' + gridCol,gridBorder?'':'no-border']">
            <view class="cu-item align-center justify-center" v-for="(item,index) in subBids" :key="index" v-if="index<gridCol*2">
				<image class="class-icon" :src="item.url" mode="aspectFill"></image>
                <text>{{item.name}}</text>
            </view>
        </view>
		<view class="cu-list grid" :class="['col-2' ,gridBorder?'':'no-border']">
		    <view class="flex align-center justify-start" v-for="(item,index) in subBids" :key="index" v-if="index<2*2">
				<view class="flex flex-direction justify-start align-start">
					<text class="hot-class-name">{{item.name}}</text>
					<view class="flex align-center justify-start">
						<view class="price-symbol">￥</view>
						<view class="price-value">500</view>
					</view>

					<view class="pay-count"> 208人付款</view>
					<view class="flex sell-state align-center justify-center" >
						3日内有成交
					</view>
				</view>
				<image class="hot-class-cover" :src="item.url" mode="aspectFill"></image>
		    </view>
		</view>
        <view class="cu-list grid" :class="['col-2' ,gridBorder?'':'no-border']">
		    <view class="cu-item" v-for="(item,index) in hotGoods" :key="index" v-if="index<2*3">
		        <view class="flex justify-center align-center">
                    <view class="price-symbol">￥</view>
                    <view class="price-value">500</view>
                    <view class="pay-count"> 208人付款</view>
                </view>
                <view class="sell-state align-center justify-center" >
                    3日内有成交
                </view>
                <image class="ware-cover" :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
                <view class="ware-name">
                    2020年新春热卖大红袍2.0金罐10罐装 新春热卖大红袍
                </view>
                <view  :class="['cuIcon-' + item.cuIcon,'text-' + item.color]">
                </view>
		    </view>
		</view>

	</view>
</template>

<script>
	import mock from '@/mock/mock-data.js';
export default {
	onLoad() {
		
	},
	onShow() {
		this.bids = mock['bids'];
		this.swiperList = mock['banner'];
		this.subBids = mock.subBids;
		this.hotGoods = mock.hotGoods;
	},
	data() {
		return {
			cardCur: 0,
			bids:[],
			swiperList: [],//轮播图
            subBids:[],
            hotGoods:[],
			dotStyle: true,
			direction: '',
			TabCur: 0,
			scrollLeft: 0,
            gridCol: 4,
            gridBorder: false,
		};
	},
	onLoad() {},
	methods: {
		tabSelect(e) {
			this.TabCur = e.currentTarget.dataset.id;
			this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
		}
	}
};
</script>

<style lang="scss">
	page {
		background-color: #ffffff;
		min-height: 100%;
	}
	.top-search {
		width: 710rpx;
		min-height: 64rpx;
		background-color: #f2f2f2;
		border-radius: 8rpx;
		margin-left: 20rpx;
		margin-top: 20rpx;
		align-items: center;
	}
	.top-search.icon {
		width: 25rpx;
		height: 24rpx;
		color: #999999;
	}
	.top-search.text {
		font-family: PingFang-SC-Medium;
		font-size: 24rpx;
		font-weight: normal;
		font-stretch: normal;
		letter-spacing: 0rpx;
		width: 160rpx;
		color: #999999;
	}

	.class-icon {
		width: 109rpx;
		height: 109rpx;
	}

	.hot-class-cover{
		width: 200rpx;
		height: 200rpx;
	}
	.hot-class-name {
		font-family: PingFang-SC-Bold;
		font-size: 32rpx;
		font-weight: normal;
		font-stretch: normal;
		line-height: 58rpx;
		letter-spacing: 0rpx;
		color: #333333;
	}

    .price-symbol {
        font-family: PingFang-SC-Bold;
        font-size: 20rpx;
        font-weight: normal;
        font-stretch: normal;
        line-height: 36rpx;
        letter-spacing: 0rpx;
        color: #333333;
    }

    .price-value{
              font-family: PingFang-SC-Bold;
              font-size: 28rpx;
              font-weight: normal;
              letter-spacing: 0rpx;
              color: #333333;
          }
    .pay-count {
        font-family: PingFang-SC-Bold;
        font-size: 20rpx;
        font-weight: normal;
        font-stretch: normal;
        line-height: 36rpx;
        letter-spacing: 0rpx;
        color: #999999;
        flex-grow: 1;
    }
    .ware-cover {
        width: 254rpx;
        height: 203rpx;
		margin-top: 20rpx;
    }
    .ware-name{
        width: 243rpx;
        font-family: PingFang-SC-Bold;
        font-size: 22rpx;
        font-weight: normal;
        font-stretch: normal;
        line-height: 36rpx;
        letter-spacing: 0rpx;
        color: #333333;
    }
    .sell-state {
		display: flex;
        width: 150rpx;
        height: 36rpx;
        background-color: #e60012;
        border-radius: 6rpx;
		margin-top: 10rpx;
		padding-top: 3rpx;
		padding-bottom: 3rpx;
        font-family: PingFang-SC-Bold;
        font-size: 12rpx;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0rpx;
        text-align: center;
        color: #ffffff;

    }
</style>
