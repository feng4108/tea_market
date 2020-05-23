<script>
import Vue from 'vue';
export default {
	onLaunch: function() {
		console.log('App Launch');
		uni.getSystemInfo({
			success: function(e) {
				Vue.prototype.StatusBar = e.statusBarHeight;
				console.log('状态栏高度' + Vue.prototype.StatusBar);
			}
		});
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style>
/*每个页面公共css */
@import 'colorui/main.css';
@import 'colorui/icon.css';
@import 'common/iconfont.css';
</style>
