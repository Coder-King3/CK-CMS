<template>
  <div class="not-found">
    <nav>
      <div class="menu">
        <!-- <p class="website_name">LOGO</p> -->

        <svg-icon type="logo" class="website_name" />
      </div>
    </nav>

    <section class="wrapper">
      <div class="container">
        <div id="scene" class="scene" data-hover-only="false">
          <div class="circle" data-depth="1.2"></div>
          <div class="one" data-depth="0.9">
            <div class="content">
              <span class="piece"></span>
              <span class="piece"></span>
              <span class="piece"></span>
            </div>
          </div>
          <div class="two" data-depth="0.60">
            <div class="content">
              <span class="piece"></span>
              <span class="piece"></span>
              <span class="piece"></span>
            </div>
          </div>
          <div class="three" data-depth="0.40">
            <div class="content">
              <span class="piece"></span>
              <span class="piece"></span>
              <span class="piece"></span>
            </div>
          </div>
          <p class="p404" data-depth="0.50">404</p>
          <p class="p404" data-depth="0.10">404</p>
        </div>
        <div class="text">
          <article>
            <p>呃哦！看来你迷路了。 <br />有胆就回首页吧！</p>
            <button @click="backIndex">我敢！</button>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts" name="NotFound">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Parallax from 'parallax-js'
let router = useRouter()

// 返回方法
let backIndex = () => {
  router.push('/')
}
onMounted(() => {
  let scene = document.getElementById('scene') as HTMLElement
  new Parallax(scene)
})
</script>

<style lang="less" scoped>
@import url('./style/404.less');
</style>
