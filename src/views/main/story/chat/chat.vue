<template>
  <div class="chat">
    <div class="header">
      <el-input style="width: 300px" v-model="title"></el-input>
      <el-button @click="publishArticlesClic">发布文章</el-button>
    </div>
    <div class="content">
      <king-editor ref="editRef"></king-editor>
    </div>
  </div>
</template>

<script setup lang="ts" name="Chat">
import { ref } from 'vue'
import KingEditor from '@/base-ui/king-editor'
import { postAddPageData } from '@/service/main/system/system'
import { KElMessage } from '@/utils'

const editRef = ref<InstanceType<typeof KingEditor>>()
const title = ref<string>()
const publishArticlesClic = () => {
  postAddPageData('story', {
    title: title.value!,
    cotent: editRef.value!.content.html
  }).then(({ type }) => {
    KElMessage(type, type === 'success' ? '文章发布成功' : '文章发布失败')
  })
}
</script>

<style lang="less" scoped>
.chat {
  height: 100%;
  display: flex;
  flex-direction: column;
  .header {
    text-align: right;
    height: 40px;
  }
  .content {
    flex: 1;
  }
}
</style>
