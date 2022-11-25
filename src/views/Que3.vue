<template>
  <div class="posttest">
    <van-nav-bar title="Additional Post-Study Survey"/>
    <van-steps :active="2">
      <van-step>Step1</van-step>
      <van-step>Step2</van-step>
      <van-step>Step3</van-step>
      <van-step>Step4</van-step>
    </van-steps>
    <van-form @submit="onSubmit" scroll-to-error @failed="onFailed" validate-trigger="onSubmit">
      <p style="padding:0 10px;font-weight:bold;text-align: left">How much do you agree or disagree with the following
        statements?</p>
      <p style="padding:0 10px;font-weight:normal; text-align: left;font-size: 14px">Strongly disagree(1), Disagree(2),
        Somewhat
        disagree(3), Neutral(4), Somewhat agree(5), Agree(6), Strongly agree(7)</p>
      <van-field v-for="(item, index) in q1group" :key="item.t" :name="item.t"
                 :rules="[{ required: auth, message: 'required' }]">
        <template #input>
          <van-row style="width: 100%;">
            <van-row type="flex">
              <van-col span="24"><span style="font-weight:600">{{ index + 1 }}. {{ item.q }}</span></van-col>
            </van-row>
            <van-row type="flex" align="center" justify="between">
              <van-col span="4" class="score_left_s" style="text-align:right;">Strongly disagree</van-col>
              <van-col>
                <van-radio-group v-model="q1groupans[index]" direction="horizontal" class="matrix_table">
                  <van-radio :name="val" v-for="val in 7" :key="val" checked-color="#ee0a24" class="item">
                    {{ val }}
                  </van-radio>
                </van-radio-group>
              </van-col>
              <van-col span="4">Strongly agree</van-col>
            </van-row>
          </van-row>
        </template>
      </van-field>


      <div style="margin: 36px;">
        <van-button round block type="info" native-type="submit" :loading="loading">Continue</van-button>
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
      q_seq: [1, 4, 7, 10, 13, 16, 19, 22, 2, 5, 8, 11, 14, 17, 20, 3, 6, 9, 12, 15, 18, 21,],
      q1group: [
        {q: "I understood why the phones were recommended to me.", t: "trans1"},
        {q: "I understood how the system determined the quality of the phones.", t: "trans2"},
        {q: "I understood how well the recommendations matched my preferences.", t: "trans3"},
        {q: "I understand the underlying logic of the recommendation service.", t: "trans4"},

        {q: "This chatbot behaved like a human.", t: "cui_human1"},
        {q: "I felt like conversing with a real human when interacting with this chatbot.", t: "cui_human2"},
        {q: "This chatbot system has human properties.", t: "cui_human3"},

        {q: "I could easily use this chatbot to find phones that meet my requirements.", t: "ease1"},
        {q: "Using the chatbot to find what I like was easy.", t: "ease4"},
        {q: "Finding a phone to buy with the help of the chatbot was easy.", t: "ease5"},
        {q: "It was easy to find what I liked by using the chatbot.", t: "ease6"},

        {q: "I was convinced of the phones recommended to me.", t: "confidence1"},
        {q: " I was confident I would like the phones recommended to me.", t: "confidence2"},
        {q: "I had confidence in accepting the phones recommended to me.", t: "confidence4"},

        {q: "I was satisfied with the recommendations made by this chatbot.", t: "satis1"},
        {q: "The recommendations made by this chatbot were satisfying.", t: "satis2"},
        {q: "These recommendations made by this chatbot made me satisfied.", t: "satis3"},

        {q: "The recommendations provided by the chatbot can be trusted.", t: "trust1"},
        {q: "I can rely on the chatbot when I need to buy a mobile phone.", t: "trust2"},
        {q: "I feel I could count on the chatbot to help me purchase the mobile phone I need.", t: "trust3"},
        {
          q: "If I need to buy a mobile phone, I would be willing to rely on the information provided by the chatbot.",
          t: "trust4"
        },

        {q: 'Please respond to this question with "1".', t: "atten_chk3"},
      ],
      q1groupans: Array(22).fill(null),
    }
  },
  mounted() {
    let rand_ques = []
    this.q_seq.forEach((v) => {
      rand_ques.push(this.q1group[v - 1])
      //console.log(v,i,this.q1group[v-1])
    })
    this.q1group = rand_ques
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
          localStorage.setItem('step', '6');
          localStorage.setItem('code', res.data.msg);
          localStorage.setItem("active", new Date().getTime().toString());
          this.loading = false;
          this.$router.replace('/que4').catch((err) => {
            console.log(err.message)
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
