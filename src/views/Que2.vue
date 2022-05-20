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
      <p style="padding:0 10px;font-weight:normal; text-align: left">Strongly disagree(1), Disagree(2), Somewhat
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
        <van-button round block type="info" native-type="submit" :loading="loading">Submit</van-button>
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
      q_seq: [1, 4, 7, 10, 13, 16, 19, 22, 2, 5, 8, 11, 14, 17, 20, 3, 6, 9, 12, 15, 18, 21],
      q1group: [

        {q: "The chatbot gave me good suggestions.", t: "useful1"},
        {q: "The chatbot helped me find the ideal phone.", t: "useful2"},
        {q: "Using the chatbot to find what I like is easy.", t: "useful3"},

        {q: "I easily found the phones I was looking for.", t: "ease1"},
        {q: "Using the recommender to find what I like is easy.", t: "ease4"},
        {q: "Finding a phone to buy with the help of the recommender is easy.", t: "ease5"},

        {q: "This chatbot can be trusted.", t: "trust1"},
        {q: "I can always rely on the chatbot whenever I need to buy a mobile phone.", t: "trust2"},
        {q: "I feel that I could count on the chatbot to help me purchase the mobile phone I need.", t: "trust3"},
        {
          q: "If I need to buy a mobile phone, I would be willing to rely on the information provided by the chatbot.",
          t: "trust4"
        },

        {q: "I am convinced of the phones recommended to me.", t: "confidence1"},
        {q: "I am confident I will like the phones recommended to me.", t: "confidence2"},
        {q: "I have confidence in accepting the phones recommended to me.", t: "confidence4"},

        {q: "Overall, I am satisfied with this chatbot.", t: "satis1"},
        {q: "This chatbot is satisfying.", t: "satis2"},
        {q: "This chatbot makes me satisfied.", t: "satis3"},

        {q: "I will use this chatbot again.", t: "intent1"},
        {q: "I will use this chatbot frequently.", t: "intent2"},
        {q: "I will tell my friends about this chatbot.", t: "intent3"},

        {
          q: "Given a chance, I predict that I would consider buying the phones recommended by the chatbot in the near future.",
          t: "intent2purchase1"
        },
        {q: "I will likely buy the phones recommended by the chatbot in the near future.", t: "intent2purchase2"},
        {q: "Given the opportunity, I intend to buy the phones recommended by the chatbot.", t: "intent2purchase3"},

      ],
      q1groupans: Array(35).fill(null),
    }
  },
  mounted() {
    let rand_ques = []
    this.q_seq.forEach((v) => {
      rand_ques.push(this.q1group[v-1])
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
      values['page4T'] = new Date().getTime();
      instance.post('/api/page4', values).then((res) => {
        //console.log(res)
        if (res.data.status === 1) {
          localStorage.setItem('step', '4');
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
