<template>
  <div class="chatbot">
    <van-nav-bar title='PhoneBot' @click-left="clickHelp" @click-right="clickCart" left-text=""
                 right-text="Cart" class="chatbot-header">
      <template #left>
        <van-icon name="info-o" size="16"> Tips</van-icon>
      </template>
      <template #right>
        <van-icon name="cart-o" size="16" badge="3"> Cart</van-icon>
      </template>
    </van-nav-bar>
    <div class="chatbot-send">
      <van-field
          v-model="message"
          rows="1"
          autosize
      >
        <template #button>
          <van-button size="small" type="primary"> Send </van-button>
        </template>
      </van-field>
    </div>
    <div class="chatbot-content">
      <BotUi/>
    </div>
    <!--  左侧 help-->
    <van-popup
        v-model="show_help"
        closeable
        close-icon="close"
        :style="{ height: '80%',width:'90%' }"
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
        <van-card
            num="2"
            price="2.00"
            desc="描述信息"
            title="商品标题"
            thumb="https://img01.yzcdn.cn/vant/ipad.jpeg"
        />
        <van-card
            num="2"
            price="2.00"
            desc="描述信息"
            title="商品标题"
            thumb="https://img01.yzcdn.cn/vant/ipad.jpeg"
        />
      </div>
    </van-popup>
  </div>
</template>

<script>
import BotUi from "../components/BotUi";
// 对象引入
import {botui} from '@/components/BotUi';
//import {instance} from "@/request";

export default {
  name: "Chatbot",
  components: {
    BotUi,
  },
  data: function () {
    return {
      //控制功能
      show_help: true,
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
      phone_in_cart:[],
      phone:{
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
      <tr><td>Resolution:</td><td>${phone.resolution1}*${phone.resolution1}</td></tr>
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
          addMessage: true,
          action: this.phone_buttons
        }).then((res) => {
          console.log(res)
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
        this.bot("Hi there. I know you want to buy a new phone. I have found some phones for you based on your preference. You can add your liked phones to the shopping cart.").then(() => {
          this.bot("But, you could also search for other phones by using the tips shown on the left side.");
          this.botPhoneCard(this.phone);
        })
      }
    },

    //购物车部分
    clickCart: function () {
      this.show_cart = true
    },

  }
}
</script>
<style>
.chatbot-header{
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  z-index: 1;
  height: 46px;
}
.chatbot-send{
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 1;
}
.chatbot-content{
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
