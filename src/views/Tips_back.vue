<template>
  <div id="tips">
    <van-nav-bar title="Tips"/>
    <div id="main">
      <van-image
          round
          v-animate-css.once="animationInfinite0"
          width="10rem"
          height="10rem"
          :src="require('../assets/imgs/person2.png')"
      />
      <typical
          class="typicalWrapper"
          :steps="type_content"
          v-animate-css.once="animationInfinite0"
          :wrapper="'h3'"
      ></typical>
      <ol>
        <li class="card" v-animate-css.once="animationInfinite1">1.your friend particularly likes <b>Apple and Huawei</b> phones</li>
        <li class="card" v-animate-css.once="animationInfinite2">2. she would like to buy a phone with <b>a slim body</b>. </li>
        <li class="card" v-animate-css.once="animationInfinite3">3. this type of phone is likely to fit within your budget of <b>$600</b>.</li>
      </ol>
      <typical
          class="typicalWrapper"
          :steps="type_content_2"
          v-animate-css.once="animationInfinite4"
          :wrapper="'h3'"
      ></typical>
      <div style="margin: 24px 16px;padding-bottom:48px">
        <van-button round block v-animate-css.once="animationInfinite5" type="info" ref="scrollbtn"
                    native-type="submit"
                    :loading="loading" @click="next">Let's Start！
        </van-button>
      </div>
    </div>
  </div>
</template>

<script>
import typical from "vue-typical";
import {instance} from "@/request";

export default {
  name: "Tips",
  components: {
    typical,
  },
  data: function () {
    return {
      lang: localStorage.getItem("lang"),
      loading: false,
      type_content: ['', 1500,
        'Hello!', 1000,
        'You would like to buy a mobile phone as a birthday gift for your friend.', 1500,
        'You would like to buy a mobile phone as a birthday gift for your friend. She recently broke her mobile phone,', 1000,
        'You would like to buy a mobile phone as a birthday gift for your friend. She recently broke her mobile phone,and you think that she might need a new one.', 1500,
        'You would like to buy a mobile phone as a birthday gift for your friend. She recently broke her mobile phone,and you think that she might need a new one. You know that', 1500,
      ],
      type_content_2: ['', 22500,
        'With these preferences in mind,', 1000,
        'With these preferences in mind, you begin your search for a phone by visiting a Web site called Phoneshop which sells a wide variety of mobile phones.', 1500,
        'With these preferences in mind, you begin your search for a phone by visiting a Web site called Phoneshop which sells a wide variety of mobile phones. To determine which phone is the best to buy,', 1000,
        'With these preferences in mind, you begin your search for a phone by visiting a Web site called Phoneshop which sells a wide variety of mobile phones. To determine which phone is the best to buy, you decide to chat with an online chat agent who can provide recommendations.', 1500,
      ],
      animationInfinite0: {
        classes: 'fadeIn',
        delay: 1000,
        duration: 1000,
        iteration: 1
      },
      animationInfinite1: {
        classes: 'fadeIn',
        delay: 18000,
        duration: 1000,
        iteration: 1
      },
      animationInfinite2: {
        classes: 'fadeIn',
        delay: 19500,
        duration: 1000,
        iteration: 1
      },
      animationInfinite3: {
        classes: 'fadeIn',
        delay: 21000,
        duration: 1000,
        iteration: 1
      },
      animationInfinite4: {
        classes: 'fadeIn',
        delay: 22500,
        duration: 2000,
        iteration: 1
      },
      animationInfinite5: {
        classes: 'fadeIn',
        delay: 43500,
        duration: 2000,
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
    next: function () {
      this.loading = true;
      instance.post('/api/tip1', {
        'uuid': localStorage.getItem("uuid"),
        'tip1T': new Date().getTime(),
      }).then((res) => {
        if (res.data.status === 1) {
          localStorage.setItem("active", new Date().getTime().toString());
          this.$router.replace('/demographic').catch((err) => {
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
    },
  }
};
</script>

<style scoped>
#step1 {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow-y: auto;
  background-color: #fff;
}

#main {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: white;
  padding: 30px 10px 20px 10px;
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
