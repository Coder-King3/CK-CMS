<template>
  <div class="login">
    <login-panel id="login-panel" />
  </div>
</template>

<script setup lang="ts" name="Login">
import LoginPanel from './cpns/login-panel.vue'
</script>

<style scoped lang="less">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: url('@/assets/img/login-bg.svg');
}
</style>
