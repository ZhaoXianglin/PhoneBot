<template>
  <div class="index">
    <van-popup
        v-model="show_phone_page"
        closeable
        close-icon="close"
        position="left"
        round
        :style="{ height: '100%',width:'100%' }"
    >
      <div class="cart" style="margin-top:3em;height: 100%">
        <iframe style="width: 100%;height: 100%" :src="clicked_trans_url"/>
      </div>
    </van-popup>
    <van-nav-bar title="Comparison"></van-nav-bar>
    <div class="content">
      <p>You current selected phone is <span
          style="color: #B24040;font-weight: bold">{{ current_phone.modelname }}</span>. You can review all the phones
        recommended by the chatbot in the following table.</p>
      <p>If you want to change your purchase decision, you can choose another phone in the table and explain why you
        change your decision.</p>
      <p style="overflow: auto;width: 100%;">
        <van-radio-group v-model="final_select" v-if="identity_cue==='0'">
          <van-grid :border="false" :column-num="2">
            <van-grid-item v-for="phone in showed_phones" :key="phone.id" style="border:1px solid #ebeef5">
              <van-image :src="phone.img"/>
              <p style="font-size: 13px;font-weight: bolder;">{{ phone.modelname }}</p>
              <div style="margin-bottom: 5px">
                <van-tag plain type="primary" style="margin:2px">Storage:{{ phone.storage }}GB</van-tag>
                <van-tag plain type="primary" style="margin:2px">RAM:{{ phone.ram }}GB</van-tag>
                <van-tag plain type="primary" style="margin:2px">{{ phone.os1 }}</van-tag>
                <van-tag plain type="primary" style="margin: 2px">{{ phone.cam1 }}MP</van-tag>
                <van-tag plain type="primary" style="margin: 2px">{{ phone.displaysize }}inches</van-tag>
                <van-tag plain type="primary" style="margin: 2px">{{ phone.resolution1 }}*{{
                    phone.resolution2
                  }}
                </van-tag>
                <van-tag plain type="primary" style="margin: 2px">{{ phone.battery }}mAh</van-tag>
                <div style="font-weight:bold;font-size:16px;color: #B24040">${{ phone.price }}</div>
              </div>
              <van-button type="info" size="small" plain block @click="clicked_url(phone.url)">Detail</van-button>
              <p style="margin-top: 6px;margin-bottom: 0">
                <van-radio :name="phone.id"></van-radio>
              </p>
            </van-grid-item>
          </van-grid>
        </van-radio-group>
        <table class="table" v-if="identity_cue==='1'">
          <van-radio-group v-model="final_select">
            <tr v-for="phone in showed_phones" :key="phone.id">
              <td>
                <van-radio :name="phone.id">&nbsp;</van-radio>
              </td>
              <td>
                <van-card>
                  <template #thumb>
                    <van-image :src="phone.img"/>
                  </template>
                  <template #title>
                    <div style="font-size: 16px;font-weight: bolder;">{{ phone.modelname }}</div>
                  </template>
                  <template #price>
                    <div style="font-weight:bold;font-size:16px;color: #B24040">${{ phone.price }}</div>
                  </template>
                  <template #tags>
                    <div>
                      <van-tag plain type="primary" style="margin:2px">Storage:{{ phone.storage }}GB</van-tag>
                      <van-tag plain type="primary" style="margin:2px">RAM:{{ phone.ram }}GB</van-tag>
                      <van-tag plain type="primary" style="margin:2px">{{ phone.os1 }}</van-tag>
                      <van-tag plain type="primary" style="margin: 2px">{{ phone.cam1 }}MP</van-tag>
                      <van-tag plain type="primary" style="margin: 2px">{{ phone.displaysize }}inches</van-tag>
                      <van-tag plain type="primary" style="margin: 2px">{{ phone.resolution1 }}*{{
                          phone.resolution2
                        }}
                      </van-tag>
                      <van-tag plain type="primary" style="margin: 2px">{{ phone.battery }}mAh</van-tag>
                    </div>
                  </template>
                  <template #footer>
                    <van-button style="min-width: 96px; font-size: 14px" size="small" type="info" plain @click="check_detail_btn(item.url)">&nbsp;&nbsp;&nbsp; Detail &nbsp;&nbsp;&nbsp;</van-button>
                  </template>
                </van-card>
              </td>

            </tr>
          </van-radio-group>
        </table>
      </p>
      <van-field
          v-model="reason"
          rows="3"
          autosize
          label="Comment"
          v-show="show_textarea"
          type="textarea"
          placeholder="Please explain your reason for changing your final choice."
      />
      <van-button type="primary" block @click="confirm_btn">Confirm</van-button>
    </div>
  </div>
</template>

<script>
//import {instance} from '../request';

import {instance} from "@/request";

export default {
  name: "List",
  components: {},

  data: function () {
    return {
      //实验条件
      identity_cue: "",
      explanation_style: "",

      showed_phones: this.$store.state.showed_phones,
      current_phone: this.$store.state.selected_phone,
      final_select: this.$store.state.selected_phone.id,
      recommended_phones: '',
      show_textarea: false,
      reason: '',
      show_phone_page: false,
      clicked_trans_url: '',
    }
  },
  mounted() {
    this.explanation_style = localStorage.getItem("explanation_style")
    this.identity_cue = localStorage.getItem("identity_cue")

    for (let item in this.showed_phones) {
      console.log(item)
      this.recommended_phones += item + ','
    }
    console.log(this.recommended_phones)
  },
  watch: {
    final_select: function (newVal) {
      if (newVal !== this.$store.state.selected_phone.id) {
        this.show_textarea = true
      } else {
        this.show_textarea = false
      }
    }
  },
  methods: {
    clicked_url: function (childValue) {
      this.clicked_trans_url = "https://www.chatbot.fans:3000/?url=" + childValue
      this.show_phone_page = true;
    },
    confirm_btn() {
      if (this.show_textarea === true) {
        this.reason = this.reason.trim()
        if (this.reason === '') {
          this.$toast("Please explain your reason for changing your final choice.")
          return
        }
      }
      instance.post('/api/final_select', {
        'final_select': this.final_select,
        'reason': this.reason,
        'tableT': new Date().getTime(),
        'uuid': localStorage.getItem("uuid"),
        'recommended_phone': this.recommended_phones,
      }).then((res) => {
        if (res.data.status === 1) {
          this.$router.replace('/success').catch((err) => {
            console.log(err.message)
          });
        } else {
          this.$toast("Network error, please try again later.")
        }
      })
      //this.$router.push({path: '/questionnaire'});
    },
  },
}
</script>

<style scoped>
.content {
  box-sizing: border-box;
  margin: 5px;
  padding: 6px 10px 36px 10px;
  border-radius: 6px;
  background-color: #fff;
  color: #323233;
}

.table {
  width: 100%;
  font-size: 14px;
  border-collapse: collapse;
  border: none;
}

.table th, td {
  padding: 6px;
  border: none;
  border-collapse: collapse;
}

</style>
