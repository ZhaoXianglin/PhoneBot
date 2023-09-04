<template>
  <div>
    <van-nav-bar title="Step3"/>
    <van-steps :active="2">
      <van-step>Step1</van-step>
      <van-step>Step2</van-step>
      <van-step>Step3</van-step>
      <van-step>Step4</van-step>
    </van-steps>
    <div class="content">
      <h3>Step 3: We will ask you to use a chatbot to view at least 5 recommended mobile phones and then choose one that
        can meet the requirements shown in a given scenario.</h3>
      <p style="font-size: 16px">
        Task:<br>
        • Read a user scenario about purchasing mobile phones and finish a simple quiz about your understanding of
        scenario.<br>
        • view <b>at least 5</b> recommended mobile phones and then choose one that can meet the requirements shown in a
        scenario.<br>
        • Fill out a questionnaire to evaluate the chatbot based on your experience.<br>
      </p>
      <van-image
          src="https://obsidian-1251052535.cos.ap-hongkong.myqcloud.com/step3_shop.png" width="100%" style="max-width: 640px"></van-image>
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
      this.$router.replace('/scenario').catch((err) => {
        console.log(err.message)
      });
    }
  }

}
</script>