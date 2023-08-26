<template>
  <div class="index">
    <van-nav-bar title="Introduction"/>
      <div class="consent">
        <header style="text-align:center;">
          <h4>User Study<br/>
            Informed Consent Statement
          </h4>
        </header>
        <h5>Purpose of Research Study:</h5>
        <p>This study aims to investigate the influence of using chatbot on make a purchase decision based on recommended mobile phones.</p>
        <h5>Procedure:</h5>
        <ol>
          <li>1. Fill out pre-study questionnaire about your personal characteristics.</li>
          <li>2. Finish a working memory test.</li>
          <li>3. Use the chatbot to find a mobile phone based on a scenario.</li>
          <li>4. Fill out post-study questionnaire.</li>
        </ol>
        <h5>Duration:</h5>
        <p>This whole study will take about 15 minutes to complete (including time for filling out questionnaires).</p>
<!--        <h5>Benefits:</h5>-->
<!--        <p>You will experience a chatbot for mobile phone recommendations by attending this study. In addition, we-->
<!--          believe your feedback will help us improve our chatbot for mobile phone recommendations.</p>-->
        <h5>Risk & Confidentiality:</h5>
        <p>There is no risk in taking this study. We will try to keep all of the data collected in confidential places (in HKBU server with encryption), and only use them for research purposes.</p>
        <h5>Voluntary Participation and Right to Withdraw:</h5>
        <p>Your participation in this study is voluntary; you may decline to participate without penalty.</p>
<!--        <h5>Circumstances That Could Lead Us to End Your Participation:</h5>-->
<!--        <p>We may decide to end your participation if we identify that you are not following the instructions closely-->
<!--          enough.</p>-->
        <h5>Contact Information:</h5>
        <p>If you have any questions about this research, you may contact: Xianglin ZHAO at csxlzhao@comp.hkbu.edu.hk</p>

        <p>You can contact the Research Ethics Committee by email at hkbu_rec@hkbu.edu.hk if you feel that you have not been treated according to the description in this form.</p>

        <h5>Agreement:</h5>
        <p>By clicking on the “Accept” button, you indicate that you are 18 years of age or older, that you voluntarily agree to participate in this study, and that you understand the information in this consent form.</p>

        <div style="margin: 24px 16px;padding-bottom:2px">
          <van-button round block type="info" native-type="submit" :loading="loading" @click="tapAccept">Accept
          </van-button>
        </div>
      </div>


  </div>
</template>

<script>
import {instance} from '@/request';

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
          this.$router.replace('/prestudy').catch((err) => {
            console.log(err.message)
          });
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
            this.$router.replace('/step1').catch((err) => {
              console.log(err.message)
            });
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
          this.$router.replace('/prestudy').catch((err) => {
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

22.van-count-down {
  display: inline;
  color: white;
}
</style>
