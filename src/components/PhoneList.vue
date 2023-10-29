<template>
  <div class="list">
    <div class="item" v-for="phone in phonelist" :key="phone.id" @click="open_news(phone.id)">
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
  </div>
</template>

<script>
export default {
  name: "PhoneList",
  props: ["phone_list", 'showed_phones'],
  methods: {
    open_news: function (news_id) {
      this.$emit('news_id', news_id)
    }
  }
}
</script>

<style scoped>
.list {
  overflow: hidden;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, .2), 0 2px 2px 0 rgba(0, 0, 0, .14), 0 1px 5px 0 rgba(0, 0, 0, .12);
}

.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 78px;
  border-bottom: 1px solid #c8c9cc;
}

.title {
  font-size: 1.0rem;
  font-weight: 500;
  letter-spacing: .0125em;
  line-height: 1.2rem;
  word-break: break-all;
  margin: 10px 0;
  padding: 0 10px;
}

.image {
  width: 48px;
  height: 48px;
  padding: 10px;
}
</style>