<template>
  <div class="count-card">
    <div class="header">
      <span>{{ title }}</span>
      <el-tooltip :content="tips" placement="top" effect="light">
        <king-icon type="Warning" />
      </el-tooltip>
    </div>
    <div class="content">
      <span ref="count1Ref">{{ absAmount(number, false) }}</span>
    </div>
    <div class="footer">
      <span>{{ subtitle }}&nbsp;</span>
      <span ref="count2Ref">{{ absAmount(number, false) }}</span>
    </div>
  </div>
</template>

<script setup lang="ts" name="CountCard">
import { ref, onMounted } from 'vue'
import { CountUp } from 'countup.js'
import { absAmount } from '@/utils'
interface IProps {
  amount?: string
  title: string
  subtitle: string
  tips: string
  number: number
}
const props = defineProps<IProps>()

// 创建CountUp实例对象
const count1Ref = ref<HTMLElement>()
const count2Ref = ref<HTMLElement>()
// 参数：执行动画的元素、数字增加
const countOption = {
  prefix: props.amount === 'saleroom' ? '¥' : ''
}
onMounted(() => {
  const countup1 = new CountUp(count1Ref.value!, props.number, countOption)
  const countup2 = new CountUp(count2Ref.value!, props.number, countOption)
  countup1.start()
  countup2.start()
})
</script>

<style lang="less" scoped>
.count-card {
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  height: 130px;
  background: white;
  box-shadow: 0 0 10px rgba(164, 176, 190, 0.3);
  border-radius: 5px;

  .header {
    display: flex;
    height: 38px;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.45);
    justify-content: space-between;
    align-items: flex-end;
  }

  .content {
    display: flex;
    margin-left: 0px;
    font-size: 26px;
    color: rgba(0, 0, 0, 0.85);
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }

  .footer {
    display: flex;
    height: 38px;
    line-height: 38px;
    font-size: 14px;
    letter-spacing: 1px;
    color: rgba(0, 0, 0, 0.85);
    border-top: 1px solid #f0f0f0;
  }
}
</style>
