import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

import pageHead from './components/page-head.vue'
import pageFoot from './components/page-foot.vue'

import zdTitleBar from './components/zd-title-bar/zd-title-bar.vue'

Vue.component('page-head', pageHead)
Vue.component('page-foot', pageFoot)
Vue.component('zd-title-bar', zdTitleBar)

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
