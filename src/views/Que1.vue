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
      <p style="padding:0 10px;font-weight:bold;text-align: left">How much do you agree or disagree with the following statements?</p>
      <p style="padding:0 10px;font-weight:normal; text-align: left">Strongly disagree(1), Disagree(2), Somewhat disagree(3), Neutral(4), Somewhat agree(5), Agree(6), Strongly agree(7)</p>
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
      q1group:[
        {q: "The phones recommended to me matched my interests.", t: "accuracy1"},
        {q: "The recommended items were well-chosen.", t: 'accuracy2'},
        {q: "The recommended items were relevant.", t: "accuracy3" },
        {q: "I feel in control of modifying my taste using this phone chatbot.", t: 'control1'},
        {q: "The phone chatbot allows me to modify my taste profile.", t: "control2"},
        {q: "I found it easy to modify my taste profile in the phone chatbot.", t: 'control3'},
        {q: "The phone chatbot adapted continuously to my preferences.", t: "cui_adapt1" },
        {q: "I always had the feeling that this phone chatbot learns my preferences.", t: 'cui_adapt2'},
        {q: "The phone chatbot was respectful to me and considered my concerns.", t: 'cui_attentive1'},
        {q: "The phone chatbot was interested in what I was saying.", t: "cui_attentive2"},
        {q: "I was not really interested in what the phone chatbot was saying.", t: 'cui_attentive3'},
        {q: "I felt that the phone chatbot was paying attention to what I was saying.", t: 'cui_attentive4'},
        {q: "The phone chatbot tries to know more about me. ", t: 'cui_attentive5'},
        {q: "I am able to say everything I want to say during the conversation.", t: 'cui_coord1'},
        {q: "I felt uncomfortable and could not say everything that I wanted to say.", t: 'cui_coord2'},
        {q: "The interaction was frustrating.", t: 'cui_coord3'},
        {q: "I felt I was in sync with the phone chatbot.", t: 'cui_coord4'},
        {q: "I feel it is entertaining and interesting to engage in a dialogue with this phone chatbot.", t: 'cui_engage1'},
        {q: "I enjoy talking to this phone chatbot.", t: 'cui_engage2'},
        {q: "The phone chatbot behaves like a human.", t: 'cui_human1'},
        {q: "The phone chatbot behaves like a human.", t: 'cui_human2'},
        {q: "The phone chatbot behaves like a human.", t: 'cui_human3'},
        {q: "The phone chatbot worked the way I expected it to in this conversation.", t: 'cui_ia_exp'},
        {q: "In this conversation, I knew what I could say or do at each point of the dialog.", t: 'cui_ia_expertise'},
        {q: "I found the phone chatbot easy to understand in this conversation.", t: 'cui_ia_unders'},
        {q: "The pace of interaction with the phone chatbot is appropriate.", t: 'cui_interPace'},
        {q: "The phone chatbot was warm and caring.", t: 'cui_positive1'},
        {q: "The phone chatbot cared about me.", t: 'cui_positive2'},
        {q: "I liked and felt warm toward the phone chatbot.", t: 'cui_positive3'},
        {q: "The phone chatbot was friendly to me.", t: 'cui_positive4'},
        {q: "I felt that I had no connection with the phone chatbot.", t: 'cui_rapport1'},
        {q: "The phone chatbot and I established rapport.", t: 'cui_rapport2'},
        {q: "I felt rapport between this phone chatbot and myself.", t: 'cui_rapport3'},
        {q: "The phone chatbot responded to my query/request quickly.", t: 'cui_response'},
        {q: "The phone chatbot's responses are readable and fluent.", t: 'cui_resQuali1'},
        {q: "The phone chatbot's responses are informative.", t: 'cui_resQuali2'},
        {q: "Most of the chatbot's responses make sense.", t: 'cui_resQuali3'},
        {q: "The phone chatbot understands what I said.", t: 'cui_unders'},
      ],
      q1groupans: Array(38).fill(null),
    }
  },

  methods: {
    onFailed (){
      this.$toast("You may have missed some items, please fill in.");
    },
    onSubmit: function (values) {
      this.loading = true;
      values['uuid'] = localStorage.getItem('uuid');
      values['page3T'] = new Date().getTime();
      instance.post('/api/posttest1', values).then((res) => {
        //console.log(res)
        if (res.data.status === 1) {
          localStorage.setItem('step', '6');
          localStorage.setItem("active", new Date().getTime().toString());
          this.loading = false;
          this.$router.replace('/tip6').catch((err) => {
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
