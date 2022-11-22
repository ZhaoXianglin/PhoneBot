<template>
  <div class="demographic">
    <van-nav-bar title="Questionnaire"/>
    <van-steps :active="0">
      <van-step>Step1</van-step>
      <van-step>Step2</van-step>
      <van-step>Step3</van-step>
      <van-step>Step4</van-step>
    </van-steps>
    <p style="padding-left: 10px;font-weight:bolder">Personal Information：</p>
    <van-form @submit="onSubmit" @failed="onFailed" scroll-to-error validate-trigger="onSubmit">

      <van-field name="prolific_id" v-model="prolific_id" type="text" label="Prolific ID" required
                 placeholder="your unique Prolific ID."
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

<!--      <p style="padding-left: 10px;font-weight:bolder">How much do you agree or disagree with the following statements?-->
<!--        Please rate the following statements based on your personal characteristics and opinions.</p>-->
<!--      <p style="padding:0 10px;font-weight:normal; text-align: left;font-size: 14px">Strongly disagree(1), Disagree(2),-->
<!--        Somewhat-->
<!--        disagree(3), Neutral(4), Somewhat agree(5), Agree(6), Strongly agree(7)</p>-->
<!--      <van-field v-for="(item, index) in q1group" :key="item.t" :name="item.t"-->
<!--                 :rules="[{ required: auth, message: 'required' }]">-->
<!--        <template #input>-->
<!--          <van-row style="width: 100%;">-->
<!--            <van-row type="flex">-->
<!--              <van-col span="24"><span style="font-weight:600">{{ index + 1 }}. {{ item.q }}</span></van-col>-->
<!--            </van-row>-->
<!--            <van-row type="flex" align="center" justify="between">-->
<!--              <van-col span="4" class="score_left_s" style="text-align:right;">Strongly disagree</van-col>-->
<!--              <van-col>-->
<!--                <van-radio-group v-model="q1groupans[index]" direction="horizontal" class="matrix_table">-->
<!--                  <van-radio :name="val" v-for="val in 7" :key="val" checked-color="#ee0a24" class="item">-->
<!--                    {{ val }}-->
<!--                  </van-radio>-->
<!--                </van-radio-group>-->
<!--              </van-col>-->
<!--              <van-col span="4">Strongly agree</van-col>-->
<!--            </van-row>-->
<!--          </van-row>-->
<!--        </template>-->
<!--      </van-field>-->

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
      prolific_id: "",
      age_items: ['18-24', '25-34', '35-44', '45-54', '55-64', '65 and over'],
      nationality: "",
      showPicker1: false,
      showPicker2: false,
      q1group: [
        {q: "I usually trust people until they give me a reason not to trust them.", t: "trust_propensity1"},
        {q: "Trusting another person is not difficult for me.", t: "trust_propensity2"},
        {q: "My tendency to trust others is high.", t: "trust_propensity3"},
        {q: "I am familiar with service chatbots (e.g., customer service chatbots).", t: "ce1"},
        {q: "In general, I feel comfortable when chatting with service chatbots.", t: "ce2"},
        {q: "I tend to trust the information provided by service chatbots.", t: "ce3"},
      ],
      q1groupans: Array(6).fill(null),
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
          this.$router.replace('/scenario')
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
