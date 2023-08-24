<template>
  <div>
    <van-nav-bar title="Step3"/>
    <van-steps :active="3">
      <van-step>Step1</van-step>
      <van-step>Step2</van-step>
      <van-step>Step3</van-step>
      <van-step>Step4</van-step>
    </van-steps>
    <div class="content">
      <h3>Step 4: We will ask you to fill out a questionnaire about your experience with the chatbot and your purchase decision.
      </h3>
      <van-image
          src="https://obsidian-1251052535.cos.ap-hongkong.myqcloud.com/step4_post.png?q-sign-algorithm=sha1&q-ak=AKIDk6CEcVBqf6H03jkg_zCt86Qtspr-oQCz_UdxVCx5KRAEE8tFVa_LAeOUKhquuJB7&q-sign-time=1692892518;1692896118&q-key-time=1692892518;1692896118&q-header-list=host&q-url-param-list=ci-process&q-signature=9e8f1bb383d811aa0c44741e7d3a66fc5ef5d128&x-cos-security-token=WgVJ7Fnp0jHH3qE1FBGiVKku3URcDFva1421683e79c910d0bb6bec62f008bd39CQegaxua3kFmU7JKMExq66Sq7Rs5Ua-6qUlyVYki8uOAB7igDQZh-gG92HJvyr93PkVf1d1BNlQRibVj3Gq6K9xfLdl8Ivl1l9if8e6T1maFnB4q0qpwD-rI_j3LZkOLNNpiCMEKe8ddTNX4FHuqOZ8AshPzzjGTq-IrtGx3oAQq06i6T7Ji7TNvuza41hSE&ci-process=originImage"></van-image>
      <van-button round block type="info" native-type="submit" :loading="loading" @click="onSubmit">Continue
      </van-button>
    </div>
  </div>
</template>

<style scoped>
.content {
  margin: 14px 6px;
  padding: 10px 10px 48px 10px;

  background-color: #ffffff;
}
</style>
<script>
export default {
  name: "Step1",
  methods: {
    onSubmit() {
      this.$router.replace('/beforetable').catch((err) => {
        console.log(err.message)
      });
    }
  }

}
</script>