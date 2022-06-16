<template>
  <div class="posttest">
    <van-nav-bar title="Post-Study Survey"/>
    <van-steps :active="2">
      <van-step>Step1</van-step>
      <van-step>Step2</van-step>
      <van-step>Step3</van-step>
      <van-step>Step4</van-step>
    </van-steps>
    <van-form @submit="onSubmit" scroll-to-error @failed="onFailed" validate-trigger="onSubmit">
      <p style="padding:0 10px;font-weight:bold;text-align: left">How much do you agree or disagree with the following
        statements?</p>
      <p style="padding:0 10px;font-weight:normal; text-align: left;font-size: 14px">Strongly disagree(1), Disagree(2), Somewhat
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
  name: "Que1",
  data: function () {
    return {
      loading: false,
      st: localStorage.getItem('st'),
      auth: true,
      q_seq: [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34, 2, 5, 8, 11, 14, 35, 17, 20, 23, 26, 29, 32, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33],
      q1group: [
        {q: "The phones recommended to me matched my interests.", t: "accuracy1"},
        {q: "The recommended phones were well-chosen.", t: "accuracy2"},
        {q: "The recommended phones were relevant.", t: "accuracy3"},

        {q: "The chatbot explains why the phones are recommended to me.", t: "explain1"},
        {q: "The system helps me understand why the phones were recommended to me.", t: "explain2"},
        {q: "The system does not show any information for explaining the recommended phones.", t: "explain3"},

        {q: "The chatbot was interested in what I was saying.", t: "cui_attentive2"},
        {q: "The chatbot tries to know more about me.", t: "cui_attentive5"},
        {q: "The chatbot ignores what I am saying.", t: "cui_attentive6"},

        {q: "The chatbot understands what I said.", t: "cui_unders1"},
        {q: "I find that the chatbot understood what I want.", t: "cui_unders2"},
        {q: "I felt that the chatbot understood my intentions.", t: "cui_unders3"},

        {q: "The chatbot responded to my query/request quickly.", t: "cui_response"},
        {q: "The chatbot's responses are readable and fluent.", t: "cui_resQuali1"},
        {q: "Most of the chatbot's responses make sense.", t: "cui_resQuali3"},
        {q: "The pace of interaction with the chatbot is appropriate.", t: "cui_interPace"},

        {q: "There is a sense of human contact on this chatbot.", t: "social_presence1"},
        {q: "There is a sense of personal communication on this chatbot.", t: "social_presence2"},
        {q: "There is a sense of sociability on this chatbot.", t: "social_presence3"},
        {q: "There is a sense of human warmth in this chatbot.", t: "social_presence4"},

        {q: "I understood why the phones were recommended to me.", t: "trans1"},
        {q: "I understood how the system determined the quality of the phones.", t: "trans2"},
        {q: "I understood how well the recommendations matched my preferences.", t: "trans3"},

        {q: "I feel in control of modifying my taste using this chatbot.", t: "control1"},
        {q: "I don't feel in control of changing my preferences.", t: "control4"},
        {q: "I feel in control of telling the recommender what I want.", t: "control5"},

        {q: "The chatbot was warm and caring.", t: "cui_positive1"},
        {q: "The chatbot cared about me.", t: "cui_positive2"},
        {q: "I liked and felt warm toward the chatbot.", t: "cui_positive3"},
        {q: "I felt that I had no connection with the chatbot.", t: "cui_rapport1"},
        {q: "The chatbot and I established rapport.", t: "cui_rapport2"},

        {q: "The chatbot behaves like a human.", t: "cui_human1"},
        {q: "I feel like to converse with a real human when I interact with this chatbot.", t: "cui_human2"},
        {q: "This chatbot system has human properties.", t: "cui_human3"},

        {q: 'Please respond to this question with "2".', t: "chk1"}
      ],
      q1groupans: Array(38).fill(null),
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
      values['page3T'] = new Date().getTime();
      instance.post('/api/page3', values).then((res) => {
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
  }
}
</script>

<style scoped>

</style>
