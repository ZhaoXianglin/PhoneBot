<template>
  <div class="consent">
    <van-nav-bar title="Study Introduction"/>
    <van-popup v-model="show" round :close-on-click-overlay="false" :style="{ height: '90%', width:'90%' }">
      <div class="consent">
        <header style="text-align:center;">
          <h4>HONG KONG BAPTIST UNIVERSITY<br/>
            INFORMED CONSENT STATEMENT
          </h4>
        </header>
        <h5>PURPOSE OF RESEARCH STUDY:</h5>
        <p>The purpose of this study is to design an effective tool that will assist you in better obtaining fact-checking results about health-related news.</p>
        <h5>PROCEDURE:</h5>
        <p>Your task is to read a health-related news story and view the fact-checking results via our tool. Then, you will provide your evaluation feedback by completing an online questionnaire.</p>
        <h5>DURATION:</h5>
        <p>This study will take you approximately half an hour to complete (including time for filling out questionnaires).</p>
        <h5>BENEFITS:</h5>
        <p>By attending this study, you will understand news fact-checking services and gain some knowledge about health. In addition, we believe your feedback will help us design an effective tool to present the fact-checking results.</p>
        <h5>RISKS & CONFIDENTIALITY:</h5>
        <p>There is no risk of taking this study. We will try to keep all of the data collected in confidential places (in HKBU server with encryption), and only use them for research purposes.</p>
        <h5>VOLUNTARY PARTICIPATION AND RIGHT TO WITHDRAW:</h5>
        <p>Your participation in this study is voluntary; you may decline to participate without penalty. If you decide to participate, you may withdraw from the study at any time without penalty. If you withdraw from the study before data collection is completed, your data will be destroyed.</p>
        <h5>CIRCUMSTANCES THAT COULD LEAD US TO END YOUR PARTICIPATION:</h5>
        <p>We may decide to end your participation if we identify that you are not following the instructions closely enough.</p>
        <h5>COMPENSATION:</h5>
        <p>To compensate for your support of our research, we will draw xxx lucky participants who satisfactorily complete the study to win a supermarket or coffee shop coupon.</p>
        <h5>CONTACT INFORMATION:</h5>
        <p>If you have any questions about this research, you may contact: Xianglin ZHAO at csxlzhao@hkbu.edu.hk.</p>

        <p>If you feel that you have not been treated according to the description in this form, or your rights as a participant in this research have been violated during the course of this project, you may contact the Research Ethics Committee by email at hkbu_rec@hkbu.edu.hk or by mail to Graduate School, Hong Kong Baptist University, Kowloon Tong, Hong Kong.</p>

        <h5>CLICKING “ACCEPT”:</h5>
        <p>By clicking on the “Accept” button, you indicate that you are 18 years of age or older, that you voluntarily agree to participate in this study, and that you understand the information in this consent form.</p>

        <div style="margin: 24px 16px;padding-bottom:2px">
          <van-button round block type="info" native-type="submit" :loading="loading" @click="tapAccept">Accept</van-button>
        </div>
      </div>
    </van-popup>
    <div class="content">
      <h3>Welcome to Evaluate Our Music Bot!</h3>
      <p><b>Dear participants,</b></p>
      <p>Thank you very much for taking part in this experiment, which aims at studying how users communicate with a music chatbot for exploring diverse songs.</p>
      <h4>Tasks:</h4>
      <p>Please use the provided chatbot to find 5 pieces of songs that suit your preferences. The initial recommendations may not fit your taste, you need to tune recommendations by chatting with the bot. All music information used in this experiment was from Spotify.</p>
      <h4>Duration:</h4>
      <p>Approximately 20 minutes (including time for filling out two questionnaires).</p>
      <h4>Task steps:</h4>
      <ul>
        <li><b>Step 1:</b> You will then fill out your personal background (including a personality test);</li>
        <li><b>Step 2:</b> You can get familiar with the music bot by trying two ways of tuning recommendations before starting the study; Try textual input to tell bot what kind of music you are looking for (Some examples of tuning recommendations are shown on the right side panel).</li>
        <li><b>Step 3:</b> After clicking on the button “Start study”, you will be asked to try to find 5 good songs that fit your taste using the music bot. You can give feedback on recommended music by clicking “(like, next)” when you like/dislike the songs.</li>
        <li><b>Step 4:</b> You will give us your overall preference over the used music chatbot.</li>
      </ul>
      <h4>Tips:</h4>
      <ul>
        <li>You should use Chrome browser (version > 33.0) on your PC.</li>
        <li>You can send text by pressing "Enter"</li>
        <li>First submit the questionnaire and then click "X" to close the popup window.</li>
        <li>Do not change User ID prefilled in the questionnaire.</li>
        <li>All of your data will be kept confidentially and be only used for our research analysis.</li>
      </ul>
      <p>We greatly appreciate your efforts and time in advance.</p>
      <div style="margin: 24px 16px;padding-bottom:48px">
        <van-button round block type="info" native-type="submit" :loading="loading1" @click="next">Start Study</van-button>
      </div>
    </div>

  </div>
</template>

<script>
import {instance} from '../request';

export default {
  name: "Index",
  components: {},

  data: function () {
    return {
      lang: "s_cn",
      loading: false,
      loading1: false,
      uuid: localStorage.getItem('uuid'),
      st: localStorage.getItem('st'),
      chatbot: localStorage.getItem('chatbot'),
      experts: localStorage.getItem('st'),
      active: localStorage.getItem('experts'),
      finished: localStorage.getItem('finished'),
      show: true,
      checked: false,
      device: navigator.userAgent,
    }
  },
  methods: {
    tapAccept: function () {
      //let nowt = new Date().getTime();
      this.loading = true;
      if (this.uuid && this.chatbot && this.experts && this.st) {
        if(this.finished === '1'){
          this.show = true;
          this.$toast('您已经完成全部实验，感谢您的支持！');
          this.loading = false;
        }else {
          this.show = false;
          this.loading = false;
        }
      } else {
        instance.post('/api/accept', {
          'accT': new Date().getTime(),
          'device': this.device,
        }).then((res) => {
          if (res.data.uuid && res.data.chatbot != null &&res.data.experts != null && res.data.st != null) {
            localStorage.setItem('uuid', res.data.uuid);
            localStorage.setItem('st', res.data.st);
            localStorage.setItem('chatbot', res.data.chatbot);
            localStorage.setItem('experts', res.data.experts);
            localStorage.setItem('finished', '0');
            localStorage.setItem('active', new Date().getTime().toString());
            this.loading = false;
            this.show = false;
          } else {
            console.log(res.data);
            this.loading = false;
            this.$toast('错误，请重试');
          }
        }).catch(() => {
          this.loading = false;
          this.$toast('网络错误，请重试');
        })
      }
    },
    next: function () {
      this.loading1 = true;
      instance.post('/api/start', {
        'startT': new Date().getTime(),
        'lang': this.lang,
        'uuid': localStorage.getItem("uuid"),
      }).then((res) => {
        if (res.data.status === 1) {
          localStorage.setItem('step', '0');
          localStorage.setItem("active", new Date().getTime().toString());
          localStorage.setItem("lang", this.lang);
          this.$router.replace('/tip1').catch((err) => {
            console.log(err.message)
          });
          this.loading1 = false;
        } else {
          this.loading1 = false;
          this.$toast("请先阅读知情同意书并接受或刷新页面重试。")
        }
      }).catch((err) => {
        this.loading1 = false;
        console.log(err.message);
        this.$toast("网络错误，请重试。");
      })
    }
  },
}
</script>

<style scoped>
.content {
  margin: 5px;
  padding: 6px 10px 36px 10px;
  border-radius: 6px;
  background-color: #fff;
  color: #323233;
}
.consent{
  margin: 5px;
  padding: 6px 10px 36px 10px;
  border-radius: 6px;
  background-color: #fff;
  color: #323233;
  font-size: 18px;
}
.consent p{
  text-align: justify;
  margin-block-start: 0.5em;
  margin-block-end: 0.5em;

}

.content p {
  padding: 0 1px;
  text-indent: 0;
  text-align: justify;
  margin-block-start: 0.5em;
  margin-block-end: 0.5em;
}
.content h4 {
  text-decoration: underline;
  margin-block-start: 0.5em;
  margin-block-end: 0.5em;
  font-size: 18px;
}

.consent h5 {
  text-decoration: underline;
  margin-block-start: 0.8em;
  margin-block-end: 0.5em;
  font-size: 16px;
}

.content ul li {
  list-style-type: disc;
  list-style-position: inside;
  padding-bottom: 0.5em;
  text-align: justify;
}

/*li b {*/
/*  font-size: 15px;*/
/*  display: inline-block;*/
/*  text-align: left;*/
/*}*/

.content ol li {
  text-align: left;
  padding-bottom: 0.5em;
  list-style-position: inside;
  list-style-type: upper-roman;
}
</style>
