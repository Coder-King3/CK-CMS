<template>
  <div class="message">
    <span class="operation" @click="handlerMessageClick">
      <king-icon type="Message" />
    </span>

    <el-dialog v-model="messageVisible" title="通知公告" width="50%">
      <div class="content">
        <h3>暂无公告</h3>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="messageVisible = false">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts" name="Message">
import { ref } from 'vue'

const messageVisible = ref(false)

const handlerMessageClick = () => {
  messageVisible.value = true
}
</script>

<style lang="less" scoped></style>
