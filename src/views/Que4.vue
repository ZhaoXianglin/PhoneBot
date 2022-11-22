<template>
  <div class="posttest">
    <van-nav-bar title="Additional Post-Study Survey"/>
    <van-steps :active="3">
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
  name: "Que4",
  data: function () {
    return {
      loading: false,
      st: localStorage.getItem('st'),
      auth: true,
      q_seq: [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30],


      q1group: [
        {q: "The recommended phones were interesting.", t: "accuracy4"},
        {q: "This chatbot helped me understand why the phones were recommended to me.", t: "explain2"},
        {q: "There was a sense of sociability on this chatbot.", t: "social_presence3"},
        {q: "I could easily use this chatbot to find phones that meet my requirements.", t: "ease1"},
        {q: "This chatbot gave me good suggestions for choosing mobile phones.", t: "useful1"},


        {q: "This chatbot's responses are readable and fluent.", t: "cui_resQuali1"},
        {q: "This chatbot understands what I said.", t: "cui_unders1"},
        {q: "Most of this chatbot's responses make sense.", t: "cui_resQuali3"},
        {q: "I find that this chatbot understood what I want.", t: "cui_unders2"},
        {q: "The pace of interaction with this chatbot is appropriate.", t: "cui_interPace"},
        {q: "I felt that this chatbot understood my intentions.", t: "cui_unders3"},
        {q: "This chatbot responded to my query/request quickly.", t: "cui_response"},


        {q: "Please select \"7\" for this question.", t: "atten_chk2"},

        {q: "I understood why the phones were recommended to me.", t: "trans1"},
        {q: "I felt in control of modifying my taste using this chatbot.", t: "control1"},
        {q: "This chatbot was warm and caring.", t: "cui_positive1"},
        {q: "I understood how the system determined the quality of the phones.", t: "trans2"},
        {q: "I could control the recommendations this chatbot made for me.", t: "control4"},
        {q: "This chatbot cared about me.", t: "cui_positive2"},
        {q: "I understood how well the recommendations matched my preferences.", t: "trans3"},
        {q: "I felt in control of telling this chatbot what I wanted.", t: "control5"},
        {q: "I liked and felt warm toward this chatbot.", t: "cui_positive3"},
        {q: "I understand the underlying logic of the recommendation service.", t: "trans4"},
        {q: " I felt in control of adjusting recommendations based on my preference.", t: "control6"},
        {q: "This chatbot and I established rapport.", t: "cui_rapport2"},


        {q: "I was convinced of the phones recommended to me.", t: "confidence1"},
        {q: "I was satisfied with the recommendations made by this chatbot.", t: "satis1"},
        {q: " I was confident I would like the phones recommended to me.", t: "confidence2"},
        {q: "The recommendations made by this chatbot were satisfying.", t: "satis2"},
        {q: "I had confidence in accepting the phones recommended to me.", t: "confidence4"},
        {q: " These recommendations made by this chatbot made me satisfied.", t: "satis3"},
        {q: "This chatbot’s explanation makes me confident in making a choice.", t: "confidence5"},



      ],
      q1groupans: Array(31).fill(null),
    }
  },
  mounted() {
    // let rand_ques = []
    // this.q_seq.forEach((v) => {
    //   rand_ques.push(this.q1group[v - 1])
    //   //console.log(v,i,this.q1group[v-1])
    // })
    // this.q1group = rand_ques
  },
  methods: {
    onFailed() {
      this.$toast("You may have missed some items, please fill in.");
    },
    onSubmit: function (values) {
      this.loading = true;
      values['uuid'] = localStorage.getItem('uuid');
      values['que4T'] = new Date().getTime();
      instance.post('/que/que4', values).then((res) => {
        //console.log(res)
        if (res.data.status === 1) {
          localStorage.setItem('step', '6');
          localStorage.setItem('code', res.data.msg);
          localStorage.setItem("active", new Date().getTime().toString());
          this.loading = false;
          this.$router.replace('/success').catch((err) => {
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
