<template>
  <div class="nav-operation">
    <contact />
    <message />
    <search :menuList="menuList" />
  </div>
</template>

<script setup lang="ts" name="NavOperation">
import { ref } from 'vue'
import contact from './cpns/contact.vue'
import message from './cpns/message.vue'
import search from './cpns/search.vue'
import { getEntireMenuList } from '@/service/main/main'

const menuList = ref<any[]>([])
async function fatchMenuList(params: any) {
  const {
    data: { list }
  } = await getEntireMenuList(params)
  menuList.value = list
}
fatchMenuList({ type: 2 })
</script>

<style lang="less" scoped>
.nav-operation {
  display: inline-flex;
  margin-right: 20px;

  ::v-deep .operation {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 35px;
    border-radius: 3px;

    &:hover {
      background: #f2f2f2;
    }

    i {
      font-size: 20px;
    }
  }
}
</style>
