<template>
  <div class="contact">
    <span class="operation" @click="handlerContactClick">
      <king-icon type="ChatDotRound" />
    </span>

    <el-dialog v-model="contactVisible" title="联系我们" width="50%">
      <div class="content">
        <h3>嗨，你好啊，我是CoderKing。</h3>
        <ul>
          <li>
            项目地址：
            <el-link
              type="primary"
              href="https://github.com/Coder-King3/CK-CMS"
              target="_blank"
            >
              https://github.com/Coder-King3/CK-CMS
            </el-link>
          </li>
          <li>
            GitHub：
            <el-link
              type="primary"
              href="https://github.com/Coder-King3"
              target="_blank"
            >
              https://github.com/Coder-King3
            </el-link>
          </li>
          <li>
            微信：
            <el-link type="primary"> WM-CoderKing </el-link>
          </li>
        </ul>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="contactVisible = false">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts" name="Contact">
import { ref } from 'vue'
const contactVisible = ref(false)

const handlerContactClick = () => {
  contactVisible.value = true
}
</script>

<style lang="less" scoped>
.content {
  line-height: 25px;
}
</style>
