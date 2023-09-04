<template>
  <div>
    <van-nav-bar title="Part2"/>
    <div class="content">
      <h3>Welcome to the second part of our experiment!</h3>
      <h3>Please enter/check the random ID that you received during the first part of the experiment and click
        "continue".</h3>
      <van-field name="prolific_id" v-model="randomID" type="text" label="Random ID" required
                 placeholder="Please don't change this ID."
                 :rules="[{ required: auth, message: 'Please enter this item.' }]"/>
      <br>
      <br>
      <van-button round block type="info" native-type="submit" :loading="loading" @click="onSubmit">Continue
      </van-button>
    </div>
  </div>

</template>

<style scoped>
.content {
  margin: 14px 6px;
  padding: 10px 10px 48px 10px;

  background-color: #ffffff;
}
</style>
<script>
import {instance} from "@/request";

export default {
  name: "Step1",
  data: function () {
    return {
      randomID: "",
      loading: false,
    }
  },
  mounted() {
    if (localStorage.getItem('uuid') !== null) {
      this.randomID = localStorage.getItem('uuid').substr(0, 8)
    }
  },
  methods: {
    onSubmit() {
      if (this.randomID === "") {
        this.$toast.fail('Please enter the random ID.')
        return
      }
      if (this.randomID.length !== 8) {
        this.$toast.fail('The random ID is incorrect.')
        return
      }
      this.loading = true
      instance.post('/api/checkid', {'randomID': this.randomID}).then(res => {
        if (res.data.status === 1) {
          localStorage.setItem('uuid', res.data.uuid);
          localStorage.setItem('identity_cue', res.data.identity_cue);
          localStorage.setItem('explanation_style', res.data.explanation_style);
          this.$router.replace('/step3').catch((err) => {
            console.log(err.message)
          });
        } else {
          this.$toast.fail('The random ID is incorrect.')
        }
        this.loading = false
      }).catch(err => {
        console.log(err)
      })
    }
  }

}
</script>