<template>
  <div>
    <van-nav-bar title="Digit Span Task"/>
    <div class="content">
      <div v-if="step===0">
        <h1>INSTRUCTIONS</h1>
        <p>This is the digit span task.<br><br>In this task, you will
          have to remember a sequence of numbers presented on the screen one after the other.<br>At the end of each
          trial,
          enter all the numbers into the onscreen number-pad in their correct order.<br><br><u>Example:</u> if the
          sequence
          is
          '7 4 5 1', enter '7 4 5 1' in this exact order.<br><br>You will now be given practice trials to help you
          understand
          the task.<br>Press 'Next' to start the practice trials.</p>
        <van-button round block type="info"
                    native-type="submit" @click="test_start">Next
        </van-button>
      </div>
      <div v-if="step===1">
        <p>You have completed the practice trials. <br><br>
          If you are clear about the task, click 'Next' to proceed to the main trials.<br><br></p>
        <van-button round block type="info"
                    native-type="submit" @click="formal_start">Next
        </van-button>
      </div>
      <div v-if="step===2">
        <h1>Result</h1>
        You have completed the task.
        <br>The maximum number of digits recalled correctly was <span style="font-size: 24px;color: #B24040">{{ highest_span_score }}</span>.
        <br><br>
        Please click "Next" to complete other tasks.
        <br>
        <br>
        <van-button round block type="info"
                    native-type="submit" @click="next_step">Next
        </van-button>
      </div>
    </div>
    <van-popup style="width: 100%; height: 100%" v-model="num_model">
      <van-row type="flex" justify="center" align="center" style="height: 100%; font-size: 48px">
        <van-col type="flex" span="4">
          <h1 style="text-align: center">{{ display_num }}</h1>
        </van-col>
      </van-row>
    </van-popup>
    <van-popup style="width: 100%; height: 100%;" v-model="recall_model">
      <van-row type="flex" justify="center" align="center" style="height: 100%;">
        <van-col span="22">
          <van-field
              readonly
              width="100%"
              size="large"
              label="Recall"
              :border="true"
              clickable
              :value="response"
              style="border: 2px solid gray"
              @touchstart.native.stop="keyboard_show = true"
          />
          <br>
          <h1 v-show="acc===0" style="color: #B24040">False</h1>
          <h1 v-show="acc===1" style="color: darkgreen">True</h1>
          <van-button round block type="info" :disabled="click_next_disable"
                      native-type="submit" @click="on_next">Next
          </van-button>
          <van-number-keyboard
              v-model="response"
              :show="keyboard_show"
              :maxlength="minSetSize"
          />
        </van-col>
      </van-row>
    </van-popup>
  </div>
</template>
<script>
import {instance} from "../request";

export default {
  name: "Que1",
  data: function () {
    return {
      step: 0,
      nTrials: 14, // number of trials in the test
      nTrials_count: 0, // keeps track of number of trials completed
      minSetSize: 3, // starting digit length
      stimuli_duration: 1000, // number of miliseconds to display each digit
      recall_duration: null, // number of miliseconds to allow recall. If null, there is no time limit.
      file_name: null, // file name for data file. if null, a default name consisting of the participant ID and a unique number is chosen.
      possibleNumbers: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],  //possible digits participants can get

      selection: [],  //chooses random digits
      selection_id: -1,

      // keeps track of participant's scores:
      nError: 0,
      highest_span_score: 0,
      consec_error_score: 0,
      display_num: null,
      interval_obj: null,
      response: '',
      keyboard_show: true,
      num_model: false,
      recall_model: false,
      acc: -1,
      click_next_disable: false,
      result: false,
    }
  },
  mounted() {
    this.selection = this.rand_n(this.minSetSize)
  },
  methods: {
    rand_one() {
      return Math.floor(Math.random() * 10)
    },
    rand_n(n) {
      let res = []
      for (let i = 0; i < n; i++) {
        if (i === 0) {
          res.push(this.rand_one())
        } else {
          let tmp = this.rand_one()
          while (res.includes(tmp)) {
            tmp = this.rand_one()
          }
          res.push(tmp)
        }
      }
      //console.log(res)
      return res
    },

    render_num() {
      this.interval_obj = setInterval(() => {
        if (this.selection_id === this.selection.length) {
          clearInterval(this.interval_obj)
          this.selection_id = 0
          this.num_model = false
          this.recall_model = true
          return
        }
        this.display_num = this.selection[this.selection_id]
        this.selection_id += 1
      }, this.stimuli_duration)
    },

    check_accuracy: function () {
      let acc = 1
      for (let i = 0; i < this.selection.length; i++) {
        //console.log(this.selection[i], parseInt(this.response[i]))
        if (this.selection[i] !== parseInt(this.response[i])) {
          acc = 0
          break
        }
      }
      return acc

    },
    on_next: function () {
      this.acc = this.check_accuracy()
      this.click_next_disable = true
      setTimeout(() => {
        if (this.acc === 1) {
          if (this.highest_span_score < this.minSetSize) {
            this.highest_span_score = this.minSetSize
          }
          this.minSetSize += 1
          this.nError = 0
        } else if (this.nError < 1) { // checks for number of consecutive errors
          this.nError += 1
        } else {
          if (this.consec_error_score < this.minSetSize) {
            this.consec_error_score = this.minSetSize
          }
          this.minSetSize = Math.max(3, this.minSetSize - 1)
        }
        if (this.minSetSize <= 8) { // bottom code prevents immediate repition of digits
          this.selection = this.rand_n(this.minSetSize)
        } else {
          this.selection = this.rand_n(8)
          let extra = this.minSetSize - 8
          let extraNumbers = this.rand_n(extra)
          this.selection = this.selection.concat(extraNumbers)
        }
        this.selection_id = -1
        this.response = ''
        this.recall_model = false
        this.nTrials_count += 1
        this.start()
        this.click_next_disable = false
      }, 1000)
    },
    start: function () {
      if (this.nTrials_count < this.nTrials) {
        this.acc = -1
        this.num_model = true
        this.display_num = ''
        this.render_num()
      } else {
        this.step += 1
        //console.log(this.highest_span_score, this.consec_error_score)
      }
    },
    test_start: function () {
      this.nTrials = 3
      this.nTrials_count = 0
      this.start()
    },
    formal_start: function () {
      this.nTrials = 14
      this.nTrials_count = 0
      this.minSetSize = 3
      this.nError = 0
      this.highest_span_score = 0
      this.consec_error_score = 0
      this.selection = this.rand_n(this.minSetSize)
      this.start()
    },
    next_step: function () {
      instance.post('/que/game', {
        uuid: localStorage.getItem('uuid'),
        highest_span_score: this.highest_span_score,
        consec_error_score: this.consec_error_score,
        gameT: new Date().getTime(),
      }).then((res) => {
        console.log(res)
        this.$router.replace('/exp1')
      })

    }
  },
}
</script>


<style scoped>
.content {
  margin: 10px 10px;
  padding: 10px 10px 36px 10px;
  background-color: white;
  border-radius: 10px;
}
</style>