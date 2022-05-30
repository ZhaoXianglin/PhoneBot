<template>
  <div class="chatbot">
<!--    <div class="avatar_back">-->
<!--      <div class="avatar" v-bind:class="{avatar_ani:ava_css}"></div>-->
<!--    </div>-->
    <van-nav-bar title='' @click-left="clickHelp" @click-right="clickCart" left-text=""
                 right-text="Cart" class="chatbot-header">
      <template #left>
        <van-icon name="info-o" size="16"> Tips</van-icon>
      </template>
      <template #right>
        <van-icon name="cart-o" size="16" :badge="cart_item_count"> Cart</van-icon>
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
          <p style="padding:0 10px 0 16px; margin-bottom: 5px;">Please select three brands you like.</p>
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
            <van-button round block type="info" native-type="submit">Summit</van-button>
          </div>
        </van-form>
      </div>
    </van-popup>
    <!--  左侧 help-->
    <van-popup
        v-model="show_help"
        closeable
        close-icon="close"
        :style="{ height: '80%',width:'90%'}"
        @click-close-icon="closeHelp"
        :close-on-click-overlay="false"
        round
    >
      <div class="help">
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
        <van-button type="primary" block @click="submitPhoneRate">Submit</van-button>
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
        <p style="padding:0 16px;">These are your favorite phones. Let's move to the next step.</p>
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
  name: "ChatbotwithExpAva",
  components: {
    BotUi,
  },
  data: function () {
    return {
      //控制功能
      loading: false,
      msg_btn_ctrl: true,
      show_help: true,
      show_rate: false,
      show_preference: false,
      show_next_page: false,
      help_showed_count: 1,
      show_cart: false,
      ava_css: false,
      ava_counter: 0,
      show_phone_page:false,
      timer: "",
      phone_buttons: [
        {
          text: 'Add to cart',
          value: 'Add to cart'
        },
        {
          text: 'Try another',
          value: 'Show another phone.'
        },
      ],

      //critical的标识
      in_crit: false,
      crit_text_point: 0,
      crit_phone_point: [0, 0],

      //数据部分
      uuid: "e34cddc4a7ae47bb9f7badf9e44cf41e",
      message: "",
      clicked_trans_url:"",
      user_prefer: {
        brands: [],
        budget: 700,
        cameras: 12,
      },
      phone_in_cart: [],
      current_phone: {},
      latest_dialog: [],
      last_action: "",
      critical_data: []
    }
  },
  methods: {
    //从卡片组件里面获得点击事件的url
    clicked_url: function (childValue){
      this.clicked_trans_url = "https://www.chatbot.fans:3000/?url="+childValue
      console.log(this.clicked_trans_url)
      this.show_phone_page = true;
    },
    //默认对话
    bot: function (msg) {
      return botui.message.bot({
        type: 'html',
        loading: true,
        photo: require("../assets/imgs/bg.png"),
        delay: 1600,
        content: msg
      })
    },
    //提交手机偏好

    //商品卡片
    botPhoneCard: function (phone) {
      botui.message.bot({
        type: 'phone',
        loading: true,
        delay: 1600,
        content: phone,
      }).then(() => {
        botui.action.button({
          addMessage: false,
          human: false,
          action: this.phone_buttons
        }).then((res) => {
          //判断点了什么按钮
          if (res.text === 'Add to cart') {
            this.addToCart(this.current_phone);
          }
          if (res.text === 'Try another') {
            this.tryAnother();
          }
        })
      })
    },

    //初始化用户偏好
    submitPreference(values) {
      if (values.brands.length < 1) {
        this.$toast("Please select at last one brand.");
      } else {
        this.loading = true;
        values['uuid'] = localStorage.getItem('uuid');
        values['preferT'] = new Date().getTime();
        instance.post('/api/prefer', values).then((res) => {
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
            this.bot("Great! Now I have found some phones based on your preference. You can add the phone of your interest to the shopping cart.").then(() => {
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
      }
    },

    //发送用户消息
    sendMessage: function () {
      this.last_action = 'sendMessage';
      botui.action.hide();
      if (this.in_crit) {
        this.in_crit = false;
        this.crit_text_point = 0;
        this.crit_phone_point = [0, 0];
      }
      //先禁用按钮
      if (this.message.length >= 2) {
        //可以发送
        this.msg_btn_ctrl = true;
        botui.message.human({
          content: this.message,
        }).then(() => {
          this.latest_dialog.push({
            "agent": "you",
            "text": this.message,
            "modality": "typing",
            "action": "User_Critique",
            "critique": [],
            "critiqued_item": this.current_phone.id,
            "timestamp": new Date().getTime()
          })
          instance.post('/api/userMessage', {
            msgT: new Date().getTime(),
            message: this.message,
            logger: this.latest_dialog,
            uuid: localStorage.getItem('uuid'),
          }).then((res) => {
            console.log(res);
            this.current_phone = res.data.phone;
            this.latest_dialog = [];
            this.bot(res.data.msg).then(() => {
              this.botPhoneCard(this.current_phone);
            });
            this.msg_btn_ctrl = false;
            this.message = null;
          }).catch(() => {
            this.msg_btn_ctrl = false;
            this.$toast('Please try again.');
          })
        })
      } else {
        this.msg_btn_ctrl = false;
        this.$toast('Please enter more information.');
      }

    },

    //加入购物车
    addToCart() {
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
      console.log(this.crit_phone_point);
      this.last_action = 'submitPhoneRate';
      if (this.current_phone.rate) {
        this.phone_in_cart.push(this.current_phone);
        this.show_rate = false;
        if (this.phone_in_cart.length === 3) {
          this.show_next_page = true;
        } else {
          if (this.in_crit) {
            if (this.crit_text_point < 3 && this.crit_phone_point[1] === 3) {
              this.crit_phone_point[1] = 0
              this.crit_phone_point[0] += 1
              this.crit_text_point += 1
            }
            if (this.crit_text_point < 3 && this.crit_phone_point[1] === 0) {
              //需要bot 说话
              botui.message.bot({
                type: 'html',
                loading: true,
                delay: 1600,
                content: this.critical_data['crit'][this.crit_text_point]
              }).then(() => {
                botui.action.button({
                  addMessage: false,
                  human: false,
                  action: [{
                    text: 'Yes',
                    value: 'Yes'
                  },
                    {
                      text: 'No',
                      value: 'No'
                    }]
                }).then((res) => {
                  //判断点了什么按钮
                  if (res.text === 'Yes') {
                    //查询手机是什么
                    instance.get("/api/phone?id=" + this.critical_data['phones'][this.crit_phone_point[0]][this.crit_phone_point[1]]).then((res) => {
                      this.current_phone = res.data
                      //展示手机卡片
                      this.PhoneCard_2btn(this.current_phone)
                      this.crit_phone_point[1] += 1
                    })
                  }
                  if (res.text === 'No') {
                    this.crit_phone_point[0] += 1
                    this.crit_phone_point[1] = 0
                    this.crit_text_point += 1
                    this.tryAnother()
                  }
                })
              })
            } else if (this.crit_phone_point[1] < 3 && this.crit_text_point < 3) {
              instance.get("/api/phone?id=" + this.critical_data['phones'][this.crit_phone_point[0]][this.crit_phone_point[1]]).then((res) => {
                this.current_phone = res.data;
                this.crit_phone_point[1] += 1;
                this.PhoneCard_2btn(this.current_phone);
              })
            } else {
              //全都展示完了，给一个新的推荐
              this.in_crit = false;
              this.crit_text_point = 0;
              this.crit_phone_point = [0, 0];
              instance.post("/api/updatemodel", {
                uuid: this.uuid,
                logger: this.latest_dialog,
                lTime: new Date().getTime(),
              }).then((res) => {
                this.latest_dialog = [];
                this.current_phone = res.data.phone;
                this.bot(res.data.msg).then(() => {
                  this.botPhoneCard(this.current_phone);
                });
              })
            }
          } else {
            this.in_crit = false;
            this.crit_text_point = 0;
            this.crit_phone_point = [0, 0];
            instance.post("/api/updatemodel", {
              uuid: this.uuid,
              logger: this.latest_dialog,
              lTime: new Date().getTime(),
            }).then((res) => {
              this.latest_dialog = [];
              this.current_phone = res.data.phone;
              this.bot(res.data.msg).then(() => {
                this.botPhoneCard(this.current_phone);
              });
            })
          }
        }
      } else {
        this.$toast("Please rate this phone first.")
      }
    },

    //再来一个推荐
    tryAnother() {
      console.log(this.crit_phone_point);
      if (this.in_crit) {
        if (this.crit_text_point < 3 && this.crit_phone_point[1] === 3) {
          this.crit_phone_point[1] = 0
          this.crit_phone_point[0] += 1
          this.crit_text_point += 1
        }
        if (this.crit_text_point < 3 && this.crit_phone_point[1] === 0) {
          //需要bot 说话
          botui.message.bot({
            type: 'html',
            loading: true,
            delay: 1600,
            content: this.critical_data['crit'][this.crit_text_point]
          }).then(() => {
            botui.action.button({
              addMessage: false,
              human: false,
              action: [{
                text: 'Yes',
                value: 'Yes'
              },
                {
                  text: 'No',
                  value: 'No'
                }]
            }).then((res) => {
              //判断点了什么按钮
              if (res.text === 'Yes') {
                //查询手机是什么
                instance.get("/api/phone?id=" + this.critical_data['phones'][this.crit_phone_point[0]][this.crit_phone_point[1]]).then((res) => {
                  this.current_phone = res.data
                  //展示手机卡片
                  this.PhoneCard_2btn(this.current_phone)
                  this.crit_phone_point[1] += 1
                })
              }
              if (res.text === 'No') {
                this.crit_phone_point[0] += 1
                this.crit_phone_point[1] = 0
                this.crit_text_point += 1
                this.tryAnother()
              }
            })
          })
        } else if (this.crit_phone_point[1] < 3 && this.crit_text_point < 3) {
          instance.get("/api/phone?id=" + this.critical_data['phones'][this.crit_phone_point[0]][this.crit_phone_point[1]]).then((res) => {
            this.current_phone = res.data;
            this.crit_phone_point[1] += 1;
            this.PhoneCard_2btn(this.current_phone);
          })
        } else {
          //全都展示完了，给一个新的推荐
          this.in_crit = false;
          this.crit_text_point = 0;
          this.crit_phone_point = [0, 0];
          instance.post("/api/updatemodel", {
            uuid: this.uuid,
            logger: this.latest_dialog,
            lTime: new Date().getTime(),
          }).then((res) => {
            this.latest_dialog = [];
            this.current_phone = res.data.phone;
            this.bot(res.data.msg).then(() => {
              this.botPhoneCard(this.current_phone);
            });
          })
        }
      } else {
        if (this.last_action === "tryAnother") {
          //两次点击try another
          this.last_action = "letBotSuggect";
          this.letBotSuggest();
        } else {
          this.last_action = "tryAnother";
          botui.message.human({
            content: "Show another phone",
          }).then(() => {
            this.latest_dialog.push({
              "agent": "you",
              "action": "Next",
              "timestamp": new Date().getTime()
            })
            instance.post("/api/updatemodel", {
              uuid: this.uuid,
              logger: this.latest_dialog,
              lTime: new Date().getTime(),
            }).then((res) => {
              this.latest_dialog = [];
              this.current_phone = res.data.phone;
              this.bot(res.data.msg).then(() => {
                this.botPhoneCard(this.current_phone);
              });
            })
          })
        }
      }
    },

// let bot suggest
    letBotSuggest: function () {
      let that = this;
      this.in_crit = true;
      botui.message.bot({
        type: 'html',
        loading: true,
      }).then((index) => {
        //直接发送请求获取推荐的列表
        instance.post("/api/syscri", {
          uuid: this.uuid,
          logger: this.latest_dialog,
          lTime: new Date().getTime(),
        }).then((res) => {
          that.critical_data = res.data['phones']
        }).then(() => (
            //得到推荐列表后，开始展示
            botui.message.update(index, {
              loading: false,
              content: that.critical_data['crit'][this.crit_text_point]
            }).then(() => {
              //先问yes no
              botui.action.button({
                addMessage: false,
                human: false,
                action: [{
                  text: 'Yes',
                  value: 'Yes'
                },
                  {
                    text: 'No',
                    value: 'No'
                  }]
              }).then((res) => {
                //判断点了什么按钮
                if (res.text === 'Yes') {
                  //查询手机是什么
                  instance.get("/api/phone?id=" + this.critical_data['phones'][this.crit_phone_point[0]][this.crit_phone_point[1]]).then((res) => {
                    this.current_phone = res.data
                    //展示手机卡片
                    this.PhoneCard_2btn(this.current_phone)
                    this.crit_phone_point[1] += 1
                  })
                }
                if (res.text === 'No') {
                  this.crit_phone_point[0] += 1
                  this.crit_phone_point[1] = 0
                  this.crit_text_point += 1
                  this.tryAnother()
                }
              })
            })
        ))
      })
    },

//给系统推荐用
    PhoneCard_2btn: function (phone) {
      botui.message.bot({
        type: 'phone',
        loading: true,
        delay: 1600,
        content: phone,
      }).then(() => {
        botui.action.button({
          addMessage: false,
          human: false,
          action: [{
            text: 'Add to cart',
            value: 'Add to cart'
          },
            {
              text: 'Try another',
              value: 'Show another phone.'
            }]
        }).then((res) => {
          //判断点了什么按钮
          if (res.text === 'Add to cart') {
            this.addToCart(this.current_phone);
          }
          if (res.text === 'Try another') {
            this.tryAnother();
          }
        })
      })
    },

//左上角tips部分
    clickHelp: function () {
      this.show_help = true;
      this.help_showed_count += 1;
    },

//初始化引导语的入口
    closeHelp: function () {
      if (this.help_showed_count === 1) {
        // 初始状态
        this.bot("Hi there. I know you want to buy a new phone. Can you let me know your preference for the phone purchase?").then(() => {
          botui.action.button({
            addMessage: true,
            human: false,
            action: [{text: "OK", value: "OK"}]
          }).then((res) => {
            if (res.text === 'OK') {
              this.show_preference = true;
            }
          })
        })
      }
    },

//购物车部分
    clickCart: function () {
      this.show_cart = true
    },
//跳到下一页
    nextPage: function () {
      this.$router.replace('/que1').catch((err) => {
        console.log(err.message)
      });
    },
    // ctrlAva: function () {
    //   this.ava_css = true
    //   setTimeout(() => {
    //     this.ava_css = false
    //   }, 1000);
    // }
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  mounted() {
    localStorage.setItem("uuid", "e34cddc4a7ae47bb9f7badf9e44cf41e");
    // this.timer = setInterval(() => {
    //   setTimeout(this.ctrlAva, 0)
    // }, 4000)
  },
  computed: {
    // 计算属性的 getter
    cart_item_count: function () {
      return this.phone_in_cart.length;
    }
  }
}
</script>

<style scoped>
.avatar_back {
  position: absolute;
  top: 3px;
  left: 50%;
  margin-left: -26px;
  z-index: 499;
  width: 50px;
  height: 50px;
  border: 1px solid #c8c9cc;
  border-radius: 46px;
  background-color: #dcdee0;
}

.avatar {
  position: absolute;
  z-index: 500;
  width: 43px;
  height: 43px;
  background-repeat: no-repeat;
  background-image: url('../assets/imgs/avatar.png');
}

.avatar_ani {
  animation: avatar 1s steps(16) infinite;
}

@keyframes avatar {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: -688px, 0;
  }
}

</style>
