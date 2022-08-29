<template>
  <div class="posttest">
    <van-nav-bar title="Post-Study Survey(part3)"/>
    <van-steps :active="2">
      <van-step>Step1</van-step>
      <van-step>Step2</van-step>
      <van-step>Step3</van-step>
      <van-step>Step4</van-step>
    </van-steps>
    <van-form @submit="onSubmit" scroll-to-error @failed="onFailed" validate-trigger="onSubmit">
      <p style="padding:0 10px;font-weight:bold;text-align: left">1. What else do you want to comment on the
        recommendations provided by the chatbot?
      </p>
      <van-field
          v-model="openended1"
          name="openended1"
          rows="3"
          autosize
          type="textarea"
          placeholder="please enter"
          :rules="[{ required: auth, message: 'required' }]"
      />
      <p style="padding:0 10px;font-weight:bold;text-align: left">2. What else do you want to comment on the interaction
        with the chatbot?</p>
      <van-field
          name="openended2"
          v-model="openended2"
          rows="4"
          autosize
          type="textarea"
          placeholder="please enter"
          :rules="[{ required: auth, message: 'required' }]"
      />
      <div style="margin: 36px;">
        <van-button round block type="info" native-type="submit" :loading="loading">Submit</van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import {instance} from "@/request";

export default {
  name: "Que3",
  data: function () {
    return {
      loading: false,
      st: localStorage.getItem('st'),
      auth: true,
      openended1: '',
      openended2: '',
    }
  },

  methods: {
    onFailed() {
      this.$toast("You may have missed some items, please fill in.");
    },
    onSubmit: function (values) {
      this.loading = true;
      values['uuid'] = localStorage.getItem('uuid');
      values['que3T'] = new Date().getTime();
      instance.post('/que/que3', values).then((res) => {
        //console.log(res)
        if (res.data.status === 1) {
          localStorage.setItem('step', '5');
          localStorage.setItem('code', res.data.msg);
          localStorage.setItem("active", new Date().getTime().toString());
          this.loading = false;
          this.$dialog.confirm({
            confirmButtonText: "Yes, continue",
            cancelButtonText: "No",
            title: 'Additional Survey',
            message: 'We still have 32 bonus question items (take about 3-4 minutes). You will get a bonus of 0.5 US dollars for answering these extra questions  :)',
          })
              .then(() => {
                // on confirm
                this.$router.replace('/que4').catch((err) => {
                  console.log(err.message)
                  localStorage.setItem('code', "");
                });
              })
              .catch(() => {
                this.$router.replace('/success').catch((err) => {
                  console.log(err.message)
                });
              });

        } else {
          this.loading = false;
          this.$toast("Please read and accept the informed consent first.")
        }
      }).catch((err) => {
        this.loading = false;
        console.log(err.message);
        this.$toast("Network error, please try again.");
      })
    },
  }
}
</script>

<style scoped>

</style>
