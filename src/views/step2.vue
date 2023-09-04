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

      <van-image src="https://obsidian-1251052535.cos.ap-hongkong.myqcloud.com/step2_game.png" width="100%" style="max-width: 640px"></van-image>
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