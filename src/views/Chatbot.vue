<template>
  <div class="chatbot">
    <van-nav-bar title='PhoneBot' @click-left="clickHelp" @click-right="clickCart" left-text=""
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
          <van-button size="small" :disabled="msg_btn_ctrl" type="primary" @click="sendMessage"> Send</van-button>
        </template>
      </van-field>
    </div>
    <div class="chatbot-content">
      <BotUi/>
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
                <van-checkbox name="SAMSUNG" shape="square">SAMSUNG</van-checkbox>
                <van-checkbox name="APPLE" shape="square">APPLE</van-checkbox>
                <van-checkbox name="HUIWEI" shape="square">HUIWEI</van-checkbox>
                <van-checkbox name="NOKIA" shape="square">NOKIA</van-checkbox>
                <van-checkbox name="SONY" shape="square">SONY</van-checkbox>
                <van-checkbox name="LG" shape="square">LG</van-checkbox>
                <van-checkbox name="HTC" shape="square">HTC</van-checkbox>
                <van-checkbox name="MOTOROLA" shape="square">MOTOROLA</van-checkbox>
                <van-checkbox name="LENOVO" shape="square">LENOVO</van-checkbox>
                <van-checkbox name="XIAOMI" shape="square">XIAOMI</van-checkbox>
                <van-checkbox name="GOOGLE" shape="square">GOOGLE</van-checkbox>
                <van-checkbox name="HONOR" shape="square">HONOR</van-checkbox>
                <van-checkbox name="OPPO" shape="square">OPPO</van-checkbox>
                <van-checkbox name="REALME" shape="square">REALME</van-checkbox>
              </van-checkbox-group>
            </template>
          </van-field>

          <p style="padding:0 10px 0 16px; margin-bottom: 5px;">Your maximum budget: <span
              style="color: #B24040">${{ user_prefer.budget }}.</span></p>
          <van-field name="budget" :rules="[{ required: true, message: 'please select' }]">
            <template #input>
              <van-slider :min="100" :max="1400" :step="100" v-model="user_prefer.budget"/>
            </template>
          </van-field>
          <p style="padding:0 10px 0 16px; margin-bottom: 5px;">Cameras:</p>
          <van-field name="cameras" :rules="[{ required: true, message: 'Please select' }]">
            <template #input>
              <van-radio-group v-model="user_prefer.cameras" direction="horizontal">
                <van-radio name="1">One</van-radio>
                <van-radio name="2">Two</van-radio>
                <van-radio name="3">Three</van-radio>
                <van-radio name="4">Four or more</van-radio>
              </van-radio-group>
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
        :style="{ height: '80%'}"
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
          <li>"I want to buy a phone having better GPU."</li>
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

    <!--    评分框-->
    <van-popup
        v-model="show_rate"
        :style="{ height: '281px',width:'300px' }"
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
  </div>
</template>

<script>
import BotUi from "../components/BotUi";
// 对象引入
import {botui} from '@/components/BotUi';
import {instance} from "@/request";


export default {
  name: "Chatbot",
  components: {
    BotUi,
  },
  data: function () {
    return {
      //控制功能
      loading:false,
      msg_btn_ctrl: false,
      show_help: true,
      show_rate: false,
      show_preference: false,
      help_showed_count: 1,
      show_cart: false,
      phone_buttons: [
        {
          text: 'Add to cart',
          value: 'Add to cart'
        },
        {
          text: 'Try another',
          value: 'Show another phone.'
        },
        {
          text: 'Let bot suggest',
          value: 'I need some suggestions.'
        }],

      //数据部分
      message: "",
      user_prefer: {
        brands: [],
        budget: 700,
        cameras: ''
      },
      phone_in_cart: [],
      current_phone: {
        battery: 4000,
        brand: "alcatel",
        cam1: 12,
        cam2: 8,
        cpu: "Octa-core",
        d1: 153.7,
        d2: 74.5,
        d3: 8.5,
        displayratio: "84.5%",
        displaysize: 6.2,
        gps: "Yes,",
        id: 2,
        img: "https://fdn2.gsmarena.com/vv/bigpic/alcatel-5v.jpg",
        modelname: "alcatel 5v",
        nettech: "GSM / HSPA / LTE",
        nfc: "Yes",
        os1: "Android",
        popularity: 247639,
        price: 196.2,
        ram: "3GB",
        resolution1: 720,
        resolution2: 1500,
        storage: "32GB",
        url: "https://www.gsmarena.com/alcatel_5v-9271.php",
        weight: 158,
        year: "2018, July",
      }
    }
  },
  methods: {
    //默认对话
    bot: function (msg) {
      return botui.message.bot({
        type: 'html',
        photo: require("../assets/imgs/chatbot_avator.png"),
        loading: true,
        delay: 1600,
        content: msg
      })
    },
    //提交手机偏好
    submitPreference(values) {
      if (values.brands.length !== 3) {
        this.$toast("Please select three brands");
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
            console.log(res);
            this.bot("Great! Now I have found some phones based on your preference. You can add the phone of your interest to the shopping cart.").then(()=>{
              this.botPhoneCard(this.current_phone);
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
      //先禁用按钮
      if (this.message.length >= 2) {
        //可以发送
        this.msg_btn_ctrl = true;
        botui.message.human({
          content: this.message,
        }).then(() => {
          instance.post('/api/userMessage', {
            msgT: new Date().getTime(),
            message: this.message,
            uuid: localStorage.getItem('uuid')
          }).then((res) => {
            console.log(res);
            this.current_phone = res.data.phone;
            this.botPhoneCard(this.current_phone);
            this.msg_btn_ctrl = false;
            this.message = null;
          })
        })
      } else {
        this.msg_btn_ctrl = false;
        this.$toast('Please enter more information.');
      }

    },
    //手机评分
    submitPhoneRate() {
      if (this.current_phone.rate) {
        this.phone_in_cart.push(this.current_phone);
        this.show_rate = false

      } else {
        this.$toast("Please rate this phone first.")
      }
    },

    //商品卡片
    botPhoneCard: function (phone) {
      let template = `<div style="min-width: 240px;">
      <div style="width: 100%;text-align:center;background-color: #f5f5f5"><img style="max-height: 360px" src="${phone.img}" alt=""/></div>
      <div style="margin-top: 1em; display: flex; justify-content: space-between;"><span style="display:block;font-size: 20px;font-weight: bold">${phone.modelname}</span> <span style="display: block; font-size: 20px;font-weight: bold;color: #B24040;align-self: center;">$${phone.price}</span></div>
      <table style="margin-top: 0.5em;word-break: break-word; font-size:18px; color: #555555">
      <tr><td style="width: 96px"> Storage:</td><td>${phone.storage}</td></tr>
      <tr><td>Memory:</td><td>${phone.ram}</td></tr>
      <tr><td>OS:</td><td>${phone.os1}</td></tr>
      <tr><td>Camera:</td><td>${phone.cam1} MP</td></tr>
      <tr><td>Screen:</td><td>${phone.displaysize}inches</td></tr>
      <tr><td>Resolution:</td><td>${phone.resolution1}*${phone.resolution2}</td></tr>
      <tr><td>Battery:</td><td>${phone.battery}mAh</td></tr>
      </table>
      <div style="display: flex;justify-content: end"><a href="${phone.url}" target="view_window" style="display: inline-block;padding: 5px 10px;border-radius: 4px;border: 1px solid #1989fa;background-color: white;color: #1989fa">detail</a></div>
      </div>`
      botui.message.bot({
        type: 'html',
        photo: require("../assets/imgs/chatbot_avator.png"),
        loading: true,
        delay: 1600,
        content: template
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
          if (res.text === 'Try another'){
            this.message = "Show another phone.";
            this.sendMessage();
          }
          if (res.text === 'Let bot suggest'){
            this.message = "I need some suggections.";
          this.sendMessage();
        }
        })
      })
    },

    //加入购物车
    addToCart() {
      this.bot("Please rate your liked phone.").then(() => {
        this.show_rate = true
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
  padding: 25px 10px 30px 10px;
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
  background-color: #fff;
  color: #000;
  width: auto;
  max-width: 80%;
  display: inline-block;
  padding: 13px 13px;
}

.botui-message-content.loading {
  background-color: #fff;
}

.botui-message-content.text {
  line-height: 1.4
}

.botui-message-content.human {
  background-color: #9AE75C;
  color: black;
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
  border: 1px solid #1AAD19;
  font-weight: normal;
  text-align: left;
  background-color: transparent;
  transition-duration: .28s;
  transition-property: box-shadow, transform, opacity;
  transition-timing-function: cubic-bezier(.4, 0, .2, 1);
  color: #1AAD19;
  font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Segoe UI, Arial, Roboto, 'PingFang SC', miui, 'Hiragino Sans GB', 'Microsoft Yahei', sans-serif;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 25%)
}

.botui-actions-container {
  margin-top: -20px;
}

.v-bottom-sheet.v-dialog {
  overflow: auto !important;
}


.profil.agent {
  float: left;
  margin-right: 4px;
}

.profil {
  position: relative;
  border-radius: 50%;
}

.profil > img.agent {
  border-radius: 0;
}

.profil > img {
  width: 26px;
  height: 26px;
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
</style>
