<template>
  <div class="index">
    <van-nav-bar title="Study Introduction"/>
    <van-popup v-model="show" round :close-on-click-overlay="false" :style="{ height: '90%', width:'90%' }">
      <div class="consent">
        <header style="text-align:center;">
          <h4>HONG KONG BAPTIST UNIVERSITY<br/>
            INFORMED CONSENT STATEMENT
          </h4>
        </header>
        <h5>PURPOSE OF RESEARCH STUDY:</h5>
        <p>This study aims to evaluate a web app that recommends mobile phones to you.</p>
        <h5>PROCEDURE:</h5>
        <p>Your task is to find three phones of your interest. After that, you will provide your evaluation feedback by
          completing an online questionnaire.</p>
        <h5>DURATION:</h5>
        <p>This study will take approximately 20 minutes to complete (including time for filling out
          questionnaires).</p>
        <h5>BENEFITS:</h5>
        <p>You will experience a web app for mobile phone recommendations by attending this study. In addition, we
          believe your feedback will help us improve our web app for mobile phone recommendations.</p>
        <h5>RISKS & CONFIDENTIALITY:</h5>
        <p>There is no risk in taking this study. We will try to keep all of the data collected in confidential places
          (in HKBU server with encryption), and only use them for research purposes.</p>
        <h5>VOLUNTARY PARTICIPATION AND RIGHT TO WITHDRAW:</h5>
        <p>Your participation in this study is voluntary; you may decline to participate without penalty. If you decide
          to participate, you may withdraw from the study without penalty. However, your data will be destroyed if you
          withdraw from the study before data collection is completed.</p>
        <h5>CIRCUMSTANCES THAT COULD LEAD US TO END YOUR PARTICIPATION:</h5>
        <p>We may decide to end your participation if we identify that you are not following the instructions closely
          enough.</p>
        <h5>CONTACT INFORMATION:</h5>
        <p>If you have any questions about this research, you may contact: Yucheng Jin at yuchengjin@hkbu.edu.hk</p>

        <p>You can contact the Research Ethics Committee by email at hkbu_rec@hkbu.edu.hk if you feel that you have not
          been treated according to the description in this form.</p>

        <h5>CLICKING “ACCEPT”:</h5>
        <p>By clicking on the “Accept” button, you indicate that you are 18 years of age or older, that you voluntarily
          agree to participate in this study, and that you understand the information in this consent form.</p>

        <div style="margin: 24px 16px;padding-bottom:2px">
          <van-button round block type="info" native-type="submit" :loading="loading" @click="tapAccept">Accept
          </van-button>
        </div>
      </div>
    </van-popup>
    <div class="content">
      <h3>Welcome to participate in our study!</h3>

      <p><b>Dear participants,</b></p>
      <p>Thank you very much for taking part in this experiment, which aims at studying how users interact with a web
        app for mobile phone recommendations.</p>
      <h4>Tasks:</h4>
      <p>Please use the provided web app to find <b>three phones</b> that suit your preferences. If the initial
        recommendations may not fit your taste, we encourage you to <b>tune recommendations by chatting</b> with the web
        app. All mobile phone information used in this experiment was from gsmarena.com.</p>
      <van-image
          width="90%"
          fit="contain"
          :src="require('../assets/imgs/typing.png')"
      />
      <h4>Duration:</h4>
      <p>Approximately 20 minutes (including time for filling out the questionnaire).</p>
      <h4>Task steps:</h4>
      <ul>
        <li><b>Step 1:</b> Watch a tutorial video to understand how to interact with the web app to finish the task. The "Start Study" button will be activated after playing the video.
        </li>
        <li><b>Step 2:</b> Fill out your personal background.</li>
        <van-image
            width="90%"
            fit="contain"
            :src="require('../assets/imgs/background.png')"
        />
        <li><b>Step 3:</b> Read some tips for tuning recommendations, and the tips can be accessed by clicking the
          "Tips" icon at the top left corner during the study.
        </li>

        <van-image
            v-if="condition<3"
            width="90%"
            fit="contain"
            :src="require('../assets/imgs/chatintro-base.png')"
        />
        <van-image
            v-else
            width="90%"
            fit="contain"
            :src="require('../assets/imgs/chatintro-avatar.png')"
        />
        <van-image
            width="90%"
            fit="contain"
            :src="require('../assets/imgs/tips.png')"
        />

        <li><b>Step 4:</b> Specify what kinds of phones you are looking for in a pop-up window.</li>
        <van-image
            v-if="condition<3"
            width="90%"
            fit="contain"
            :src="require('../assets/imgs/preference-base.png')"
        />
        <van-image
            v-else
            width="90%"
            fit="contain"
            :src="require('../assets/imgs/preference-avatar.png')"
        />
        <li><b>Step 5:</b> You can give feedback on a recommended phone by clicking "Add to cart" or "Next item" when
          you like or dislike the phone.
        </li>
        <van-image
            width="90%"
            fit="contain"
            :src="require('../assets/imgs/card.png')"
        />

        <li><b>Step 6:</b> You need to rate the phone after adding it to the shopping cart.</li>
        <van-image
            v-if="condition<3"
            width="90%"
            fit="contain"
            :src="require('../assets/imgs/rate-base.png')"
        />
        <van-image
            v-else
            width="90%"
            fit="contain"
            :src="require('../assets/imgs/rate-avatar.png')"
        />
        <li><b>Step 7:</b> You will be asked to fill out a post-study questionnaire after adding three phones to the
          shopping cart.
        </li>
        <van-image
            width="90%"
            fit="contain"
            :src="require('../assets/imgs/question.png')"
        />

        <li><b>Step 8:</b> Copy the code to the platform to verify the finished task and get a reward.</li>
        <van-image
            width="90%"
            fit="contain"
            :src="require('../assets/imgs/code.png')"
        />

      </ul>
      <h4>Notes:</h4>
      <ul>
        <li>You should test this web app on your mobile phone.</li>
        <li>You can set the video quality to 720P and turn on the subtitle while watching the tutorial video.</li>
        <li>You are recommended to use Chrome browser (version > 33.0) or Safari on iPhone.</li>
      </ul>
      <p>We greatly appreciate your efforts and time in advance.</p>
      <div style="margin: 24px 16px;padding-bottom:48px">
        <van-button round block type="info" :disabled="startStatus" native-type="submit" :loading="loading1"
                    @click="next">Tutorial Video
          <van-count-down
              ref="countDown"
              millisecond
              v-show="startStatus"
              :time="15000"
              :auto-start="false"
              format="(sss)"
              @finish="finish"
          />
        </van-button>
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
      startStatus: true,
      loading: false,
      loading1: false,
      uuid: localStorage.getItem('uuid'),
      code: localStorage.getItem('code'),
      finished: localStorage.getItem('finished'),
      show: true,
      checked: false,
      device: navigator.userAgent,
      condition: localStorage.getItem('condition')
    }
  },
  methods: {
    tapAccept: function () {
      this.loading = true;
      if (this.uuid) {
        if (this.finished === '1' && this.code) {
          this.show = true;
          this.$toast('You have completed the survey, thank you for your cooperation.');
          this.loading = false;
        } else {
          this.show = false;
          this.loading = false;
          this.$refs.countDown.start();
        }
      } else {
        instance.post('/api/accept', {
          'accT': new Date().getTime(),
          'device': this.device,
        }).then((res) => {
          //console.log(res);
          if (res.data.uuid) {
            localStorage.setItem('uuid', res.data.uuid);
            localStorage.setItem('finished', '0');
            localStorage.setItem('condition', res.data.condition);
            localStorage.setItem('active', new Date().getTime().toString());
            this.loading = false;
            this.show = false;
            this.condition = res.data.condition;
            this.$refs.countDown.start();
          } else {
            console.log(res.data);
            this.loading = false;
            this.$toast('Error,Please Try again later.');
          }
        }).catch(() => {
          this.loading = false;
          this.$toast('Network error,Please Try again later.');
        })
      }
    },
    finish: function () {
      this.startStatus = false;
    },
    next: function () {
      this.loading1 = true;
      instance.post('/api/start', {
        'startT': new Date().getTime(),
        'uuid': localStorage.getItem("uuid"),
        'condition': localStorage.getItem("condition")
      }).then((res) => {
        if (res.data.status === 1) {
          localStorage.setItem('step', '0');
          localStorage.setItem("active", new Date().getTime().toString());
          this.$router.replace('/tutorial').catch((err) => {
            console.log(err.message)
          });
          this.loading1 = false;
        } else {
          this.loading1 = false;
          this.$toast("Please refresh the page and try again.")
        }
      }).catch((err) => {
        this.loading1 = false;
        console.log(err.message);
        this.$toast("Network error,Please Try again later.");
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

.consent {
  margin: 5px;
  padding: 6px 10px 36px 10px;
  border-radius: 6px;
  background-color: #fff;
  color: #323233;
  font-size: 18px;
}

.consent p {
  text-align: left;
  margin-block-start: 0.5em;
  margin-block-end: 0.5em;

}

.content p {
  padding: 0 1px;
  text-indent: 0;
  text-align: left;
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
  text-align: left;
}

.van-image {
  margin: 10px 0;
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

.van-count-down {
  display: inline;
  color: white;
}
</style>
