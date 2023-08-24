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
      <van-image
          src="https://obsidian-1251052535.cos.ap-hongkong.myqcloud.com/step1_form.png?q-sign-algorithm=sha1&q-ak=AKIDZz2eCWGjbG9YFBVgpIu9eCXMxf9nlKSTa4hviXWXUHYny4d-3mKgIBjTAwH3Y4og&q-sign-time=1692890786;1692894386&q-key-time=1692890786;1692894386&q-header-list=host&q-url-param-list=ci-process&q-signature=fb7ae2072b35d55191505c37b57bdf7d1463436f&x-cos-security-token=1o1wgbHz1Q30NSVQ7OCjBe3Oz8v5j4ea48a012bce2a39518bf63b66ae4f65c83fPaybx_xTZ_NtyNZMeWpp2qZ0jTPufig9yWDDYZDcnzxM2We-7-5GMlhYzQXVNb56ELmlcLjkwHf06rbDlA5VfyIfdk5DI4UAO0b32qTNgcwewLWUtJSI-evXri1lcqR1F3FhF_YTHqC37GJlt9uTJbL1c7CRRvJcK3NPFfxxyaxbTRDiiMs9EEfiMuoZve4&ci-process=originImage"></van-image>
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
      this.$router.replace('/prestudy').catch((err) => {
        console.log(err.message)
      });
    }
  }

}
</script>