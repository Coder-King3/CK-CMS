<template>
  <div class="king-descriptions">
    <el-descriptions border :column="options.column" :title="options.title">
      <template v-for="(item, index) in options.itemList" :key="index">
        <el-descriptions-item
          :label="item.name"
          label-align="left"
          align="left"
          width="1"
        >
          <template #label>
            <b> {{ item.name }}</b>
          </template>
          <el-tag>{{ item.description }}</el-tag>
        </el-descriptions-item>
      </template>
    </el-descriptions>
  </div>
</template>

<script setup lang="ts" name="KingDescriptions">
interface IProps {
  options: {
    column: number
    title: string
    itemList: any[]
  }
}
defineProps<IProps>()
</script>

<style lang="less" scoped>
.king-descriptions {
  padding: 5px;
  margin-bottom: 15px;
}
</style>
