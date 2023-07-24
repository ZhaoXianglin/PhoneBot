<template>
  <div class="index">
    <van-nav-bar title="Comparison"></van-nav-bar>
    <div class="content">
      <table class="table">
        <tr>
          <th>Item</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Subtotal</th>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
//import {instance} from '../request';

export default {
  name: "List",
  components: {},

  data: function () {
    return {}
  },
  methods: {},
}
</script>

<style scoped>
.content {
  margin: 5px;
  padding: 6px 10px 36px 10px;
  border-radius: 6px;
  background-color: #fff;
  color: #323233;
}

.table{
  width: 100%;
  border-collapse: collapse;
  border-spacing: 1px;
  border: 1px solid #000;
  font-size: 14px;
  line-height: 1.5715;
}
</style>
