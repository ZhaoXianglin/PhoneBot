<template>
  <div class="demographic">
    <van-nav-bar title="Questionnaire"/>
    <p style="padding-left: 10px;font-weight:bolder">Personal Information：</p>
    <van-form @submit="onSubmit" @failed="onFailed" scroll-to-error validate-trigger="onSubmit">

      <van-field name="prolific_id" v-model="prolific_id" type="text" label="Random ID" required
                 placeholder="Please don't change this ID." readonly
                 :rules="[{ required: auth, message: 'Please enter this item.' }]"/>
      <van-field name="gender" label="Gender" required
                 :rules="[{ required: auth, message: 'Please select this item.' }]">
        <template #input>
          <van-radio-group v-model="gender" direction="horizontal">
            <van-radio checked-color="#ee0a24" name="Male"> Male</van-radio>
            <van-radio checked-color="#ee0a24" name="Female"> Female</van-radio>
            <van-radio checked-color="#ee0a24" name="Other"> Other</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field
          readonly
          clickable
          required
          :rules="[{ required: auth, message: 'Please select this item.' }]"
          name="age"
          :value="age"
          label="Age"
          placeholder="Age Range"
          @click="showPicker1 = true"
      />
      <van-popup v-model="showPicker1" position="bottom">
        <van-picker
            show-toolbar
            :columns="age_items"
            @confirm="onConfirm1"
            confirm-button-text="Confirm"
            cancel-button-text="Cancel"
            @cancel="showPicker1 = false"
        />
      </van-popup>
      <van-field name="nationality" v-model="nationality" type="text" label="Nationality" required
                 placeholder="nationality"
                 :rules="[{ required: auth, message: 'Please enter this item.' }]"/>

      <p style="padding-left: 10px;font-weight:bolder">How much do you agree or disagree with the following statements?
        Please rate the following statements based on your personal characteristics and opinions.</p>
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
import {instance} from '@/request';

export default {
  name: "Prestudy",
  data: function () {
    return {
      loading: false,
      auth: true,
      gender: "",
      age: "",
      prolific_id: localStorage.getItem('uuid').substr(0, 8),
      age_items: ['18-24', '25-34', '35-44', '45-54', '55-64', '65 and over'],
      nationality: "",
      showPicker1: false,
      showPicker2: false,
      q1group: [
        {
          q: "When I am in the car listening to the radio, I often check other stations to see if something better is playing, even if I’m relatively satisfied with what I’m listening to.",
          t: "maximizer1"
        },
        {q: "I often find it difficult to shop for a gift for a friend.", t: "maximizer2"},
        {q: "No matter what I do, I have the highest standards for myself.", t: "maximizer3"},

        {q: "I understand technical specifications of mobile phones.", t: "domain1"},
        {q: "I know how to choose a mobile based on my preference.", t: "domain2"},
        {q: "I can easily make a purchase choice based on technical specifications of mobile phones.", t: "domain3"},

        {q: "I procrastinate when it comes to making important decisions.", t: "decision1"},
        {q: "I need the assistance of other people when making important decisions.", t: "decision2"},
        {q: "I feel confident about my ability to make decisions.", t: "decision3"},
        {q: "I feel as if I’m under tremendous time pressure when making decisions.", t: "decision4"},
        {q: "When making decisions I like to collect lots of information.", t: "decision5"},
        {q: "I make impulsive decisions.", t: "decision6"},
        {q: "When making decisions, I rely upon my instincts.", t: "decision7"},
        {q: "My friends or family seek my advice when they have to make important decisions.", t: "decision8"},
        {
          q: "Whenever I make a choice, I try to get information about how the other alternatives turned out.",
          t: "decision9"
        },
      ],
      q1groupans: Array(15).fill(null),
    }
  },
  methods: {
    onSubmit(values) {
      this.loading = true;
      values['uuid'] = localStorage.getItem('uuid');
      values['page1T'] = new Date().getTime();
      instance.post('/que/pre1', values).then((res) => {
        //console.log(res)
        if (res.data.status === 1) {
          localStorage.setItem('step', '1');
          localStorage.setItem("active", new Date().getTime().toString());
          this.loading = false;
          this.$router.replace('/step2')
        } else {
          this.loading = false;
          this.$toast("Please read and accept the informed consent first.")
        }
      }).catch((err) => {
        console.log(err.message);
        this.loading = false;
        this.$toast("Network error, please try again.");
      })
    },
    onFailed() {
      this.$toast("You may have missed some items, please fill in.");
    },
    onConfirm1(value) {
      this.age = value;
      this.showPicker1 = false;
    },
  },
}
</script>

<style>
.matrix_table {
  justify-content: center;
  flex-wrap: nowrap !important;
  padding: 0 12px;
}

.matrix_table .item {
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
  align-items: center;
  margin-right: 8px !important;
}

.matrix_table .van-radio__label {
  margin-left: 0;
}

@media only screen and (min-width: 425px) {
  .score_left {
    width: 70px !important;
  }

  .score_left_ss {
    width: 39px !important;
  }
}
</style>
