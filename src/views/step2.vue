<template>
  <div>
    <van-nav-bar title="Step2"/>
    <van-steps :active="1">
      <van-step>Step1</van-step>
      <van-step>Step2</van-step>
      <van-step>Step3</van-step>
      <van-step>Step4</van-step>
    </van-steps>
    <div class="content">
      <h3>Step 2: We will ask you to finish a digit span test to gauge your working memory capacity. It will take about 5-10 minutes.</h3>

      <van-image src="https://obsidian-1251052535.cos.ap-hongkong.myqcloud.com/step2_game.png?q-sign-algorithm=sha1&q-ak=AKIDEKiZYPMG1PONZmQmXox3qXOZLdlP3BkvtUUBHwnsOtJRHJNvmSuHpuO6Qgml5poc&q-sign-time=1692891139;1692894739&q-key-time=1692891139;1692894739&q-header-list=host&q-url-param-list=ci-process&q-signature=9ec16dd8f8ce60a8ac43d4e36e7f76e936695e7f&x-cos-security-token=WgVJ7Fnp0jHH3qE1FBGiVKku3URcDFvaf79669d85bb2bd028cf5a8f26041e125CQegaxua3kFmU7JKMExq6yCl4sFw1ZV5j1EQ_tW4CxXDTAZtxrsintU0_KsCkC-EmzLLo1DHH_62B_l5-UTGpLuwXZCAd5eOABpAr639oF6oCkojJUz-w_VOv0arUZOc06Mli7uw8zX_yJCWJkizV2vu12H7EmwUQgVuNG83M-bC_AOz0PX1frBk668oMZz2&ci-process=originImage"></van-image>
      <van-button round block type="info" native-type="submit" :loading="loading" @click="onSubmit">Continue
      </van-button>
    </div>
  </div>

</template>

<style scoped>
.content{
  margin: 14px 6px;
  padding:10px 10px 48px 10px;

  background-color: #ffffff;
}
</style>
<script>
export default {
  name: "Step1",
  methods: {
    onSubmit() {
      this.$router.replace('/game').catch((err) => {
        console.log(err.message)
      });
    }
  }

}
</script>