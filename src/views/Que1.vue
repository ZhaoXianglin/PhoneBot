<template>
  <div class="posttest">
    <van-nav-bar title="Post-Study Survey"/>
    <van-steps :active="0">
      <van-step>Step1</van-step>
      <van-step>Step2</van-step>
      <van-step>Step3</van-step>
      <van-step>Step4</van-step>
    </van-steps>
    <van-form @submit="onSubmit" scroll-to-error @failed="onFailed" validate-trigger="onSubmit">
      <van-field :rules="[{ required: auth, message: 'required' }]" name="check1">
        <template #input>
          <van-row style="width: 100%;">
            <van-row type="flex">
              <van-col span="24"><span
                  style="font-weight:600">1. What did the chatbot say before recommending a phone?</span>
              </van-col>
              <van-col span="24">
                <van-radio-group v-model="q1groupans[17]">
                  <van-radio name="1" checked-color="#ee0a24" class="item">
                    Showing the ranking of the phone (e.g., top 20.1%) by some features (e.g., screen size) or the comparison with the previous recommendation.
                  </van-radio>
                  <van-radio name="0" checked-color="#ee0a24" class="item">
                    General utterances, e.g., "You may like this phone" or "I find this phone for you"
                  </van-radio>
                </van-radio-group>
              </van-col>
            </van-row>
          </van-row>
        </template>
      </van-field>
            <van-field :rules="[{ required: auth, message: 'required' }]" name="check2">
              <template #input>
                <van-row style="width: 100%;">
                  <van-row type="flex">
                    <van-col span="24"><span style="font-weight:600">2.Who recommended phones to you in the previous conversation?</span>
                    </van-col>
                    <van-col span="24">
                      <van-radio-group v-model="q1groupans[18]">
                        <van-radio name="1" checked-color="#ee0a24" class="item">
                          <van-image src="https://musicbot-1251052535.cos.accelerate.myqcloud.com/phonebot/avatar2.png" width="48px">Susan</van-image>
                        </van-radio>
                        <van-radio name="0" checked-color="#ee0a24" class="item">
                          <van-image width="48px" src="https://musicbot-1251052535.cos.accelerate.myqcloud.com/phonebot/avatar1.png" >RecBot</van-image>
                        </van-radio>
                      </van-radio-group>
                    </van-col>
                  </van-row>
                </van-row>
              </template>
            </van-field>

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
              <van-col span="24"><span style="font-weight:600">{{ index + 3 }}. {{ item.q }}</span></van-col>
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
      <div v-if="explanation_style==='1'">
        <van-field v-for="(item, index) in q2group" :key="item.t" :name="item.t"
                   :rules="[{ required: auth, message: 'required' }]">
          <template #input>
            <van-row style="width: 100%;">
              <van-row type="flex">
                <van-col span="24"><span style="font-weight:600">{{ index + 19 }}. {{ item.q }}</span></van-col>
              </van-row>
              <van-row type="flex" align="center" justify="between">
                <van-col span="4" class="score_left_s" style="text-align:right;">Strongly disagree</van-col>
                <van-col>
                  <van-radio-group v-model="q2groupans[index]" direction="horizontal" class="matrix_table">
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
      </div>
      <div style="margin: 36px;">
        <van-button round block type="info" native-type="submit" :loading="loading">Continue</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import {instance} from "@/request";

export default {
  name: "Que1",
  data: function () {
    return {
      explanation_style: "",
      loading: false,
      st: localStorage.getItem('st'),
      auth: true,
      q_seq: [1, 4, 7, 10, 13, 16, 2, 5, 8, 11, 14, 17, 3, 6, 9, 12, 15],
      q1group: [
        {q: "The objective(s) of the purchase decision were clear to me.", t: "interlligence1"},
        {q: "It was easy for me to get relevant quantitative (price, screen size, etc.) information needed to make the purchase.", t: "interlligence2"},
        {q: "It was easy for me to get relevant qualitative (quality, usefulness, etc.) information needed to make the purchase.", t: "interlligence3"},

        {q: "I believe it was possible to identify various mobile phone candidates.", t: "design1"},
        {q: "It was easy for me to establish criteria (such as price and screen size) to make the purchase decision.", t: "design2"},
        {q: "With the information I had, I was able to narrow down my choices.", t: "design3"},

        {q: "I believe that it was possible for me to evaluate the various mobile phones.", t: "choice1"},
        {q: "Evaluation of the various mobile phones did not take me very long.", t: "choice2"},
        {q: "It was an easy decision to pick the best mobile phone.", t: "choice3"},

        {q: "I felt in control of modifying my taste using this chatbot.", t: "control1"},
        {q: "I could control the recommendations this chatbot made for me.", t: "control4"},
        {q: "I felt in control of telling this chatbot what I wanted.", t: "control5"},
        {q: "I felt in control of adjusting recommendations based on my preference.", t: "control6"},

        {q: "This chatbot understands what I said.", t: "cui_unders1"},
        {q: "I find that this chatbot understood what I want.", t: "cui_unders2"},
        {q: "I felt that this chatbot understood my intentions.", t: "cui_unders3"},

        {q: 'Please respond to this question with "5".', t: "atten_chk1"},
      ],
      q1groupans: Array(19).fill(null),

      q2group: [
        {q: "This explanation makes me confident that I will like the recommendation.", t: "eva_exp1"},
        {q: "This explanation makes the recommendation process clear to me.", t: "eva_exp2"},
        {q: "This explanation for the recommendation is convincing.", t: "eva_exp3"},
      ],
      q2groupans: Array(3).fill(null),
    }
  },
  mounted() {
    this.explanation_style = localStorage.getItem("explanation_style")
    let rand_ques = []
    this.q_seq.forEach((v) => {
      rand_ques.push(this.q1group[v - 1])
      //console.log(v, this.q1group[v - 1])
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
      values['que1T'] = new Date().getTime();
      instance.post('/que/que1', values).then((res) => {
        //console.log(res)
        if (res.data.status === 1) {
          localStorage.setItem('step', '3');
          localStorage.setItem("active", new Date().getTime().toString());
          this.loading = false;
          this.$router.replace('/que2').catch((err) => {
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
  },

}
</script>

<style scoped>

</style>
