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
      <van-field name="gender" label="Gender" required :rules="[{ required: auth, message: 'Please select this item.' }]">
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
      <van-field name="nationality" v-model="nationality" type="text" label="Nationality" required placeholder="nationality"
                 :rules="[{ required: auth, message: 'Please enter this item.' }]"/>

      <div style="margin: 36px;">
        <van-button round block type="info" native-type="submit" :loading="loading">Continue</van-button>
      </div>
    </van-form>

  </div>
</template>

<script>
import {instance} from '../request';

export default {
  name: "Prestudy",
  data: function () {
    return {
      loading: false,
      auth: true,
      gender: "",
      age:"",
      age_items: ['18-24', '25-34', '35-44', '45-54', '55-64', '65 and over'],
      nationality:"",
      showPicker1: false,
      showPicker2: false,

      q2groupans: Array(6).fill(null),
    }
  },
  methods: {
    onSubmit(values) {
      this.loading = true;
      values['uuid'] = localStorage.getItem('uuid');
      values['page1T'] = new Date().getTime();
      instance.post('/api/page1', values).then((res) => {
        //console.log(res)
        if (res.data.status === 1) {
          localStorage.setItem('step', '1');
          localStorage.setItem("active", new Date().getTime().toString());
          this.loading = false;
          if(localStorage.getItem('condition')==='1'){
            this.$router.replace('/chatbot').catch((err) => {
              console.log(err.message)
            });}
          if(localStorage.getItem('condition')==='2'){
            this.$router.replace('/chatbotexp').catch((err) => {
              console.log(err.message)
            });}
          if(localStorage.getItem('condition')==='3'){
            this.$router.replace('/chatbotexpava').catch((err) => {
              console.log(err.message)
            });}
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
    onFailed (){
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
