<template>
  <div class="posttest">
    <van-nav-bar title="Post-Study Survey"/>
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
  name: "Que1",
  data: function () {
    return {
      explanation_style: "",
      loading: false,
      st: localStorage.getItem('st'),
      auth: true,
      q_seq: [1, 4, 7, 10, 13, 2, 5, 8, 11, 14, 3, 6, 9, 12, 15],
      q1group: [
        {
          q: "How mentally demanding was the task?",
          t: "cognitive1"
        },
        {q: "How physically demanding was the task?", t: "cognitive2"},
        {q: "How hurried or rushed was the pace of the task?", t: "cognitive3"},

        {q: "How successful were you in accomplishing what you were asked to do?", t: "cognitive4"},
        {q: "How hard did you have to work to accomplish your level of performance?", t: "cognitive5"},
        {q: "How insecure, discouraged, irritated, stressed, and annoyed were you?", t: "cognitive6"},
        {q: "Using the system, I could identify appropriate options.", t: "confidence1"},
        {q: "I feel sure about the decision I made.", t: "confidence2"},
        {q: "My choice, from the moment I've used the system and now, have not changed.", t: "confidence3"},
      ],
      q1groupans: Array(9).fill(null),
    }
  },
  mounted() {
    this.explanation_style = localStorage.getItem("explanation_style")
    let rand_ques = []
    this.q_seq.forEach((v) => {
      rand_ques.push(this.q1group[v - 1])
      //console.log(v, this.q1group[v - 1])
    })
    //this.q1group = rand_ques
  },
  methods: {
    onFailed() {
      this.$toast("You may have missed some items, please fill in.");
    },
    onSubmit: function (values) {
      this.loading = true;
      values['uuid'] = localStorage.getItem('uuid');
      values['postT'] = new Date().getTime();
      instance.post('/que/post_table', values).then((res) => {
        //console.log(res)
        if (res.data.status === 1) {
          localStorage.setItem('step', '3');
          localStorage.setItem("active", new Date().getTime().toString());
          this.loading = false;
          this.$router.replace('/list').catch((err) => {
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
