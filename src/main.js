import Vue from 'vue'
import App from './App.vue'
import Vant from 'vant';
import router from './router';
import VueYouTubeEmbed from 'vue-youtube-embed'
import VAnimateCss from 'v-animate-css';
import Vuex from 'vuex'

import 'vant/lib/index.css';
import '@vant/touch-emulator';

Vue.config.productionTip = false
Vue.use(Vant);
Vue.use(VueYouTubeEmbed);
Vue.use(VAnimateCss);
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        //当前在展示的手机
        current_phone: {},
        //展示过的手机,key是手机id,value是字典，手机详情
        showed_phones: {},
        //展示过的手机的id列表
        showed_phones_list: [],
        //购物车里的手机id列表
        cart_phones: []
    },
    mutations: {
        addToCart(state, phone_id) {
            //状态加入购物车的状态改为true
            state.showed_phones[phone_id].add_to_cart = true;
            state.cart_phones.push(phone_id)
        },
        addShowedPhone(state, phone) {
            //增加一个属性,先默认为true，让按钮不显示
            phone.add_to_cart = true
            state.showed_phones[phone.id] = phone
            state.current_phone = phone
            state.showed_phones_list.push(phone.id)
            // 然后修改之前显示的一条
            if (state.showed_phones_list.length > 1) {
                let pre_id = state.showed_phones_list[state.showed_phones_list.length - 2]
                if (!state.cart_phones.includes(pre_id)) {
                    //如果上一个元素没有被加入购物车
                    state.showed_phones[pre_id].add_to_cart = false;
                }
            }
        },
        setWarning(state, phone_id) {
            state.showed_phones[phone_id].warning = true;
        }
    }
})

new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app')
