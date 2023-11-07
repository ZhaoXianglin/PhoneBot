<template>
  <div id="scenario">
    <van-nav-bar title="Scenario"/>
    <div id="main">
      <p v-animate-css.once="animationInfinite0">Imagine that your mobile phone was recently broken, and you are now
        contemplating the purchase of a replacement.
      </p>

      <p v-animate-css.once="animationInfinite1">Your budget for purchasing a new mobile phone is <strong>300
        US </strong> dollars.
      </p>
      <van-image
          v-animate-css.once="animationInfinite2"
          width="80%"
          style="max-width: 960px; margin: 10px"
          src="https://musicbot-1251052535.cos.accelerate.myqcloud.com/phonebot/budget.png"
      />
      <br>
      <p v-animate-css.once="animationInfinite3">With the preferences in mind, you begin your search for mobile phones
        by visiting a website called <b>Phoneshop</b>, where a chatbot can recommend mobile phones based on your
        requirements. Please take a look at at least five mobile phones. </p>

      <div style="margin: 24px 16px;padding-bottom:48px" v-animate-css.once="animationInfinite4">
        <van-button round block type="info"
                    native-type="submit" @click="start"
        > I am ready to start
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
      <van-nav-bar title='Quiz'/>
      <div class="phone_preference">
        <van-form>
          <p style="padding:0 10px 0 16px; margin-bottom: 5px;">1. You should view <b>at least ____</b> recommended
            mobile phones?</p>
          <van-radio-group v-model="test3">
            <van-radio name="1">4</van-radio>
            <van-radio name="2">5</van-radio>
            <van-radio name="3">6</van-radio>
          </van-radio-group>
          <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit" :loading="loading" @click="next">Submit
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
      test3: '',
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
        delay: 4000,
        duration: 1000,
        iteration: 1
      },
      animationInfinite2: {
        classes: 'fadeIn',
        delay: 5000,
        duration: 1000,
        iteration: 1
      },
      animationInfinite3: {
        classes: 'fadeIn',
        delay: 7000,
        duration: 1000,
        iteration: 1
      },
      animationInfinite4: {
        classes: 'fadeIn',
        delay: 8000,
        duration: 1000,
        iteration: 1
      },
      animationInfinite5: {
        classes: 'fadeIn',
        delay: 10000,
        duration: 1000,
        iteration: 1
      },
      animationInfinite6: {
        classes: 'fadeIn',
        delay: 11000,
        duration: 1000,
        iteration: 1
      },
      animationInfinite7: {
        classes: 'fadeIn',
        delay: 13000,
        duration: 1000,
        iteration: 1
      },
      animationInfinite8: {
        classes: 'fadeIn',
        delay: 14000,
        duration: 1000,
        iteration: 1
      },
      animationInfinite9: {
        classes: 'fadeIn',
        delay: 15000,
        duration: 1000,
        iteration: 1
      },
    }
  },
  methods: {
    start: function () {
      this.test1 = '';
      this.test2 = '';
      this.test3 = '';
      this.show_preference = true;
    },
    next: function () {
      this.loading = true;
      if (this.test3 === '2') {
        instance.post('/que/scenario', {
          'uuid': localStorage.getItem("uuid"),
          'ScenarioT': new Date().getTime(),
        }).then((res) => {
              if (res.data.status === 1) {
                localStorage.setItem("active", new Date().getTime().toString());
                if (self.localStorage.getItem('explanation_style') === '1') {
                  this.$router.replace('/massistant').catch((err) => {
                    console.log(err.message)
                  });
                } else {
                  this.$router.replace('/sassistant').catch((err) => {
                    console.log(err.message)
                  });
                }
                this.loading = false;
              } else {
                this.loading = false;
                this.$toast("Please refresh this page or accept the informed consent statement first.")
              }
            }
        ).catch((err) => {
          this.loading = false;
          console.log(err.message);
          this.$toast("Network error, please try again later.");
        })
      } else {
        this.$toast("Wrong answer, please read this page carefully!");
        this.show_preference = false
        this.loading = false
      }
    }
    ,
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
  margin: 10px;
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
