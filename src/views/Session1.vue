<template>
  <div id="step1">
    <van-nav-bar title="Tips"/>
    <van-steps :active="1">
      <van-step>STEP1</van-step>
      <van-step>STEP2</van-step>
      <van-step>STEP3</van-step>
      <van-step>STEP4</van-step>
      <van-step>STEP5</van-step>
    </van-steps>
    <div id="main">
      <van-image
          round
          v-animate-css.once="animationInfinite0"
          width="10rem"
          height="10rem"
          :src="require('../assets/images/guide/person2.png')"
      />
      <typical
          v-if="lang==='s_cn'"
          class="typicalWrapper"
          :steps="type_content_s"
          v-animate-css.once="animationInfinite0"
          :wrapper="'h2'"
      ></typical>
      <typical
          v-else
          class="typicalWrapper"
          :steps="type_content_t"
          v-animate-css.once="animationInfinite0"
          :wrapper="'h2'"
      ></typical>
      <ol v-if="lang==='s_cn'">
        <li class="card" v-animate-css.once="animationInfinite1">1. 一些您的背景信息，例如：性别。</li>
        <li class="card" v-animate-css.once="animationInfinite2">2. 一些关于“熬夜”的陈述是否正确。</li>
        <li class="card" v-animate-css.once="animationInfinite3">3. 一些您的个人特点。</li>
      </ol>
      <ol v-else>
        <li class="card" v-animate-css.once="animationInfinite1">1. 一些您的背景信息，例如：性別。</li>
        <li class="card" v-animate-css.once="animationInfinite2">2. 一些關於「捱夜」的陳述是否正確。</li>
        <li class="card" v-animate-css.once="animationInfinite3">3. 一些您的個人特點。</li>
      </ol>
      <div style="margin: 24px 16px;padding-bottom:48px">
        <van-button v-if="lang==='s_cn'" round block v-animate-css.once="animationInfinite4" type="info"
                    native-type="submit"
                    :loading="loading" @click="next">让我们开始吧！
        </van-button>
        <van-button v-else round block v-animate-css.once="animationInfinite4" type="info" native-type="submit"
                    :loading="loading" @click="next">讓我們開始吧！
        </van-button>
      </div>
    </div>
  </div>
</template>

<script>
import typical from "vue-typical";
import {instance} from "@/request";

export default {
  name: "Step1",
  components: {
    typical,
  },
  data: function () {
    return {
      lang: localStorage.getItem("lang"),
      loading: false,
      type_content_t: [
        '', 1500,
        'Hello!', 500,
        'Hello! 歡迎進入我們的實驗。', 1000,
        '您是否有捱夜的習慣？😴', 1000,
        '您是否有捱夜的習慣？😴 您認為捱夜有哪些危害? ', 1500,
        '您是否有捱夜的習慣？😴 您認為捱夜有哪些危害? 在接下來的問卷中，我們會問您這樣一些問題：', 1000,
      ],
      type_content_s: ['', 1500,
        'Hello!', 500,
        'Hello! 欢迎进入我们的实验。', 1000,
        '您是否有熬夜的习惯？😴', 1000,
        '您是否有熬夜的习惯？😴 您认为熬夜有哪些危害? ', 1500,
        '您是否有熬夜的习惯？😴 您认为熬夜有哪些危害? 在接下来的问卷中，我们会问您这样一些问题：', 1000,
      ],
      animationInfinite0: {
        classes: 'fadeIn',
        delay: 1000,
        duration: 1000,
        iteration: 1
      },
      animationInfinite1: {
        classes: 'fadeIn',
        delay: 11000,
        duration: 1000,
        iteration: 1
      },
      animationInfinite2: {
        classes: 'fadeIn',
        delay: 12000,
        duration: 1000,
        iteration: 1
      },
      animationInfinite3: {
        classes: 'fadeIn',
        delay: 13000,
        duration: 1000,
        iteration: 1
      },
      animationInfinite4: {
        classes: 'fadeIn',
        delay: 14500,
        duration: 2000,
        iteration: 1
      },
    }
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

.typicalWrapper::after {
  content: "|";
  animation: blink 1s infinite step-start;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}
</style>
