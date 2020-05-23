<template>
	<view class="flex justify-center align-center bg-white text-black" 
	style="position: fixed;z-index: 1024;top: 0;" 
	:style="barStyle"
	>
		<view class="iconfont iconicon_left flex align-center margin-left-sm" style="height: 80rpx; width: 80rpx;font-size: 40rpx;"
		@tap="BackPage"></view>
		<view class="flex flex-wrap justify-center align-center text-center margin-left-smtext-black text-bold"
		style="font-size: 36rpx;">
			{{title}}
		</view>
		<view class="iconfont iconfenxiang margin-left-sm flex align-center  margin-right-sm "  style="height: 80rpx; width: 80rpx;font-size: 60rpx;" @tap="onBtnClick"></view>
	</view>
</template>

<script>
	import Vue from 'vue';
	
	export default {
		data() {
			return {
				statusBarHeight: this.StatusBar,
			};
		},
		name: 'zd-title-bar',
		computed: {
			barStyle(){
				let height = parseInt(this.statusBarHeight)+165;
				let padTop = parseInt(this.statusBarHeight)+45;
				var style = `height:${height}rpx;padding-top:${padTop}rpx;`;
				console.log('状态栏样式'+style);
				return style;
			},
		},
		props: {
			bgColor: {
				type: String,
				default: ''
			},
			isBack: {
				type: [Boolean, String], 
				default: true
			},
			bgImage: {
				type: String,
				default: ''
			},
			title: {
				type: String,
				default: ''
			},
			backText: {
				type: String,
				default: ''
			},
			buttons: {
				type: Array,
				default(){
					return  [];
				}
			}
		},
		methods: {
			
			BackPage() {
				uni.navigateBack({
					delta: 1
				});
			},
			onBtnClick(item){
				this.$emit("btnclick", item);
			},
			getHeight(){
				return parseInt(this.statusBarHeight)+165;
			},
			getPaddingHeight(){
				return parseInt(this.statusBarHeight)+45;
			}
		}
	}
</script>

<style>
	.hide{
		display: none;
	}
</style>
