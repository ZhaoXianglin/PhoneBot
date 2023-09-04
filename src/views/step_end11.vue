<template>
  <div>
    <van-nav-bar title="Success"/>
    <div class="content">
      <h3>You have successfully completed the first part of this experiment!</h3>
      <h3>Please remember the randomly assigned ID, as it will be necessary for tomorrow's experiment.</h3>
      <h1 style="color: #B24040; text-align: center">{{randomID}}</h1>
      <van-image src="https://obsidian-1251052535.cos.ap-hongkong.myqcloud.com/step2_game.png" width="100%"
                 style="max-width: 640px"></van-image>
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
  data: function () {
    return {
      randomID: localStorage.getItem('uuid').substr(0, 8)
    }
  },
  methods: {
    onSubmit() {
      this.$router.replace('/game').catch((err) => {
        console.log(err.message)
      });
    }
  }

}
</script>