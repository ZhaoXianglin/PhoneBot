<template>
  <div class="tutorial">
    <van-nav-bar title="Tutorial"/>
    <youtube :video-id="videoId" @ended="ended" player-width="100%" :player-vars=options :mute="true"></youtube>
    <van-image
        width="100%"
        fit="contain"
        :src="imgSrc"
    />
    <div style="margin: 24px 16px;padding-bottom:48px">
      <van-button round block type="info" native-type="submit" :disabled="startStatus" @click="next">Continue
      </van-button>
    </div>
  </div>
</template>

<script>
import {instance} from "@/request";

export default {
  name: "Tutorial",
  data: function () {
    return {
      imgSrc: "",
      videoId: "",
      startStatus: true,
      options: {start: 0, autoplay: 1}
    }
  },
  methods: {
    ended: function () {
      this.startStatus = false;
    },
    next: function () {
      instance.post('/api/tutorial', {
        'tutorT': new Date().getTime(),
        'uuid': localStorage.getItem("uuid"),
      }).then((res) => {
        if (res.data.status === 1) {
          this.$router.replace('/prestudy').catch((err) => {
            console.log(err.message)
          });
        }else {
          this.$toast("Please refresh the page and try again.")
        }
      })
    }
  },
  mounted() {
    if (localStorage.getItem('condition') === '1') {
      this.videoId = "60GyFWSTk_A";
      this.imgSrc = require("../assets/imgs/baseline_explanation.png")
    }
    if (localStorage.getItem('condition') === '2') {
      this.videoId = "doD_UEM2OaY";
      this.imgSrc = require("../assets/imgs/baseline_explanation.png")
    }
    if (localStorage.getItem('condition') === '3') {
      this.videoId = "J8bwwGRypUw";
      this.imgSrc = require("../assets/imgs/condition3.png")
    }
  }
}
</script>

<style scoped>

</style>
