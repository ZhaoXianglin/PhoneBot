<template>
  <div class="Thanks">
    <van-nav-bar title="Thanks"/>
    <div class="content">
      <van-image
          width="200px"
          :src="require('../assets/imgs/finish.png')"
      />
      <h2 style="background-color: #c8c9cc;border: 2px solid cadetblue; margin: 10px 20px;padding: 10px 10px">CODE:
        {{ code }}</h2>
      <h3>Thank you for completing this survey.</h3>
      <h3>Now you can close this page.</h3>
    </div>

  </div>
</template>

<script>
export default {
  name: "Success",
  data: function () {
    return {
      code: ""
    }
  },
  mounted: function () {
    if (localStorage.getItem('step') === '4' || localStorage.getItem('step') === '6') {
      this.code = localStorage.getItem("code");
      localStorage.setItem('finished', "1")
      localStorage.setItem("active", new Date().getTime().toString());
    }
  }
}
</script>

<style scoped>
.content {
  padding-top: 36px;
  text-align: center;
}

h3 {
  text-align: center;
}
</style>
