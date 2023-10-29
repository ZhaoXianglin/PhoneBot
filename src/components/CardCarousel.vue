<template>
  <div class="horizontal-container">
    <div class="scroll-wrapper" ref="scroll">
      <div class="scroll-content">
        <div class="scroll-item">
          <div v-for=" phone in phone_list" :key="phone.id">
            <div class="card">
              <div style="width: 100%;text-align:center;background-color: #f5f5f5">
                <img style="max-height: 360px" :src="phone.img" alt=""/>
              </div>
              <div class="card-text" style="margin-top: 1em; display: flex; justify-content: space-between;">
                    <span style="display:block;font-size: 20px;font-weight: bold">{{
                        phone.modelname
                      }}</span>
              </div>
              <table class="card-text" style="margin-top: 0.5em;word-break: break-word; font-size:18px; color: #555555">
                <tr>
                  <td style="width: 96px"> Storage:</td>
                  <td>{{ phone.storage }}GB</td>
                </tr>
                <tr>
                  <td>Memory:</td>
                  <td>{{ phone.ram }}GB</td>
                </tr>
                <tr>
                  <td>OS:</td>
                  <td>{{ phone.os1 }}</td>
                </tr>
                <tr>
                  <td>Weight:</td>
                  <td>{{ phone.weight }} g</td>
                </tr>
                <tr>
                  <td>Screen:</td>
                  <td>{{ phone.displaysize }}inches</td>
                </tr>
                <tr>
                  <td>Resolution:</td>
                  <td>{{ phone.resolution1 }}*{{ phone.resolution2 }}</td>
                </tr>
                <tr>
                  <td>Battery:</td>
                  <td>{{ phone.battery }}mAh</td>
                </tr>
              </table>
              <span class="card-text"
                    style="display: block; font-size: 20px;font-weight: bold;color: #B24040;align-self: center;">${{
                  phone.price
                }}</span>
              <div class="card-text" style="display: flex;justify-content: center;box-sizing: border-box">
                <button target="view_window" @click="check_detail_btn(phone.url)"
                        style="box-sizing: border-box; text-align:center; width:100%; display: block; padding: 5px 10px;border-radius: 4px;border: 1px solid #1989fa; background-color: white;color: #1989fa">
                  Detail
                </button>
              </div>
              <div class="card-text"
                   style="display: flex;justify-content: center; box-sizing: border-box;margin-bottom: 10px"
                   v-if="!showed_phones[phone.id].add_to_cart">
                <button target="view_window" @click="add_to_cart_btn(phone.id)"
                        style="text-align:center; width:100%;display: block; padding: 5px 10px;border-radius: 4px;border: 1px solid #1989fa;background-color: white;color: #1989fa">
                  Select
                  this phone
                </button>
              </div>
              <div style="clear: both;line-height: 5px">&nbsp;</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core'

export default {
  name: "CardCarousel",
  props: ["phone_list", "showed_phones"],
  data: function () {
    return {
      // news: {
      //   'title': '‘I thought controlling diabetes was about sugar – but exercise became more important than ever’',
      //   'summary': "From Midlife Fitness Files: The Telegraph health series, where we glean advice from midlifers as they talk us through their weekly regime",
      //   'top_image': "https://www.telegraph.co.uk/content/dam/health-fitness/2022/07/14/TELEMMGLPICT000302846411_trans_NvBQzQNjv4Bq650fPriS1eaPGT3alxUCDzK__nsI-RFirNxNxiNjkxY.jpeg?imwidth=680",
      //   'id': "10",
      // },
    }
  },
  mounted() {
    this.init()
  },
  beforeDestroy() {
    this.bs.destroy()
  },
  methods: {
    init() {
      this.bs = new BScroll(this.$refs.scroll, {
        scrollX: true,
        probeType: 3 // listening scroll event
      })
    },
    check_detail_btn: function (url) {
      console.log(url)
      this.$emit('phone_url', url);
    },
    add_to_cart_btn: function (id) {
      console.log(id)
      this.$emit('phone_id', id);
      //this.$store.commit('addToCart', id);
    },
  }
}
</script>

<style scoped>
.scroll-wrapper {
  position: relative;
  width: 100%;
  height: 570px;
  white-space: nowrap;
  border-radius: 4px;
  overflow: hidden
}

.scroll-content {
  display: inline-block;
}

.scroll-item {
  display: flex;
}

.card {
  box-sizing: border-box;
  width: 240px;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, .2), 0 2px 2px 0 rgba(0, 0, 0, .14), 0 1px 5px 0 rgba(0, 0, 0, .12);
  border-radius: 4px;
  background-color: #fff;
  color: rgba(0, 0, 0, .87);
  white-space: normal;
  margin: 0 6px;
  position: relative;
  box-sizing: border-box;
  height: auto;
}

.image {
  position: relative;
  overflow: hidden;
  flex: 1 0 auto;
  max-width: 100%;
  display: flex;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}

.card-title {
  width: 240px;
  align-items: center;
  font-size: 1.15rem;
  font-weight: 500;
  letter-spacing: .0125em;
  line-height: 1.3rem;
  word-break: break-all;
  margin: 10px 0;
  padding: 0 10px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}

.card-text {
  width: 240px;
  color: rgba(0, 0, 0, .6);
  font-size: .875rem;
  font-weight: 400;
  line-height: 1.3rem;
  letter-spacing: .0071428571em;
  padding: 0 10px;
  margin: 10px 0;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  overflow: hidden;
}

.card-action {
  width: 100%;
  height: 46px;
  box-sizing: border-box;
  justify-content: space-around;
  display: flex;
  flex-direction: column;
  padding: 8px;
  position: absolute;
  bottom: 5px;
}
</style>