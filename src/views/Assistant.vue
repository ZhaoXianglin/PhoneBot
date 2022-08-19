<template>
  <div class="chatbot">
    <van-nav-bar title='PhoneBot' @click-left="clickHelp" @click-right="clickCart" left-text=""
                 right-text="Cart" class="chatbot-header">
      <template #left>
        <van-icon name="info-o" size="16"><span
            style="color: #1989fa;font-size: 16px;font-family:-apple-system,BlinkMacSystemFont,'Helvetica Neue',Helvetica,Segoe UI,Arial,Roboto,'PingFang SC',miui,'Hiragino Sans GB','Microsoft Yahei',sans-serif ">Tips</span>
        </van-icon>

      </template>
      <template #right>
        <van-icon name="cart-o" size="16" :badge="cart_item_count"><span
            style="color: #1989fa;font-size: 16px;font-family:-apple-system,BlinkMacSystemFont,'Helvetica Neue',Helvetica,Segoe UI,Arial,Roboto,'PingFang SC',miui,'Hiragino Sans GB','Microsoft Yahei',sans-serif ">Cart</span>
        </van-icon>
      </template>
    </van-nav-bar>
    <div class="chatbot-send">
      <van-field
          v-model="message"
          rows="1"
          autosize
      >
        <template #button>
          <van-button size="small" :disabled="msg_btn_ctrl" type="info" @click="sendMessage"> Send</van-button>
        </template>
      </van-field>
    </div>
    <div class="chatbot-content">
      <BotUi v-on:clicked_url="clicked_url"></BotUi>
    </div>

    <!-- 初始化的偏好-->
    <van-popup
        v-model="show_preference"
        :style="{width:'90%'}"
        :close-on-click-overlay="false"
        round
    >
      <van-nav-bar title='My Preference'/>
      <div class="phone_preference">
        <van-form @submit="submitPreference">
          <p style="padding:0 10px 0 16px; margin-bottom: 5px;">Please select no more than three brands you like.</p>
          <van-field name="brands" :rules="[{ required: true, message: 'Please select' }]">
            <template #input>
              <van-checkbox-group v-model="user_prefer.brands" :max="3" direction="horizontal">
                <van-checkbox name="Xiaomi" shape="square">Xiaomi</van-checkbox>
                <van-checkbox name="vivo" shape="square">vivo</van-checkbox>
                <van-checkbox name="Oppo" shape="square">Oppo</van-checkbox>
                <van-checkbox name="Samsung" shape="square">Samsung</van-checkbox>
                <van-checkbox name="Realme" shape="square">Realme</van-checkbox>
                <van-checkbox name="Motorola" shape="square">Motorola</van-checkbox>
                <van-checkbox name="Honor" shape="square">Honor</van-checkbox>
                <van-checkbox name="Huawei" shape="square">Huawei</van-checkbox>
                <van-checkbox name="ZTE" shape="square">ZTE</van-checkbox>
                <van-checkbox name="BLU" shape="square">BLU</van-checkbox>
                <van-checkbox name="Nokia" shape="square">Nokia</van-checkbox>
                <van-checkbox name="LG" shape="square">LG</van-checkbox>
                <van-checkbox name="Ulefone" shape="square">Ulefone</van-checkbox>
                <van-checkbox name="TCL" shape="square">TCL</van-checkbox>
                <van-checkbox name="OnePlus" shape="square">OnePlus</van-checkbox>
                <van-checkbox name="alcatel" shape="square">alcatel</van-checkbox>
                <van-checkbox name="Asus" shape="square">Asus</van-checkbox>
                <van-checkbox name="Lenovo" shape="square">Lenovo</van-checkbox>
                <van-checkbox name="Sony" shape="square">Sony</van-checkbox>
                <van-checkbox name="HTC" shape="square">HTC</van-checkbox>
                <van-checkbox name="Meizu" shape="square">Meizu</van-checkbox>
                <van-checkbox name="Wiko" shape="square">Wiko</van-checkbox>
                <van-checkbox name="Tecno" shape="square">Tecno</van-checkbox>
                <van-checkbox name="Lava" shape="square">Lava</van-checkbox>
                <van-checkbox name="Infinix" shape="square">Infinix</van-checkbox>
                <van-checkbox name="Google" shape="square">Google</van-checkbox>
                <van-checkbox name="Apple" shape="square">Apple</van-checkbox>
              </van-checkbox-group>
            </template>
          </van-field>

          <p style="padding:0 10px 0 16px; margin-bottom: 5px;">Your Maximum Budget: <span
              style="color: #B24040">${{ user_prefer.budget }}</span></p>
          <van-field name="budget" :rules="[{ required: true, message: 'please select' }]">
            <template #input>
              <van-slider :min="100" :max="1400" :step="100" v-model="user_prefer.budget"/>
            </template>
          </van-field>
          <p style="padding:0 10px 0 16px; margin-bottom: 5px;">Main Camera Minimum Resolution: <span
              style="color: #B24040">{{ user_prefer.cameras }}MP</span></p>
          <van-field name="cameras" :rules="[{ required: true, message: 'please select' }]">
            <template #input>
              <van-slider :min="0" :max="108" :step="6" v-model="user_prefer.cameras"/>
            </template>
          </van-field>
          <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit">Continue</van-button>
          </div>
        </van-form>
      </div>
    </van-popup>
    <!--  左侧 help-->
    <van-popup
        v-model="show_help"
        :style="{ height: '520px',width:'90%',overflow:'hidden'}"
        @close="greeting"
        :close-on-click-overlay="true"
        round
    >
      <div class="help">
        <van-nav-bar
            right-text="Close"
            :fixed="true"
            @click-right="show_help=!show_help"
        />
        <!--        <div style="position: fixed;top: 0">-->
        <!--          <van-button type="info" block @click="show_help=!show_help" round > Close</van-button>-->
        <!--        </div>-->
        <div
            style="width:100%; box-sizing: border-box; margin-top: 36px; position: absolute; top:0; left: 0;padding: 0 10px 10px 10px; overflow-y: scroll;-webkit-overflow-scrolling: touch;height: 480px">
          <h3>Tips for tuning the recommendations by phone features</h3>
          <h4>By brand:</h4>
          <ul>
            <li>"I like the iPhone."</li>
            <li>"I want to buy a Huawei mobile phone."</li>
          </ul>

          <h4>By price:</h4>
          <ul>
            <li>"I want to buy a cheaper price phone."</li>
            <li>"The price can be higher."</li>
          </ul>
          <h4>By resolution:</h4>
          <ul>
            <li>"I need a phone having better display."</li>
            <li>"I want a phone having higher resolution."</li>
          </ul>

          <h4> By storage:</h4>
          <ul>
            <li>"I need a phone with a large storage."</li>
            <li>"I need a phone having more space for saving my photos."</li>
          </ul>
          <h4>By computing performance:</h4>
          <ul>
            <li>"I want to buy a phone having larger RAM."</li>
            <li>"I want to buy a phone having better CPU."</li>
            <li>"I want to buy a phone running applications faster."</li>
          </ul>

          <h4>By operating system:</h4>
          <ul>
            <li>"I want to buy an Android phone."</li>
            <li>"I like the ios system."</li>
          </ul>
          <h4>By size:</h4>
          <ul>
            <li>"I like a light weight phone."</li>
            <li>"I want to buy a phone with a slim body."</li>
          </ul>
          <br>
        </div>
      </div>
    </van-popup>

    <!--右侧购物车-->
    <van-popup
        v-model="show_cart"
        closeable
        close-icon="close"
        position="right"
        round
        :style="{ height: '100%',width:'80%' }"
    >
      <div class="cart" style="margin-top:3em">
        <van-card v-for="item in phone_in_cart" :key="item.id"
                  :thumb="item.img">
          <template #title>
            <div style="font-size: 16px;font-weight: bolder;">{{ item.modelname }}</div>
          </template>
          <template #price>
            <div style="font-weight:bold;font-size:16px;color: #B24040">${{ item.price }}</div>
          </template>
          <template #num>
            <div>Rating:{{ item.rate }}</div>
          </template>
          <template #tags>
            <div>
              <van-tag plain type="primary" style="margin:2px">Storage:{{ item.storage }}</van-tag>
              <van-tag plain type="primary" style="margin:2px">RAM:{{ item.ram }}</van-tag>
              <van-tag plain type="primary" style="margin:2px">{{ item.os1 }}</van-tag>
              <van-tag plain type="primary" style="margin: 2px">{{ item.cam1 }}MP</van-tag>
              <van-tag plain type="primary" style="margin: 2px">{{ item.displaysize }}inches</van-tag>
              <van-tag plain type="primary" style="margin: 2px">{{ item.resolution1 }}*{{ item.resolution2 }}</van-tag>
              <van-tag plain type="primary" style="margin: 2px">{{ item.battery }}mAh</van-tag>
            </div>
          </template>
        </van-card>
      </div>
    </van-popup>

    <van-popup
        v-model="show_phone_page"
        closeable
        close-icon="close"
        position="left"
        round
        :style="{ height: '100%',width:'100%' }"
    >
      <div class="cart" style="margin-top:3em;height: 100%">
        <iframe style="width: 100%;height: 100%" :src="clicked_trans_url"/>
      </div>
    </van-popup>

    <!--    评分框-->
    <van-popup
        v-model="show_rate"
        :style="{width:'300px' }"
        :close-on-click-overlay="false"
        round
    >
      <div class="rate">
        <van-nav-bar title='Please rate this phone'/>
        <van-card
            :thumb="current_phone.img">
          <template #title>
            <div style="font-size: 16px;font-weight: bolder;">{{ current_phone.modelname }}</div>
          </template>
          <template #price>
            <div style="font-weight:bold;font-size:16px;color: #B24040">${{ current_phone.price }}</div>
          </template>
          <template #tags>
            <div>
              <van-tag plain type="primary" style="margin:2px">Storage:{{ current_phone.storage }}</van-tag>
              <van-tag plain type="primary" style="margin:2px">RAM:{{ current_phone.ram }}</van-tag>
              <van-tag plain type="primary" style="margin:2px">{{ current_phone.os1 }}</van-tag>
              <van-tag plain type="primary" style="margin: 2px">{{ current_phone.cam1 }}MP</van-tag>
              <van-tag plain type="primary" style="margin: 2px">{{ current_phone.displaysize }}inches</van-tag>
              <van-tag plain type="primary" style="margin: 2px">
                {{ current_phone.resolution1 }}*{{ current_phone.resolution2 }}
              </van-tag>
              <van-tag plain type="primary" style="margin: 2px">{{ current_phone.battery }}mAh</van-tag>
            </div>
          </template>
        </van-card>
        <div style="display: flex;justify-content: center;margin: 24px 0;">
          <van-rate v-model="current_phone.rate"/>
        </div>
        <van-button type="info" block @click="submitPhoneRate">Submit</van-button>
      </div>
    </van-popup>

    <!-- 提醒 -->
    <van-popup
        v-model="show_err_reminder"
        :style="{width:'80%'}"
        :close-on-click-overlay="false"
        round
    >
      <van-nav-bar title='A kind reminder'/>
      <div style="padding: 12px">
        <p>Please keep Lily’s preferences in mind when you pick mobile phones for her.</p>
        <ul>
          <li>1. She often uses her mobile phone to watch videos.</li>
          <li>2. She hates frequently charging her mobile phone.</li>
          <li>3. Her budget for purchasing a new mobile phone is 300 US dollars.</li>
        </ul>
        <h4 style="color: #B24040">I just want to add the phone to my cart!</h4>
        <p style="text-align: center">
          <van-button type="warning" @click="addToCart"> Yes</van-button>&nbsp;
          <van-button type="info" @click="tryAnother"> No</van-button>
        </p>
      </div>

    </van-popup>
    <!-- 去下一页   -->
    <van-popup
        v-model="show_next_page"
        :style="{width:'300px' }"
        :close-on-click-overlay="false"
        round
    >
      <div class="rate">
        <van-nav-bar title='Next Step'/>
        <div class="cart">
          <van-card v-for="item in phone_in_cart" :key="item.id"
                    :thumb="item.img">
            <template #title>
              <div style="font-size: 16px;font-weight: bolder;">{{ item.modelname }}</div>
            </template>
            <template #price>
              <div style="font-weight:bold;font-size:16px;color: #B24040">${{ item.price }}</div>
            </template>
            <template #num>
              <div>Rating:{{ item.rate }}</div>
            </template>
            <template #tags>
              <div>
                <van-tag plain type="primary" style="margin:2px">Storage:{{ item.storage }}</van-tag>
                <van-tag plain type="primary" style="margin:2px">RAM:{{ item.ram }}</van-tag>
                <van-tag plain type="primary" style="margin:2px">{{ item.os1 }}</van-tag>
                <van-tag plain type="primary" style="margin: 2px">{{ item.cam1 }}MP</van-tag>
                <van-tag plain type="primary" style="margin: 2px">{{ item.displaysize }}inches</van-tag>
                <van-tag plain type="primary" style="margin: 2px">{{ item.resolution1 }}*{{
                    item.resolution2
                  }}
                </van-tag>
                <van-tag plain type="primary" style="margin: 2px">{{ item.battery }}mAh</van-tag>
              </div>
            </template>
          </van-card>
        </div>
        <p v-if="identity_cue==='0'" style="padding:0 16px;color: black">I am glad you found these good phones for
          Lily. Now, you
          will be asked to complete a questionnaire regarding your experience of chatting with <b> RecBot (an automated
            sales chatbot)</b></p>
        <p v-if="identity_cue==='1'" style="padding:0 16px;color: black;">I am glad you found these good phones for
          Lily. Now, you
          will be asked to complete a questionnaire regarding your experience of chatting with <b>Susan (a sales
            assistant).</b></p>
        <van-button type="primary" block @click="nextPage">Next</van-button>
      </div>
    </van-popup>
  </div>
</template>

<script>
import BotUi from "../components/BotUi";
// 对象引入
import {botui} from '@/components/BotUi';
import {instance} from "@/request";

export default {
  name: "Assistant",
  components: {
    BotUi,
  },
  data: function () {
    return {
      //实验条件
      identity_cue: "0",
      explanation_style: "1",
      //控制功能
      show_err_reminder: false,
      loading: false,
      msg_btn_ctrl: true,
      show_help: true,
      show_rate: false,
      show_preference: false,
      show_next_page: false,
      help_showed_count: 1,
      show_cart: false,
      show_phone_page: false,
      phone_buttons: [
        {
          text: 'Add to cart',
          value: 'Add to cart'
        },
        {
          text: 'Next item',
          value: 'Next item'
        },
      ],

      //current action

      //critical的标识
      in_crit: false,
      crit_text_point: 0,
      crit_phone_point: [0, 0],

      //数据部分
      uuid: localStorage.getItem("uuid"),
      //uuid: 'e34cddc4a7ae47bb9f7badf9e44cf41e',
      clicked_trans_url: "",
      message: "",
      user_prefer: {
        brand: '',
        budget: 700,
        display_size: '',
        battery: '',
        weight: ''
      },
      phone_in_cart: [],
      current_phone: {},
      latest_dialog: [],
      //最后一次的动作
      last_action: "",
      //用户的名字
      username: "",
      bot_msg: ['I find this phone for you.', 'You may like this phone.', 'Please check this phone.']
    }
  },
  mounted() {
    this.explanation_style = localStorage.getItem("explanation_style")
    this.identity_cue = localStorage.getItem("identity_cue")
  },
  methods: {
    //从卡片组件里面获得点击事件的url
    clicked_url: function (childValue) {
      this.clicked_trans_url = "https://www.chatbot.fans:3000/?url=" + childValue
      console.log(this.clicked_trans_url)
      this.show_phone_page = true;
    },
    //默认对话
    bot: function (msg, style = "") {
      let config = {
        type: 'html',
        cssClass: style,
        loading: true,
        delay: 10,
        photo: "https://musicbot-1251052535.cos.ap-shanghai.myqcloud.com/phonebot/avatar1.png",
        content: msg
      };
      if (this.identity_cue === '1') {
        config.photo = "https://musicbot-1251052535.cos.ap-shanghai.myqcloud.com/phonebot/avatar2.png";
        config.delay = msg.length * 80
      }
      return botui.message.bot(config)
    },
    human: function (msg) {
      return botui.message.human({
        content: msg
      })
    },
    //提交手机偏好

    //商品卡片
    botPhoneCard: function (phone) {
      let config = {
        type: 'phone',
        loading: true,
        delay: 100,
        content: phone,
      }
      if (this.identity_cue === '1') {
        config.photo = "https://musicbot-1251052535.cos.ap-shanghai.myqcloud.com/phonebot/avatar2.png";
        config.delay = 1600
      }
      botui.message.bot(config).then(() => {
        console.log(botui)
        botui.action.button({
          addMessage: false,
          human: false,
          action: this.phone_buttons
        }).then((res) => {
          //判断点了什么按钮
          if (res.text === 'Add to cart') {
            if (this.checkBeforeToCart()) {
              this.addToCart(this.current_phone);
            } else {
              this.show_err_reminder = true;
            }
          }
          if (res.text === 'Next item') {
            this.tryAnother();
          }
          if (res.text === 'Let bot suggest') {
            this.letBotSuggest()
          }
        })
      })
    },

    //初始化用户偏好
    submitPreference() {
      this.user_prefer.uuid = localStorage.getItem('uuid')
      this.user_prefer.preferT = new Date().getTime();
      this.user_prefer.explanation_style = this.explanation_style
      instance.post('/chat/prefer', this.user_prefer).then((res) => {
        //console.log(res)
        if (res.data.status === 1) {
          this.loading = false;
          this.show_preference = false;
          this.current_phone = res.data.phone;
          //添加操作记录
          this.latest_dialog.push({
            "agent": "robot",
            "action": "Initialize",
            "timestamp": new Date().getTime()
          })
          this.bot(res.data.msg, 'explanation').then(() => {
            this.botPhoneCard(this.current_phone);
            this.msg_btn_ctrl = false;
          })
        } else {
          this.loading = false;
          this.$toast("Please read and accept the informed consent first.")
        }
      }).catch((err) => {
        console.log(err.message);
        this.loading = false;
        this.$toast("Network error, please try again.");
      })
    },

    //发送用户消息
    sendMessage: function () {
      botui.action.hide();
      //先禁用按钮
      if (this.message.length >= 2) {
        //可以发送
        this.msg_btn_ctrl = true;
        botui.message.human({
          content: this.message,
        }).then(() => {
          //这里是问名字
          if (this.last_action === 'ask_username') {
            this.username = this.message;
            this.msg_btn_ctrl = false;
            this.message = null;
            this.ask_prefer()
            this
          } else {
            this.last_action = 'sendMessage';
            this.latest_dialog.push({
              "agent": "you",
              "text": this.message,
              "modality": "typing",
              "action": "User_Critique",
              "critique": [],
              "critiqued_item": this.current_phone.id,
              "timestamp": new Date().getTime()
            })
            instance.post('/chat/userMessage', {
              msgT: new Date().getTime(),
              message: this.message,
              explanation_style: this.explanation_style,
              logger: this.latest_dialog,
              uuid: localStorage.getItem('uuid'),
            }).then((res) => {
              console.log(res);
              this.current_phone = res.data.phone;
              this.latest_dialog = [];
              //let msg = this.bot_msg[this.randomNum(0, 2)]
              this.bot(res.data.msg, 'explanation').then(() => {
                this.botPhoneCard(this.current_phone);
              });
              this.msg_btn_ctrl = false;
              this.message = null;
            }).catch(() => {
              this.msg_btn_ctrl = false;
              this.$toast('Please try again.');
            })
          }
        })
      } else {
        this.msg_btn_ctrl = false;
        this.$toast('Please enter more information.');
      }

    },

    //加入购物车前的检查
    checkBeforeToCart: function () {
      if (this.current_phone.battery <= 4050) return false
      if (this.current_phone.price > 300) return false
      return this.current_phone.displaysize > 6.4;
    },
    //加入购物车
    addToCart() {
      this.show_err_reminder = false;
      this.last_action = "addToCart";
      this.bot("Please rate your liked phone.").then(() => {
        this.show_rate = true
      })
      this.latest_dialog.push({
        "agent": "you",
        "action": "Accept_Item",
        "timestamp": new Date().getTime()
      })
    },

    //手机评分
    submitPhoneRate() {
      //console.log(this.crit_phone_point);
      this.last_action = 'submitPhoneRate';
      if (this.current_phone.rate) {
        this.phone_in_cart.push(this.current_phone);
        this.show_rate = false;
        if (this.phone_in_cart.length === 3) {
          this.show_next_page = true;
        } else {
          instance.post("/chat/updatemodel", {
            uuid: this.uuid,
            logger: this.latest_dialog,
            explanation_style: this.explanation_style,
            lTime: new Date().getTime(),
          }).then((res) => {
            this.latest_dialog = [];
            this.current_phone = res.data.phone;
            this.bot(res.data.msg, 'explanation').then(() => {
              this.botPhoneCard(this.current_phone);
            });
          })
        }
      } else {
        this.$toast("Please rate this phone first.")
      }
    },

    //再来一个推荐
    tryAnother() {
      this.show_err_reminder = false;
      this.last_action = "tryAnother";
      botui.message.human({
        content: "Show another phone",
      }).then(() => {
        this.latest_dialog.push({
          "agent": "you",
          "action": "Next",
          "timestamp": new Date().getTime()
        })
        instance.post("/chat/updatemodel", {
          uuid: this.uuid,
          logger: this.latest_dialog,
          explanation_style: this.explanation_style,
          lTime: new Date().getTime(),
        }).then((res) => {
          this.latest_dialog = [];
          this.current_phone = res.data.phone;
          this.bot(res.data.msg, 'explanation').then(() => {
            this.botPhoneCard(this.current_phone);
          });
        })
      })
    },

//左上角tips部分
    clickHelp: function () {
      this.show_help = true;
      this.help_showed_count += 1;
    },

//初始化引导语的入口
    greeting: function () {
      if (this.help_showed_count === 1) {
        // 初始状态
        let msg = "Hey! I’m RecBot, an <b>automated chatbot</b> at Phoneshop."
        if (this.identity_cue === '1') msg = "Hello! I’m Susan, <b> a sales assistant</b> working at Phoneshop."
        this.bot(msg).then(() => {
          this.ask_name()
        })
      }
    },
    ask_prefer: function () {
      this.last_action = 'ask_prefer'
      this.msg_btn_ctrl = true;
      let username = "Participant.";
      if (this.identity_cue === '1') {
        username = this.username + '.';
      }
      let msg = username + " I’m happy to help you with your purchase. We have all different types of mobile phones."
      this.bot(msg).then(() => {
        return this.bot("To ensure that I make the most suitable recommendations for you, I’d like to ask you some questions.")
      }).then(() => {
        return this.bot("What is your maximum budget for buying a phone? ")
      }).then(() => {
        botui.action.button({
          addMessage: false,
          human: false,
          action: [
            {
              text: '$200',
              value: '200'
            }, {
              text: '$300',
              value: '300'
            },
            {
              text: '$400',
              value: '400'
            },
          ]
        }).then(res => {
          this.user_prefer.budget = res.value;
          return this.human(res.text)
        }).then(() => {
          let msg = "Okay."
          if (this.identity_cue === '1') msg = "Okay. I know your budget is $" + this.user_prefer.budget + '.'
          return this.bot(msg)
        }).then(() => {
          this.bot("By the way, do you have any specific requirements in the following aspects?").then(() => {
            botui.action.button({
              addMessage: true,
              human: true,
              action: [
                {
                  text: 'Display size',
                  value: 'display'
                }, {
                  text: 'Battery capacity',
                  value: 'battery'
                },
                {
                  text: 'Brand',
                  value: 'brand'
                },
                {
                  text: 'Weight',
                  value: 'weight'
                },
                {
                  text: 'No Preference',
                  value: 'no'
                },
              ]
            }).then(res => {
              switch (res.value) {
                case 'display':
                  this.ask_size()
                  break
                case 'battery':
                  this.ask_battery();
                  break;
                case 'brand':
                  this.ask_brand();
                  break;
                case 'weight':
                  this.ask_weight();
                  break
                case 'no':
                  this.submitPreference()
                  break;
              }
            })
          })
        })
      })
    },
    ask_name: function () {
      return this.bot("what should I call you?").then(() => {
        this.msg_btn_ctrl = false
        this.last_action = 'ask_username'
      })
    }
    ,
//
    ask_size: function () {
      let msg = "Okay."
      this.last_action = 'ask_size'
      if (this.identity_cue === '1') msg = "Okay. I see the display size of the mobile phone is important to you."
      this.bot(msg).then(() => {
        this.bot(" Which display size are you looking for?").then(() => {
          botui.action.button({
            addMessage: true,
            human: true,
            action: [
              {
                text: 'Small',
                value: 'Small'
              }, {
                text: 'Medium',
                value: 'Medium'
              },
              {
                text: 'Large',
                value: 'Large'
              },
            ]
          }).then(res => {
            this.user_prefer.display_size = res.value
            this.submitPreference()
          })
        })
      })
    }
    ,
    ask_battery: function () {
      this.last_action = 'ask_battery'
      let msg = "Okay."
      if (this.identity_cue === '1') msg = "Okay. I see the battery of the mobile phone is important to you."
      this.bot(msg).then(() => {
        this.bot(" Which battery capacity are you looking for?").then(() => {
          botui.action.button({
            addMessage: false,
            human: true,
            action: [
              {
                text: 'Small',
                value: 'Small'
              }, {
                text: 'Medium',
                value: 'Medium'
              },
              {
                text: 'Large',
                value: 'Large'
              },
            ]
          }).then(res => {
            this.user_prefer.battery = res.value
            this.submitPreference()
          })
        })
      })
    }
    ,
    ask_brand: function () {
      this.last_action = 'ask_brand'
      let msg = "Okay."
      if (this.identity_cue === '1') msg = "Okay. I see the brand of the mobile phone is important to you."
      this.bot(msg).then(() => {
        this.bot(" Which brand are you looking for?").then(() => {
          botui.action.button({
            addMessage: false,
            human: true,
            action: [
              {
                text: 'Apple',
                value: 'Apple'
              }, {
                text: 'Samsung',
                value: 'Samsung'
              },
              {
                text: 'Huawei',
                value: 'Huawei'
              },
              {
                text: 'Other',
                value: 'Other'
              },
            ]
          }).then(res => {
            this.user_prefer.brand = res.value
            this.submitPreference()
          })
        })
      })
    },
    ask_weight: function () {
      this.last_action = this.ask_weight
      let msg = "Okay."
      if (this.identity_cue === '1') msg = "Okay. I see the weight of the mobile phone is important to you."
      this.bot(msg).then(() => {
        this.bot(" Which weight range are you looking for?").then(() => {
          botui.action.button({
            addMessage: false,
            human: true,
            action: [
              {
                text: 'Light',
                value: 'Light'
              }, {
                text: 'Medium',
                value: 'Medium'
              },
              {
                text: 'Heavy',
                value: 'Heavy'
              },
            ]
          }).then(res => {
            this.user_prefer.weight = res.value
            this.submitPreference()
          })
        })
      })
    },

//购物车部分
    clickCart: function () {
      this.show_cart = true
    }
    ,
//跳到下一页
    nextPage: function () {
      instance.post('/chat/page2', {
        'page2T': new Date().getTime(),
        'phonelist': this.phone_in_cart,
        'uuid': localStorage.getItem('uuid')
      }).then((res) => {
        console.log(res)
        this.$router.replace('/que1').catch((err) => {
          console.log(err.message)
        });
      })
    }
    ,

    randomNum: function (minNum, maxNum) {
      switch (arguments.length) {
        case 1:
          return parseInt(Math.random() * minNum + 1, 10);
        case 2:
          return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
        default:
          return 0;
      }
    }
  }
  ,
  computed: {
    // 计算属性的 getter
    cart_item_count: function () {
      return this.phone_in_cart.length;
    }
  }
}
</script>
<style>

.explanation .botui-message-content.html {
  background-color: #FFF0C5 !important;
}
</style>
