<template>
  <div id="app">
    <el-menu
      default-active="/"
      class="el-menu-demo" 
      mode="horizontal"
      @select="navSelect">
      <el-menu-item index="/">货品</el-menu-item>
      <el-menu-item index="/cart">购物车</el-menu-item>
      <el-menu-item index="/order">订单</el-menu-item>
    </el-menu>
    <router-view /> 
  </div>
</template>

<script>

export default {
  name: 'App',
  methods: {
    navSelect(index) {
      this.$router.push(index);
    }
  },
}
</script>
