<template>
  <div id="scenario">
    <van-nav-bar title="Scenario"/>
    <div id="main">
      <p>Lily recently broke her mobile phone, and she planned to buy a new one. Now she wants to ask you to help her
        pick three phones according to her basic requirements.</p>
      <van-image
          width="100%"
          style="max-width: 960px"
          src="https://musicbot-1251052535.cos.ap-shanghai.myqcloud.com/phonebot/scenario_1.png "
      />
      <ol>
        <li>1. She often uses her mobile phone to watch videos.</li>
        <li>2. She hates frequently charging her mobile phone.</li>
        <li>3. Her budget for purchasing a new mobile phone is <strong>400 US </strong>dollars.</li>
      </ol>
      <van-image
          width="100%"
          style="max-width: 960px"
          src="https://musicbot-1251052535.cos.ap-shanghai.myqcloud.com/phonebot/scenario_2.png "
      />
      <p>With these preferences in mind, you begin your search for a phone by visiting a website called Phoneshop which
        can help you pick three mobile phones for Lily. To determine which phone is the best to buy, you decide to chat
        with an online chat agent who can provide recommendations.</p>

      <div style="margin: 24px 16px;padding-bottom:48px">
        <van-button round block type="info"
                    native-type="submit"
                    :loading="loading" @click="next">Let's Start！
        </van-button>
      </div>
    </div>
  </div>
</template>

<script>
import {instance} from "@/request";

export default {
  name: "Scenario",
  data: function () {
    return {
      lang: localStorage.getItem("lang"),
      loading: false,

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
    },
  }
};
</script>

<style scoped>

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
