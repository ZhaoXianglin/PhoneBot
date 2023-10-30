<template>
  <div>
    <van-nav-bar title="Step1"/>
    <van-steps :active="0">
      <van-step>Step1</van-step>
      <van-step>Step2</van-step>
      <van-step>Step3</van-step>
      <van-step>Step4</van-step>
    </van-steps>
    <div class="content">
      <h3>Step 1: We will ask you to fill out a questionnaire about your personal characteristics related to decision
        making.</h3>
      <van-image width="100%" style="max-width: 640px"
                 src="https://obsidian-1251052535.cos.ap-hongkong.myqcloud.com/step1_form.png"></van-image>
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
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    onSubmit() {
      this.$router.replace('/prestudy').catch((err) => {
        console.log(err.message)
      });
    }
  }

}
</script>