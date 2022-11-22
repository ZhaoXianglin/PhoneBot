<template>
  <div class="posttest">
    <van-nav-bar title="Post-Study Survey(part1)"/>
    <van-steps :active="2">
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
                  style="font-weight:600">1. How did the chatbot explain the recommended phones?</span>
              </van-col>
              <van-col span="24">
                <van-radio-group v-model="q1groupans[20]">
                  <van-radio name="1" checked-color="#ee0a24" class="item">
                    Based on the other customers’ experience
                  </van-radio>
                  <van-radio v-if="identity_cue==='1'" name="2" checked-color="#ee0a24" class="item">
                    Based on the the Susan’s experience
                  </van-radio>
                  <van-radio v-if="identity_cue==='0'" name="2" checked-color="#ee0a24" class="item">
                    Based on the the RecBot’s experience
                  </van-radio>
                  <van-radio name="3" checked-color="#ee0a24" class="item">
                    Based on the ranking in the recommendation pool
                  </van-radio>
                  <van-radio name="0" checked-color="#ee0a24" class="item">
                    No explanation is provided
                  </van-radio>
                </van-radio-group>
              </van-col>
            </van-row>
          </van-row>
        </template>
      </van-field>
<!--      <van-field :rules="[{ required: auth, message: 'required' }]" name="check2">-->
<!--        <template #input>-->
<!--          <van-row style="width: 100%;">-->
<!--            <van-row type="flex">-->
<!--              <van-col span="24"><span style="font-weight:600">2.Did the chatbot show anyone’s opinions about the recommended phones?</span>-->
<!--              </van-col>-->
<!--            </van-row>-->
<!--            <van-row type="flex" align="center" justify="between">-->
<!--              <van-col span="0" class="score_left_s" style="text-align:right;"></van-col>-->
<!--              <van-col>-->
<!--                <van-radio-group v-model="q1groupans[22]" direction="horizontal" class="matrix_table">-->
<!--                  <van-radio name="1" checked-color="#ee0a24" class="item">-->
<!--                    Yes-->
<!--                  </van-radio>-->
<!--                  &nbsp;&nbsp;&nbsp;&nbsp;-->
<!--                  <van-radio name="-1" checked-color="#ee0a24" class="item">-->
<!--                    No-->
<!--                  </van-radio>-->
<!--                  &nbsp;-->
<!--                  <van-radio name="0" checked-color="#ee0a24" class="item">-->
<!--                    Not Sure-->
<!--                  </van-radio>-->
<!--                </van-radio-group>-->
<!--              </van-col>-->
<!--              <van-col span="4"></van-col>-->
<!--            </van-row>-->
<!--          </van-row>-->
<!--        </template>-->
<!--      </van-field>-->

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
              <van-col span="24"><span style="font-weight:600">{{ index + 2 }}. {{ item.q }}</span></van-col>
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
      identity_cue: "",
      loading: false,
      st: localStorage.getItem('st'),
      auth: true,
      //q_seq: [1, 4, 7, 10, 13, 16, 19, 2, 5, 8, 11, 14, 17, 20, 3, 6, 9, 12, 15, 18, 21],
      q1group: [

        {q: "This chatbot behaved like a human.", t: "cui_human1"},
        {q: "I felt like conversing with a real human when interacting with this chatbot.", t: "cui_human2"},
        {q: "This chatbot system has human properties.", t: "cui_human3"},

        {q: "The recommended phones can meet my provided requirements.", t: "accuracy1"},
        {q: "This chatbot explains why the phones are recommended to me.", t: "explain1"},
        {q: "There is a sense of human contact on this chatbot.", t: "social_presence1"},
        {q: "The recommended phones were well-chosen.", t: "accuracy2"},
        {q: "This chatbot explained why the recommended phones could fit my preference.", t: "explain3"},
        {q: "There is a sense of personal communication on this chatbot.", t: "social_presence2"},
        {q: "The recommended phones were relevant.", t: "accuracy3"},
        {q: "This chatbot told me the reason why I received the recommended phones.", t: "explain4"},
        {q: "There is a sense of human warmth in this chatbot.", t: "social_presence4"},

        {q: "Using this chatbot to find what I like is easy.", t: "ease4"},
        {q: "This chatbot helped me find the ideal phone.", t: "useful2"},
        {q: "Finding a phone to buy with the help of this chatbot is easy.", t: "ease5"},
        {q: "Using this chatbot to find what I like is easy.", t: "useful3"},
        {q: "It was easy to find what I liked by using this chatbot.", t: "ease6"},
        {q: "Using this chatbot helps me choose a mobile phone more quickly.", t: "useful4"},

      ],
      q1groupans: Array(19).fill(null),
    }
  },
  // mounted() {
  //   let rand_ques = []
  //   this.q_seq.forEach((v) => {
  //     rand_ques.push(this.q1group[v - 1])
  //     //console.log(v, this.q1group[v - 1])
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
  mounted() {
    this.identity_cue = localStorage.getItem("identity_cue")
  }
}
</script>

<style scoped>

</style>
