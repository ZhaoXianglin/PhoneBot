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
        <table class="table">
          <van-radio-group v-model="final_select">
            <tr>
              <th>&nbsp;</th>
              <th>Phone</th>
            </tr>
            <tr v-for="phone in showed_phones" :key="phone.id">
              <td>
                <van-radio :name="phone.id">&nbsp;</van-radio>
              </td>
              <td style="">
                <div style="min-width: 240px;padding: 13px 10px;background-color: white;border-radius: 10px">
                  <div style="width: 100%; text-align:center;background-color: #f5f5f5">
                    <img style="max-height: 360px" :src="phone.img" alt=""/>
                  </div>
                  <div style="margin-top: 1em; display: flex; justify-content: space-between;">
                    <span style="display:block;font-size: 20px;font-weight: bold">{{
                        phone.modelname
                      }}</span>
                  </div>
                  <table
                      style="margin-top: 0.5em;word-break: break-word; font-size:18px; color: #555555;border-collapse: collapse;">
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
                  <span style="display: block; font-size: 20px;font-weight: bold;color: #B24040;align-self: center;">${{
                      phone.price
                    }}</span><br/>
                  <div style="display: flex;justify-content: end">
                    <a target="view_window" @click="clicked_url(phone.url)"
                       style="text-align:center; width:100%;display: inline-block;padding: 5px 10px;border-radius: 4px;border: 1px solid #1989fa;background-color: white;color: #1989fa">Detail</a>
                  </div>
                </div>
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
  background-color: #F1F1F1;
}

.table th, td {
  padding: 6px;
  border: none;
  border-collapse: collapse;
}

</style>
