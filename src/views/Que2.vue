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
      q_seq: [1, 4, 7, 10, 13, 16, 19, 2, 5, 8, 11, 14, 17, 3, 6, 9, 12, 15, 18],
      q1group: [
        {q: "The chatbot was interested in what I was saying.", t: "cui_attentive2"},
        {q: "This chatbot is like a real expert in assessing mobile phones.", t: "trust_compe1"},
        {q: "This chatbot provides unbiased product recommendations.", t: "trust_integity1"},
        {q: "The chatbot tried to know more about my needs.", t: "cui_attentive5"},
        {q: "This chatbot considers my needs and all important attributes of mobile phones.", t: "trust_compe3"},
        {q: "This chatbot is honest.", t: "trust_integity2"},
        {q: "The chatbot paid attention to what I was saying.", t: "cui_attentive6"},
        {q: "This chatbot has good knowledge about mobile phones.", t: "trust_compe4"},
        {q: "This chatbot is truthful when conversing with me.", t: "trust_integity3"},
        {q: "The chatbot was respectful to me and considered my needs.", t: "cui_attentive7"},
        {q: 'Please respond to this question with "2".', t: "atten_chk1"},


        {
          q: "When I need to buy a mobile phone, I would feel comfortable depending on the information provided by this chatbot.",
          t: "intent2depend1"
        },
        {q: "If I need to choose a mobile phone, I would want to use this chatbot again.", t: "intent2follow1"},
        {
          q: "Given a chance, I predict that I would consider buying the phones recommended by the chatbot in the near future.",
          t: "intent2purchase1"
        },
        {q: "I can always rely on this chatbot for choosing a mobile phone.", t: "intent2depend2"},
        {q: "I would not hesitate to use the recommendations this chatbot supplied me.", t: "intent2follow2"},
        {q: "I will likely buy the phones recommended by the chatbot in the near future.", t: "intent2purchase2"},
        {q: "I feel that I could count on this chatbot to help with picking out a mobile phone.", t: "intent2depend3"},
        {q: "I would confidently follow the recommendations provided by this chatbot.", t: "intent2follow3"},
        {q: "Given the opportunity, I intend to buy the phones recommended by the chatbot.", t: "intent2purchase3"},
      ],
      q1groupans: Array(20).fill(null),
    }
  },
  // mounted() {
  //   let rand_ques = []
  //   this.q_seq.forEach((v) => {
  //     rand_ques.push(this.q1group[v - 1])
  //     //console.log(v,i,this.q1group[v-1])
  //   })
  //   this.q1group = rand_ques
  // },
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
