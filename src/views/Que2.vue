<template>
  <div class="posttest">
    <van-nav-bar title="Post-Study Survey(part2)"/>
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
  name: "Que2",
  data: function () {
    return {
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

        {q: "This chatbot was interested in what I was saying.", t: "cui_attentive2"},
        {q: "This chatbot tried to know more about my needs.", t: "cui_attentive5"},
        {q: "This chatbot paid attention to what I was saying.", t: "cui_attentive6"},
        {q: "This chatbot was respectful to me and considered my needs.", t: "cui_attentive7"},
        {q: 'Please respond to this question with "2".', t: "atten_chk1"},
        {q: "Given a chance, I predict that I would consider buying the phones recommended by this chatbot in the near future.", t: "intent2purchase1"},
        {q: "I will likely buy the phones recommended by this chatbot in the near future.", t: "intent2purchase2"},
        {q: "Given the opportunity, I intend to buy the phones recommended by this chatbot.", t: "intent2purchase3"},
      ],
      q1groupans: Array(21).fill(null),
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
      values['que2T'] = new Date().getTime();
      instance.post('/que/que2', values).then((res) => {
        //console.log(res)
        if (res.data.status === 1) {
          localStorage.setItem('step', '4');
          localStorage.setItem("active", new Date().getTime().toString());
          this.loading = false;
          this.$router.replace('/que3').catch((err) => {
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
