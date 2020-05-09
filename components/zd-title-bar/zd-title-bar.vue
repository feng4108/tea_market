<template>
	<!-- <view> -->
		<view class="cu-custom" :style="[{height:CustomBar + 'px'}]">
			<view class="cu-bar fixed" :style="style" :class="[bgImage!=''?'none-bg text-white bg-img':'',bgColor]">
				<view v-if="isBack" class="action" @tap="BackPage">
					<text class="zdIcon-back"></text>
					<text v-if="backText">{{backText}}</text>
				</view>
				<view v-if="title" class="cu-content" :style="[{top:StatusBar + 'px'}]">
					<text >{{title}}</text>
				</view>
				<view v-else class="flex-sub">
					<slot></slot>
				</view>
				<text v-for="item in buttons" :key="item.ID" :class="item.ICON" class="padding-right-xs" @tap="onBtnClick(item)">{{item.TEXT}}</text>
			</view>
		</view>
	<!-- </view> -->
</template>

<script>
	import Vue from 'vue';
	
	export default {
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar
			};
		},
		name: 'zd-title-bar',
		computed: {
			style() {
				var StatusBar= this.StatusBar;
				var CustomBar= this.CustomBar;
				var bgImage = this.bgImage;
				var style = `height:${CustomBar}px;padding-top:${StatusBar}px;`;
				if (this.bgImage) {
					style = `${style}background-image:url(${bgImage});`;
				}
				return style
			}
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
				if (getCurrentPages().length < 2) {
				    if ('undefined' !== typeof __wxConfig) {
						let url = '/' + __wxConfig.pages[0]
						return this.$routerX.redirectTo({url})
					}
					
					uni.switchTab({
						url: Vue.$auth.homeRoute
					});
					return
				}
				uni.navigateBack({
					delta: 1
				});
			},
			onBtnClick(item){
				this.$emit("btnclick", item);
			}
		}
	}
</script>

<style>
	.hide{
		display: none;
	}
</style>
