<template>
  <div id="scenario">
    <van-nav-bar title="Scenario"/>
    <div id="main">
      <p v-animate-css.once="animationInfinite0">Lily recently broke her mobile phone, and she planned to buy a new one.
        Now she wants to ask you to help her
        pick three phones according to her basic requirements.</p>
      <van-image
          v-animate-css.once="animationInfinite1"
          width="100%"
          style="max-width: 960px"
          src="https://musicbot-1251052535.cos.accelerate.myqcloud.com/phonebot/scenario_1.png "
      />
      <br/>
      <ol v-animate-css.once="animationInfinite2" style="margin-top: 10px">
        <li>1. She often uses her mobile phone to watch videos.</li>
        <li>2. She hates frequently charging her mobile phone.</li>
        <li>3. Her budget for purchasing a new mobile phone is <strong>300 US </strong>dollars.</li>
      </ol>
      <br>
      <van-image
          v-animate-css.once="animationInfinite3"
          width="100%"
          style="max-width: 960px"
          src="https://musicbot-1251052535.cos.accelerate.myqcloud.com/phonebot/scenario_2.png "
      />
      <p v-animate-css.once="animationInfinite4"
      >With these preferences in mind, you begin your search for a phone by visiting a website called Phoneshop which
        can help you pick three mobile phones for Lily. To determine which phone is the best to buy, you decide to chat
        with an online chat agent who can provide recommendations.</p>

      <div style="margin: 24px 16px;padding-bottom:48px" v-animate-css.once="animationInfinite5">
        <van-button round block type="info"
                    native-type="submit" @click="start"
        >Let's Start！
        </van-button>
      </div>
    </div>
    <van-popup
        v-model="show_preference"
        position="bottom"
        :style="{width:'100%'}"
        :close-on-click-overlay="false"
        round
    >
      <van-nav-bar title='Test'/>
      <div class="phone_preference">
        <van-form @submit="submitPreference">
          <p style="padding:0 10px 0 16px; margin-bottom: 5px;">1. Who do you need to pick three mobile phones for?</p>
          <van-radio-group v-model="test1">
            <van-radio name="1">Lily</van-radio>
            <van-radio name="2">Myself</van-radio>
            <van-radio name="3">One of my friends</van-radio>
          </van-radio-group>
          <p style="padding:0 10px 0 16px; margin-bottom: 5px;">2. Which of the following items does not need to be
            considered while picking mobile phones?</p>
          <van-radio-group v-model="test2">
            <van-radio name="1">Budget</van-radio>
            <van-radio name="2">Battery</van-radio>
            <van-radio name="3">Camera</van-radio>
          </van-radio-group>
          <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit" :loading="loading" @click="next">Summit
            </van-button>
          </div>
        </van-form>
      </div>
    </van-popup>
  </div>
</template>

<script>
import {instance} from "@/request";

export default {
  name: "Scenario",
  data: function () {
    return {
      test1: '',
      test2: '',
      show_preference: false,
      lang: localStorage.getItem("lang"),
      loading: false,
      animationInfinite0: {
        classes: 'fadeIn',
        delay: 1000,
        duration: 1000,
        iteration: 1
      },
      animationInfinite1: {
        classes: 'fadeIn',
        delay: 2000,
        duration: 1000,
        iteration: 1
      },
      animationInfinite2: {
        classes: 'fadeIn',
        delay: 3000,
        duration: 1000,
        iteration: 1
      },
      animationInfinite3: {
        classes: 'fadeIn',
        delay: 4000,
        duration: 1000,
        iteration: 1
      },
      animationInfinite4: {
        classes: 'fadeIn',
        delay: 5000,
        duration: 1000,
        iteration: 1
      },
      animationInfinite5: {
        classes: 'fadeIn',
        delay: 6000,
        duration: 1000,
        iteration: 1
      },
    }
  },
  mounted: function () {
    const that = this;
    setTimeout(function () {
      that.$refs.scrollbtn.scrollIntoView({behavior: "smooth", block: "center"});
    }, 11500);
  },
  methods: {
    start: function () {
      this.test1 = '';
      this.test2 = '';
      this.show_preference = true;
    },
    next: function () {
      this.loading = true;
      if (this.test1 === '1' && this.test2 === '3') {
        instance.post('/que/scenario', {
          'uuid': localStorage.getItem("uuid"),
          'ScenarioT': new Date().getTime(),
        }).then((res) => {
          if (res.data.status === 1) {
            localStorage.setItem("active", new Date().getTime().toString());
            this.$router.replace('/assistant').catch((err) => {
              console.log(err.message)
            });
            this.loading = false;
          } else {
            this.loading = false;
            this.$toast("Please refresh this page or accept the informed consent statement first.")
          }
        }).catch((err) => {
          this.loading = false;
          console.log(err.message);
          this.$toast("Network error, please try again later.");
        })
      } else {
        this.$toast("Wrong answer, please read this page carefully!");
        this.show_preference = false
        this.loading = false
      }
    },
  }
};
</script>

<style scoped>
.phone_preference {
  padding: 0 16px;
}

#main {
  color: #2c3e50;
  background-color: white;
  padding: 10px 10px 20px 10px;
}

.card {
  text-align: center;
  padding: 20px 10px;
  margin-bottom: 5px;
  font-size: 1.4em;
  border-radius: 4px;
  border: 1px solid #ebeef5;
  background-color: #fff;
  overflow: hidden;
  color: #2c3e50;
  transition: .3s;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
}

/*.typicalWrapper::after {*/
/*  content: "|";*/
/*  animation: blink 1s infinite step-start;*/
/*}*/

/*@keyframes blink {*/
/*  50% {*/
/*    opacity: 0;*/
/*  }*/
/*}*/
</style>
