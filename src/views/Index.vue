<template>
  <div class="index">
    <van-nav-bar title="Study Introduction"/>
    <van-popup v-model="show" round :close-on-click-overlay="false" :style="{ height: '90%', width:'90%' }">
      <div class="consent">
        <header style="text-align:center;">
          <h4>User Study<br/>
            Informed Consent Statement
          </h4>
        </header>
        <h5>Purpose of Research Study:</h5>
        <p>This study aims to evaluate a chatbot for recommending mobile phones.</p>
        <h5>Procedure:</h5>
        <p>Your task is to use the chatbot to find three mobile phones based on the given requirements.</p>
        <h5>Duration:</h5>
        <p>This whole study will take about 10 minutes to complete (including time for filling out
          questionnaires).</p>
<!--        <h5>Benefits:</h5>-->
<!--        <p>You will experience a chatbot for mobile phone recommendations by attending this study. In addition, we-->
<!--          believe your feedback will help us improve our chatbot for mobile phone recommendations.</p>-->
        <h5>Risk & Confidentiality:</h5>
        <p>There is no risk in taking this study. We will try to keep all of the data collected in confidential places
          (in HKBU server with encryption), and only use them for research purposes.</p>
        <h5>Voluntary Participation and Right to Withdraw:</h5>
        <p>Your participation in this study is voluntary; you may decline to participate without penalty.</p>
<!--        <h5>Circumstances That Could Lead Us to End Your Participation:</h5>-->
<!--        <p>We may decide to end your participation if we identify that you are not following the instructions closely-->
<!--          enough.</p>-->
        <h5>Contact Information:</h5>
        <p>If you have any questions about this research, you may contact: Xianglin ZHAO at csxlzhao@comp.hkbu.edu.hk</p>

        <p>You can contact the Research Ethics Committee by email at hkbu_rec@hkbu.edu.hk if you feel that you have not
          been treated according to the description in this form.</p>

        <h5>Agreement:</h5>
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
      <p>Thank you very much for participating in this experiment, which aims to evaluate a chatbot that can <b>recommend mobile phones</b> based on your requirements.</p>
      <h4>Task:</h4>
      <ul>
        <li>Read a user scenario about purchasing mobile phones and finish a simple quiz about your understanding of scenario.</li>
        <li>Find <b>three mobile phones</b> that can meet the requirements shown in the user scenario.</li>
        <li>Fill out a questionnaire to evaluate the chatbot based on your experience.</li>
      </ul>

      <h4>Duration:</h4>
      <p>Approximately 5 minutes.</p>
<!--      <h4>Task steps:</h4>-->
<!--      <p style="color: #B24040">You will be allowed to proceed to the next step only when you finish reading all the-->
<!--        task steps below. (using the arrow buttons to view the previous or next step)</p>-->
<!--      <van-swipe style="width: 90%;margin: 0 auto; max-width: 480px" ref="tutorial_img" @change="imgChange"-->
<!--                 :touchable="false">-->
<!--        <van-swipe-item>-->
<!--          <van-image-->
<!--              style="margin: 10px"-->
<!--              width="90%"-->
<!--              fit="contain"-->
<!--              :src="require('../assets/imgs/step1.png')"-->
<!--          />-->
<!--          <p><b>Step 1:</b> Fill out your personal background.</p>-->
<!--        </van-swipe-item>-->
<!--        <van-swipe-item>-->
<!--          <van-image-->
<!--              width="90%"-->
<!--              fit="contain"-->
<!--              :src="require('../assets/imgs/step2.png')"-->
<!--          />-->

<!--          <p><b>Step 2:</b> Read some tips for modifying recommendations through conversation.-->
<!--          </p>-->
<!--        </van-swipe-item>-->
<!--        <van-swipe-item>-->
<!--          <van-image-->
<!--              v-if="condition < 3"-->
<!--              width="90%"-->
<!--              fit="contain"-->
<!--              :src="require('../assets/imgs/step3_base.png')"-->
<!--          />-->
<!--          <van-image-->
<!--              v-else-->
<!--              width="90%"-->
<!--              fit="contain"-->
<!--              :src="require('../assets/imgs/step3.png')"-->
<!--          />-->

<!--          <p><b>Step 3:</b> Click OK to specify your preference for mobile phones. Please select at most three brands-->
<!--            you like-->
<!--          </p>-->
<!--        </van-swipe-item>-->
<!--        <van-swipe-item>-->
<!--          <van-image-->
<!--              v-if="condition<3"-->
<!--              width="90%"-->
<!--              fit="contain"-->
<!--              :src="require('../assets/imgs/step4_base.png')"-->
<!--          />-->
<!--          <van-image-->
<!--              v-else-->
<!--              width="90%"-->
<!--              fit="contain"-->
<!--              :src="require('../assets/imgs/step4.png')"-->
<!--          />-->
<!--          <p><b>Step 4:</b> Specify your preference regarding the brand, budget, and camera resolution.</p>-->
<!--        </van-swipe-item>-->
<!--        <van-swipe-item>-->
<!--          <van-image-->
<!--              width="90%"-->
<!--              fit="contain"-->
<!--              :src="require('../assets/imgs/step5.png')"-->
<!--          />-->
<!--          <p><b>Step 5:</b> Chat with the chatbot when you want to modify recommended phones.-->
<!--          </p>-->
<!--        </van-swipe-item>-->
<!--        <van-swipe-item>-->
<!--          <van-image-->
<!--              width="90%"-->
<!--              fit="contain"-->
<!--              :src="require('../assets/imgs/step6.png')"-->
<!--          />-->
<!--          <p><b>Step 6:</b> View the detail of a recommended phone if you wish. Accept or decline a recommended phone by-->
<!--            clicking the “Add to cart” or “Try another” button.-->
<!--          </p>-->
<!--        </van-swipe-item>-->
<!--        <van-swipe-item>-->
<!--          <van-image-->
<!--              v-if="condition<3"-->
<!--              width="90%"-->
<!--              fit="contain"-->
<!--              :src="require('../assets/imgs/step7_base.png')"-->
<!--          />-->
<!--          <van-image-->
<!--              v-else-->
<!--              width="90%"-->
<!--              fit="contain"-->
<!--              :src="require('../assets/imgs/step7.png')"-->
<!--          />-->
<!--          <p><b>Step 7:</b> Rate the phone you add to the shopping cart.</p>-->
<!--        </van-swipe-item>-->
<!--        <van-swipe-item>-->
<!--          <van-image-->
<!--              width="90%"-->
<!--              fit="contain"-->
<!--              :src="require('../assets/imgs/step8.png')"-->
<!--          />-->
<!--          <p><b>Step 8:</b> Fill out a post-study questionnaire after finishing the task.-->
<!--          </p>-->
<!--        </van-swipe-item>-->
<!--        <van-swipe-item>-->
<!--          <van-image-->
<!--              width="90%"-->
<!--              fit="contain"-->
<!--              :src="require('../assets/imgs/step9.png')"-->
<!--          />-->
<!--          <p><b>Step 9:</b> Copy the code to the Mechanical Turk to verify the finished task and get a reward.</p>-->
<!--        </van-swipe-item>-->
<!--        <template #indicator>-->
<!--          <div class="custom-indicator"></div>-->
<!--        </template>-->
<!--      </van-swipe>-->
<!--      <van-row justify="space-around" type="flex">-->
<!--        <van-col span="6">-->
<!--          <van-button @click="stepPrev" type="info" round style="width: 80%; font-size: 20px"> &lt;</van-button>-->
<!--        </van-col>-->
<!--        <van-col span="6" style="text-align: center">-->
<!--          <span style="font-weight: bold;line-height: 36px;">Step {{ current_img + 1 }} / 9</span>-->
<!--        </van-col>-->
<!--        <van-col span="6">-->
<!--          <van-button @click="stepNext" type="info" round style="width: 80%; font-size: 20px"> &gt;</van-button>-->
<!--        </van-col>-->
<!--      </van-row>-->
      <h4>Notes:</h4>
      <ul>
        <li>You can chat with the bot by typing your requirements.</li>
        <li>You are suggested to test this chatbot on a <b>mobile phone</b>.</li>
        <li>You are suggested to use Chrome browser (version > 33.0) or Safari on iPhones.</li>
      </ul>
      <p>We greatly appreciate your efforts and time in advance.</p>
      <div style="margin: 24px 16px;padding-bottom:48px">
        <van-button round block type="info" :disabled="startStatus" native-type="submit" :loading="loading1"
                    @click="next">Continue
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
      current_img: 0,
      startStatus: false,
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
    imgChange: function (index) {
      this.current_img = index;
      if (this.current_img === 8) {
        this.startStatus = false;
      }
    },
    stepPrev: function () {
      if (this.current_img > 0) {
        this.$refs.tutorial_img.prev()
      }
    },
    stepNext: function () {
      if (this.current_img < 8) {
        this.$refs.tutorial_img.next()
      }
    },
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
            localStorage.setItem('identity_cue', res.data.identity_cue);
            localStorage.setItem('explanation_style', res.data.explanation_style);
            localStorage.setItem('active', new Date().getTime().toString());
            this.loading = false;
            this.show = false;
            this.condition = res.data.condition;
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

    next: function () {
      this.loading1 = true;
      instance.post('/api/start', {
        'startT': new Date().getTime(),
        'uuid': localStorage.getItem("uuid"),
      }).then((res) => {
        if (res.data.status === 1) {
          localStorage.setItem('step', '0');
          localStorage.setItem("active", new Date().getTime().toString());
          this.$router.replace('/scenario').catch((err) => {
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
