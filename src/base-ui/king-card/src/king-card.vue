<template>
  <div class="king-card">
    <el-card class="box-card">
      <template v-if="title" #header>
        <div class="card-header">
          <h3>{{ title }}</h3>
        </div>
      </template>
      <slot></slot>
    </el-card>
  </div>
</template>

<script setup lang="ts" name="KingCard">
interface IProps {
  title?: string
}

defineProps<IProps>()
</script>

<style lang="less" scoped>
.king-card {
  .box-card {
    border: none;
    box-shadow: 0 0 10px rgba(164, 176, 190, 0.3);
    border-radius: 5px;
    ::v-deep .el-card__header {
      text-align: left !important;
      font-size: 14px;
      // font-weight: bold;
    }
    ::v-deep .el-card__body {
      text-align: left !important;
      // font-weight: bold;
    }
    .card-header {
      h3 {
        line-height: 20px;
        padding: 0;
        margin: 0;
      }
    }
  }
}
</style>
