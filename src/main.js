import Vue from 'vue'
import App from './App.vue'
import Vant from 'vant';
import router from './router';
import VueYouTubeEmbed from 'vue-youtube-embed'
import VAnimateCss from 'v-animate-css';

import 'vant/lib/index.css';
import '@vant/touch-emulator';
Vue.config.productionTip = false
Vue.use(Vant);
Vue.use(VueYouTubeEmbed);
Vue.use(VAnimateCss);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
