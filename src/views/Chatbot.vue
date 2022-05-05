<template>
  <div class="chatbot">
    <van-nav-bar title='PhoneBot' @click-right="onClickRight">
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>
    <div class="chatbot-content">
      <BotUi/>
    </div>
    <van-popup
        v-model="shownews"
        closeable
        close-icon="close"
        position="right"
        :style="{ height: '90%' }"
    >

      <div class="cart" style="margin-top:3em">

      </div>
    </van-popup>
  </div>
</template>

<script>
import BotUi from "../components/BotUi";
// 对象引入
// import {botui} from '../components/BotUi';
// import {instance} from "@/request";

export default {
  name: "Chatbot",
  components: {
    BotUi,
  },
  data: function () {
    return {}
  },
  methods: {}
}
</script>
<style scoped>

</style>
