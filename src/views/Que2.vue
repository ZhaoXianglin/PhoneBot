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
      q1group:[
        {q: "I easily found the phones I was looking for.", t: "ease1"},
        {q: "Looking for a phone using this interface required too much effort.", t: "ease2"},
        {q: "I became familiar with the phone chatbot very quickly.", t: "ease3"},
        {q: "The phone chatbot explains why the products are recommended to me.", t: "explain1"},
        {q: "The system helps me understand why the phones were recommended to me.", t: "explain2"},
        {q: "The system does not show any information for explaining the recommended phones.", t: "explain3"},
        {q: "I found it easy to inform the phone chatbot if I dislike/like the recommended phone.", t: "ia1"},
        {q: "The phone chatbot allows me to tell what I like/dislike.", t: "ia2"},
        {q: "I found it easy to tell the system what I like/dislike. (It is easy to tell the chatbot what I want.)", t: "ia3"},
        {q: "I will use this phone chatbot again.", t: "intent1"},
        {q: "I like to give feedback on the phone I am listening.", t: "intent2"},
        {q: "I will use this phone chatbot frequently.", t: "intent3"},
        {q: "I will tell my friends about this phone chatbot.", t: "intent4"},
        {q: "I would buy the items recommended, given the opportunity", t: "intent2purchase1"},
        {q: "I would buy the items recommended, given the opportunity", t: "intent2purchase2"},
        {q: "I would buy the items recommended, given the opportunity", t: "intent2purchase3"},

        {q: "The phones recommended to me are novel.", t: "novel1"},
        {q: "The phone chatbot helped me discover new phones.", t: "novel2"},
        {q: "Overall, I am satisfied with this phone chatbot.", t: "satis1"},
        {q: "I like the phones I’ve chosen.", t: "satis2"},
        {q: "I was excited about my chosen phones.", t: "satis3"},
        {q: "I would recommend the chosen phones to others.", t: "satis4"},
        {q: "The phone chatbot provided me with surprising recommendations that helped me discover new phone that I wouldn’t have found elsewhere.", t: "seren1"},
        {q: "The phone chatbot provided me with recommendations that I had not considered in the first place but turned out to be a positive and surprising discovery.", t: "seren2"},
        {q: "The phone chatbot provided me with recommendations that were a pleasant surprise to me because I would not have discovered them somewhere else.", t: "seren3"},
        {q: "I understood why the phones were recommended to me.", t: "trans1"},
        {q: "The recommendation logic behind the system is unclear to me.", t: "trans2"},
        {q: "I have no clue why I receive the recommended phones.", t: "trans3"},
        {q: "This phone chatbot can be trusted.", t: "trust1"},
        {q: "I am convinced of the items recommended to me.", t: "trust3"},
        {q: "I am confident I will like the items recommended to me.", t: "trust4"},
        {q: "The phone chatbot made me more confident about my selection/decision.", t: "trust5"},
        {q: "The phone chatbot gave me good suggestions.", t: "useful1"},
        {q: "The phone chatbot helped me find the ideal item.", t: "useful2"},
        {q: "Using the phone chatbot to find what I like is easy.", t: "useful3"},

      ],
      q1groupans: Array(35).fill(null),
    }
  },

  methods: {
    onFailed (){
      this.$toast("You may have missed some items, please fill in.");
    },
    onSubmit: function (values) {
      this.loading = true;
      values['uuid'] = localStorage.getItem('uuid');
      values['page4T'] = new Date().getTime();
      instance.post('/api/posttest2', values).then((res) => {
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
