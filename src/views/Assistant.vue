<template>
  <div class="chatbot">
    <van-nav-bar title='' @click-left="clickHelp" left-text=""
                 class="chatbot-header">
      <template #left>
        <van-icon name="info-o" size="16"><span
            style="color: #1989fa;font-size: 16px;font-family:-apple-system,BlinkMacSystemFont,'Helvetica Neue',Helvetica,Segoe UI,Arial,Roboto,'PingFang SC',miui,'Hiragino Sans GB','Microsoft Yahei',sans-serif ">Tips</span>
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
      <BotUi @clicked_url="clicked_url" @card_add_to_cart="checkBeforeToCart"></BotUi>
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
        @close="show_help=false"
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
          <h4>You may refer to the following examples when you chat with the agent to adjust the recommendation
            results.</h4>

          <h4>By price:</h4>
          <ul>
            <li>"I want to buy a cheaper price phone."</li>
            <li>"The price can be higher."</li>
          </ul>

          <h4>By brand:</h4>
          <ul>
            <li>"I like the iPhone."</li>
            <li>"I want to buy a Huawei mobile phone."</li>
          </ul>

          <h4>By size:</h4>
          <ul>
            <li>"I like a light weight phone."</li>
            <li>"I want to buy a phone with a slim body."</li>
          </ul>

          <h4>By display:</h4>
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
              <van-tag plain type="primary" style="margin:2px">Storage:{{ item.storage }}GB</van-tag>
              <van-tag plain type="primary" style="margin:2px">RAM:{{ item.ram }}GB</van-tag>
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
        :style="{width:'300px'}"
        :close-on-click-overlay="false"
        round
    >
      <div class="rate">
        <van-nav-bar title='Confirm'/>
        <p style="padding:0 8px">Are your sure to select this phone?</p>
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
              <van-tag plain type="primary" style="margin:2px">Storage:{{ current_phone.storage }}GB</van-tag>
              <van-tag plain type="primary" style="margin:2px">RAM:{{ current_phone.ram }}GB</van-tag>
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
        <van-button type="danger" block @click="submitPhoneRate">Confirm</van-button>
        <van-button type="info" block @click="show_rate=false">Cancel</van-button>
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
        <h4 style="color: #B24040">It seems this phone cannot meet the requirement.</h4>
        <p>Please keep in mind that your budget is 300 US dollars.</p>
        <p style="text-align: center">
          <van-button type="info" @click="tryAnother"> Check other phones</van-button>
          <br>
          <br>
          <a style="color: #1989fa" @click="addToCart">Keep current selection </a>
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
        <p>I am glad you found these good phones for
          you. Now, you
          will be asked to complete a questionnaire regarding your experience of chatting with <b> PhoneBot (an
            automated
            sales chatbot)</b></p>
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
      identity_cue: "",
      explanation_style: "",
      //控制功能
      try_another_count: 0,
      //是否展示过输入提示。
      explanation_styple_control: 'explanation',
      can_show_enter_tips: true,
      show_err_reminder: false,
      loading: false,
      msg_btn_ctrl: true,
      show_help: false,
      show_rate: false,
      show_preference: false,
      show_next_page: false,
      help_showed_count: 1,
      show_cart: false,
      show_phone_page: false,
      phone_buttons: [
        {
          text: 'Next item',
          value: 'Next item'
        },
      ],

      //current action

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
      current_recommended_phones: [],
      latest_dialog: [],
      recommended_phones: [],
      //log
      log: [],
      //最后一次的动作
      last_action: "",
      //用户的名字
      username: "",
      bot_msg: ['I find these phones for you.', 'You may like these phones.', 'Please check these phones.']
    }
  },
  mounted() {
    this.explanation_style = localStorage.getItem("explanation_style")
    this.identity_cue = localStorage.getItem("identity_cue")
    this.greeting()
  },
  methods: {
    //从卡片组件里面获得点击事件的url
    clicked_url: function (childValue) {
      this.clicked_trans_url = "https://www.chatbot.fans:3000/?url=" + childValue
      this.show_phone_page = true;
    },
    //添加日志打点
    addLog: function (type, actionName, content) {
      let logtime = new Date().getTime();
      let log = {'type': type, 'action': actionName, 'content': content, 'logtime': logtime}
      this.log.push(log)
    },

    //默认对话
    bot: function (msg, style = "") {
      let config = {
        type: 'html',
        cssClass: style,
        loading: true,
        delay: 600,
        photo: "https://musicbot-1251052535.cos.accelerate.myqcloud.com/phonebot/avatar1.png",
        content: msg
      };
      this.addLog('bot', this.last_action, msg)
      return botui.message.bot(config)
    },
    human: function (msg) {
      this.addLog('human', this.last_action, msg)
      return botui.message.human({
        content: msg
      })
    },

    //商品卡片
    botPhoneCard: function (phones) {
      //把当前手机加入显示过的手机列表
      this.$store.commit('addShowedPhone', phones[0])
      this.$store.commit('addShowedPhone', phones[1])
      this.$store.commit('addShowedPhone', phones[2])
      this.recommended_phones.push(phones[0].id, phones[1].id, phones[2].id)
      let config = {
        type: 'list',
        loading: true,
        delay: 100,
        content: phones
      }
      if (this.explanation_style === '1') {
        config['type'] = 'carousel'
      }
      this.addLog('bot', 'phonecard', phones[0].id + '|' + phones[0].modelname)
      this.addLog('bot', 'phonecard', phones[1].id + '|' + phones[1].modelname)
      this.addLog('bot', 'phonecard', phones[2].id + '|' + phones[2].modelname)
      botui.message.bot(config).then(() => {
        botui.action.button({
          addMessage: false,
          human: false,
          action: this.phone_buttons
        }).then((res) => {
          if (res.text === 'Next item') {
            this.tryAnother();
          }
        })
      })
    },

    // 提示可以输入
    enter_tips: function () {
      this.last_action = 'enter_tips'
      this.bot("If you are not satisfied with current recommendations, you can modify your requirement by typing in the input field.").then(() => {
        this.bot("For example, you could say:").then(() => {
          return this.bot("\"I need a (small / medium / large) display\"")
        }).then(() => {
          return this.bot("\"I need a phone with (low / medium / high) battery capacity\"")
        }).then(() => {
          botui.action.button({
            addMessage: false,
            human: true,
            action: [
              {
                text: 'Next recommendation',
                value: 'next'
              }, {
                text: 'Modify my requirement',
                value: 'modify'
              }
            ]
          }).then((res) => {
            //再也不显示这个提示了
            this.can_show_enter_tips = false;
            if (res.value === 'next') {
              botui.action.hide();
              this.tryAnother()
            } else {
              this.human("Modify my requirement").then(() => {
                this.bot("OK, tell me your requirement.").then(() => {
                })
              })
            }
          })
        })
      })
    },
//初始化用户偏好
    submitPreference() {
      this.user_prefer.username = this.username;
      this.user_prefer.uuid = localStorage.getItem('uuid');
      this.user_prefer.preferT = new Date().getTime();
      this.user_prefer.explanation_style = this.explanation_style
      instance.post('/chat/prefer', this.user_prefer).then((res) => {
        //console.log(res)
        if (res.data.status === 1) {
          this.loading = false;
          this.show_preference = false;
          //添加操作记录
          this.latest_dialog.push({
            "agent": "robot",
            "action": "Initialize",
            "timestamp": new Date().getTime()
          })
          this.bot(res.data.msg, this.explanation_styple_control).then(() => {
            this.current_recommended_phones = res.data.phone;
            this.botPhoneCard(res.data.phone);
            this.msg_btn_ctrl = false;
          });
        } else {
          this.loading = false;
          this.$toast("Please read and accept the informed consent first.")
        }
      }).catch((err) => {
        console.log(err.message);
        this.loading = false;
        this.$toast("Network error, please try again.");
      })
    }
    ,

//发送用户消息
    sendMessage: function () {
      if (this.message.length >= 2) {
        //先移除按钮
        botui.action.hide();
        //可以发送
        this.msg_btn_ctrl = true;
        this.human(this.message).then(() => {
          //这里是问名字
          if (this.last_action === 'ask_username') {
            this.username = this.message;
            this.msg_btn_ctrl = false;
            this.message = null;
            this.ask_prefer()
          } else {
            this.last_action = 'sendMessage';
            this.latest_dialog.push({
              "agent": "you",
              "text": this.message,
              "modality": "typing",
              "action": "User_Critique",
              "critique": [],
              "critiqued_item": this.current_recommended_phones[0].id,
              "timestamp": new Date().getTime()
            })
            instance.post('/chat/userMessage', {
              msgT: new Date().getTime(),
              message: this.message,
              explanation_style: 0,
              logger: this.latest_dialog,
              phone: this.$store.state.current_phone,
              uuid: localStorage.getItem('uuid'),
            }).then((res) => {
              //console.log(res);
              this.current_recommended_phones = res.data.phone;
              this.latest_dialog = [];

              this.bot("Ok, I see it!").then(() => {
                this.bot(res.data.msg, this.explanation_styple_control).then(() => {
                  this.botPhoneCard(this.current_recommended_phones);
                })
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
    checkBeforeToCart: function (phone_id) {
      //botui.action.hide();
      if (phone_id !== this.current_phone.id) {
        this.current_phone = this.$store.state.showed_phones[phone_id]
        console.log(this.current_phone)
      }
      if (this.current_phone.price <= 300) {
        this.addToCart(phone_id);
      } else {
        //提示当前的手机是有过提醒的
        this.$store.commit('setWarning', phone_id)
        this.show_err_reminder = true;
      }
    },

//加入购物车
    addToCart() {
      this.show_err_reminder = false;
      this.last_action = "addToCart";
      this.show_rate = true;
      this.latest_dialog.push({
        "agent": "you",
        "action": "Accept_Item",
        "timestamp": new Date().getTime()
      })
      this.addLog('human', this.last_action, this.current_phone.id + '|' + this.current_phone.modelname)
    },

//手机评分
    submitPhoneRate() {
      if (this.recommended_phones.length < 5) {
        this.$toast("Please view at least 5 phones.")
        return
      }
      console.log(this.current_phone);
      //console.log(this.crit_phone_point);
      this.show_rate = false;
      this.$store.commit('selectedPhone', this.current_phone);
      //console.log(this.$store.state.selected_phone)
      instance.post('/api/first_select', {
        'first_select': this.current_phone.id,
        'uuid': localStorage.getItem("uuid"),
      }).then((res) => {
        if (res.data.status === 1) {
          this.$router.replace('/step4').catch((err) => {
            console.log(err.message)
          });
        } else {
          this.$toast("Network error, please try again later.")
        }
      })
      //this.$router.push({path: '/questionnaire'});
    },

//再来一个推荐
    tryAnother() {
      this.try_another_count += 1;
      this.show_err_reminder = false;
      if (this.can_show_enter_tips && this.last_action === 'tryAnother') {
        this.enter_tips()
      } else {
        this.last_action = "tryAnother";
        this.human("Show other phones",
        ).then(() => {
          this.latest_dialog.push({
            "agent": "you",
            "action": "Next",
            "timestamp": new Date().getTime()
          })
          console.log(this.current_phone);
          instance.post("/chat/updatemodel", {
            uuid: this.uuid,
            logger: this.latest_dialog,
            try_another_count: this.try_another_count,
            explanation_style: 0,
            phone: this.current_recommended_phones[0],
            lTime: new Date().getTime(),
          }).then((res) => {
            this.latest_dialog = [];
            this.current_recommended_phones = res.data.phone;
            let seed = this.try_another_count % 4;
            let res_temp = ["OK, this could also be a good choice.", 'Sure, you may also want to try this.', "OK, maybe you can check this.", "Sure, this phone is worth a try."]
            this.bot(res_temp[seed]).then(() => {
              this.bot(res.data.msg, this.explanation_styple_control).then(() => {
                this.botPhoneCard(this.current_recommended_phones);
              });
            })
          })
        })
      }
    },

//左上角tips部分
    clickHelp: function () {
      this.show_help = true;
      this.help_showed_count += 1;
    },

//初始化引导语的入口

    greeting: function () {
      // 初始状态
      let msg = "Hey! I’m RecBot, an <b>automated chatbot</b> working at Phoneshop."
      this.bot(msg).then(() => {
        this.bot("I can help you find the most suitable phone.").then(() => {
          this.bot("Please wait a moment, I am working on generating recommendations for you.").then(() => {
            this.user_prefer.budget = 300;
            this.submitPreference()
          })
        })
      })
    },
    ask_prefer: function () {
      this.last_action = 'ask_prefer'
      this.msg_btn_ctrl = true;
      let username = "Participant.";
      let msg = username + " I’m happy to help you with your purchase. We have different types of mobile phones."
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
          this.user_prefer.budget = 400;
          return this.human(res.text)
        }).then(() => {
          let msg = "Okay."
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
              this.addLog('human', this.last_action, res.text)
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
      return this.bot("What should I call you?").then(() => {
        this.msg_btn_ctrl = false
        this.last_action = 'ask_username'
      })
    },

    ask_size: function () {
      let msg = "Okay."
      this.last_action = 'ask_size'
      this.bot(msg).then(() => {
        this.bot(" Which display size are you looking for?").then(() => {
          botui.action.button({
            addMessage: true,
            human: true,
            action: [
              {
                text: 'Small (2.4″ - 6.2″)',
                value: 'Small'
              }, {
                text: 'Medium (6.2″ - 6.5″)',
                value: 'Medium'
              },
              {
                text: 'Large (6.5″ - 8.0″)',
                value: 'Large'
              },
            ]
          }).then(res => {
            this.addLog('human', this.last_action, res.text)
            this.user_prefer.displaysize = res.value
            this.submitPreference()
          })
        })
      })
    },
    ask_battery: function () {
      this.last_action = 'ask_battery'
      let msg = "Okay."
      this.bot(msg).then(() => {
        this.bot(" Which battery capacity are you looking for?").then(() => {
          botui.action.button({
            addMessage: true,
            human: true,
            action: [
              {
                text: 'Small (1300mAh - 4000mAh)',
                value: 'Small'
              }, {
                text: 'Medium (4000mAh - 4500mAh)',
                value: 'Medium'
              },
              {
                text: 'Large(4500mAh - 13000mAh)',
                value: 'Large'
              },
            ]
          }).then(res => {
            this.addLog('human', this.last_action, res.text)
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
      this.bot(msg).then(() => {
        this.bot(" Which brand are you looking for?").then(() => {
          botui.action.button({
            addMessage: true,
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
            this.addLog('human', this.last_action, res.text)
            this.user_prefer.brand = res.value
            this.submitPreference()
          })
        })
      })
    }
    ,
    ask_weight: function () {
      this.last_action = this.ask_weight
      let msg = "Okay."
      this.bot(msg).then(() => {
        this.bot(" Which weight range are you looking for?").then(() => {
          botui.action.button({
            addMessage: true,
            human: true,
            action: [
              {
                text: 'Light (117g-173g)',
                value: 'Light'
              }, {
                text: 'Medium(173g-181g)',
                value: 'Medium'
              },
              {
                text: 'Heavy(181g-203g)',
                value: 'Heavy'
              },
            ]
          }).then(res => {
            this.addLog('human', this.last_action, res.text)
            this.user_prefer.weight = res.value
            this.submitPreference()
          })
        })
      })
    }
    ,

//购物车部分
    clickCart: function () {
      this.show_cart = true
    }
    ,
//跳到下一页
    nextPage: function () {
      instance.post('/chat/page2', {
        'page2T': new Date().getTime(),
        'cart': JSON.stringify(this.phone_in_cart),
        'log': JSON.stringify(this.log),
        'uuid': localStorage.getItem('uuid')
      }).then((res) => {
        console.log(res)
        this.$router.replace('/que1').catch((err) => {
          console.log(err.message)
        });
      })
    }
    ,
  },

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

.van-checkbox--horizontal {
  margin-bottom: 6px;
}

.chatbot-header {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  z-index: 1;
  height: 46px;
}

.chatbot-send {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 1;
}

.chatbot-content {
  position: absolute;
  top: 46px;
  bottom: 54px;
  left: 0;
  right: 0;
  overflow: auto;
}

.help {
  box-sizing: border-box;
}

.help p {
  font-size: 18px;
  text-align: justify;
}

.botui-container {
  background: #F1F1F1;
  font-size: 16px;
  font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Segoe UI, Arial, Roboto, 'PingFang SC', miui, 'Hiragino Sans GB', 'Microsoft Yahei', sans-serif;
}

.botui-messages-container {
  padding: 10px;
}

.botui-message-content {
  background-color: #FFF;
  color: #000;
  width: auto;
  max-width: 77%;
  display: inline-block;
  padding: 13px 10px;
}

.botui-message-content.loading {
  background-color: #fff;
}

.botui-message-content.text {
  line-height: 1.4
}

.botui-message-content.human {
  background-color: #1989fa;
  color: white;
}

.error-card .botui-message-content.html {
  box-sizing: border-box;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, .1);
  font-weight: 500;
  max-width: 87.5%;
}

.error-card .botui-message-content.html span {
  display: flex;
  align-items: center;
}

.summary-card .botui-message-content.html {
  box-sizing: border-box;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, .1);
  max-width: 87.5%;
}

.botui-message-content.html span div.icon {
  flex: 0 0 32px;
  height: 32px;
  margin-right: 6px;
}

button.botui-actions-buttons-button {
  margin-top: 6px;
  margin-bottom: 6px;
  border-radius: 4px;
  border: 1px solid #1989fa;
  font-weight: normal;
  text-align: left;
  background-color: transparent;
  transition-duration: .28s;
  transition-property: box-shadow, transform, opacity;
  transition-timing-function: cubic-bezier(.4, 0, .2, 1);
  color: #1989fa;
  font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Segoe UI, Arial, Roboto, 'PingFang SC', miui, 'Hiragino Sans GB', 'Microsoft Yahei', sans-serif;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 25%)
}

.botui-actions-container {
  margin-top: -20px;
  padding: 9px 10px 9px 19px;
}

.v-bottom-sheet.v-dialog {
  overflow: auto !important;
}

.profil.agent {
  float: left;
  margin-right: 4px;
}

.profil {
  width: 43px;
  height: 43px;
  position: relative;
  background-repeat: no-repeat;
}

.profil > img.agent {
  border-radius: 0;
}

.profil > img {
  width: 43px;
  height: 43px;
  /*border: 2px solid #e8e8e8;*/
}


.html span p {
  margin-top: 0;
  margin-bottom: 0.5em;
}

.html span p:last-child {
  margin-top: 0;
  margin-bottom: 0;
}

@keyframes avatar {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: -688px, 0;
  }
}

.van-popup__close-icon {
  color: #1989fa !important;
}
</style>
