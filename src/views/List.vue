<template>
  <div class="index">
    <van-nav-bar title="Comparison"></van-nav-bar>
    <div class="content">
      <p>The following phones were recommended to you by the "Phonebot", would you like to change your final choice?</p>
      <p style="overflow: auto;width: 100%">
        <table class="table">
          <van-radio-group v-model="final_select">
            <tr>
              <th>&nbsp;</th>
              <th>Phone</th>
              <th>Price</th>
              <th>Storage</th>
              <th>Memory</th>
              <th>OS</th>
              <th>Weight</th>
              <th>Screen</th>
              <th>Resolution</th>
              <th>Battery</th>
            </tr>
            <tr v-for="phone in showed_phones" :key="phone.id">
              <td>
                <van-radio :name="phone.id">&nbsp;</van-radio>
              </td>
              <td>
                <van-image
                    fit="contain"
                    width="100"
                    height="100" :src="phone.img"
                />
                <p style="text-align: center;font-weight: bold">{{ phone.modelname }}</p>
              </td>
              <td>${{ phone.price }}</td>
              <td>{{ phone.storage }}GB</td>
              <td>{{ phone.ram }}GB</td>
              <td>{{ phone.os1 }}</td>
              <td>{{ phone.weight }}g</td>
              <td>{{ phone.displaysize }} inch</td>
              <td>{{ phone.resolution1 }} * {{ phone.resolution2 }}</td>
              <td>{{ phone.battery }}mAh</td>
            </tr>
          </van-radio-group>
        </table>
      </p>
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
      recommended_phones: ''
    }
  },
  mounted() {
    for (let item in this.showed_phones) {
      console.log(item)
      this.recommended_phones += item + ','
    }
    console.log(this.recommended_phones)
  },
  methods: {
    confirm_btn() {
      instance.post('/api/final_select', {
        'final_select': this.final_select,
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
  border: 1px solid #000;
  font-size: 14px;
  border-collapse: collapse;
}

.table th, td {
  padding: 6px;
  border: 1px solid #000;
  border-collapse: collapse;
}

</style>
