<template>
  <div class="search">
    <span class="operation" @click="handlerSearchClick">
      <king-icon type="Search" />
    </span>

    <el-dialog
      v-model="searchVisible"
      :show-close="false"
      class="search-modal"
      @close="resetSearch"
    >
      <div class="search-modal-body">
        <el-input
          v-model="searchFrom.content"
          class="input"
          clearable
          placeholder="请输入关键词搜索"
          @input="handleSearchInput"
        >
          <template #prefix>
            <king-icon type="Search" />
          </template>
        </el-input>
        <div class="result" ref="result">
          <template v-if="searchFrom.list && searchFrom.list.length > 0">
            <li
              v-for="(item, index) in searchFrom.list"
              :key="item.id"
              :class="{ isActive: index == 0 }"
              ref="results"
              @click="hadnleGoToPageClick(item)"
            >
              <span><svg-icon type="jump" />&nbsp;{{ item.name }}</span>
              <span>
                <svg-icon type="key-enter" />
              </span>
            </li>
          </template>
          <template v-else>
            <span style="line-height: 100px; color: #969faf">暂无搜索结果</span>
          </template>
        </div>
      </div>

      <template #footer>
        <div class="search-modal-footer">
          <ul class="commands">
            <li>
              <i><svg-icon type="key-enter" /></i>
              <span>确认</span>
            </li>
            <!-- <li>
              <i><svg-icon type="key-up" /></i>
              <i><svg-icon type="key-down" /></i>
              <span>切换</span>
            </li> -->
            <li>
              <i><svg-icon type="key-esc" /></i>
              <span>ESC关闭</span>
            </li>
          </ul>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts" name="Search">
import { ref, reactive, nextTick } from 'vue'
import { useRouter } from 'vue-router'

interface IProps {
  menuList: any[]
}
const props = defineProps<IProps>()

const searchVisible = ref(false)
const searchFrom = reactive<{ content: string; list: any[] }>({
  content: '',
  list: []
})
const setSearchVisible = (visibleValue: boolean) => {
  searchVisible.value = visibleValue
  if (!visibleValue) resetSearch()
}
const resetSearch = () => {
  searchFrom.content = ''
  searchFrom.list = []
}

// 1.搜索点击弹出逻辑处理
const handlerSearchClick = () => {
  setSearchVisible(true)
  nextTick(() => {
    handleResultItemHover()
  })
}

// 2.input筛选逻辑处理
const handleSearchInput = (value: string) => {
  if (value.indexOf('param:') != -1) {
    let listArr = []
    switch (value) {
      case 'param:analysis':
        listArr = props.menuList.filter(
          (item) => item.url.indexOf('analysis') != -1
        )
        break
      case 'param:system':
        listArr = props.menuList.filter(
          (item) => item.url.indexOf('system') != -1
        )
        break
      case 'param:product':
        listArr = props.menuList.filter(
          (item) => item.url.indexOf('product') != -1
        )
        break
      case 'param:story':
        listArr = props.menuList.filter(
          (item) => item.url.indexOf('story') != -1
        )
        break
      case 'param:page':
        listArr = props.menuList
        break
    }
    searchFrom.list = listArr
  } else if (value.trim() != '') {
    searchFrom.list = props.menuList.filter(
      (item) => item.name.indexOf(value) != -1
    )
  } else {
    searchFrom.list = []
  }
}

// 3.高亮样式切换逻辑处理
const result = ref()
const results = ref()
const handleResultItemHover = () => {
  result.value?.addEventListener('mousemove', (event: any) => {
    if (event.target.nodeName === 'LI') {
      results.value?.forEach((e: any) => {
        e.className = ''
      })
      event.target.className = 'isActive'
    }
  })
}

// 4.点击跳转页面逻辑处理
const router = useRouter()
const hadnleGoToPageClick = (menu: any) => {
  setSearchVisible(false)
  router.push(menu?.url)
}
</script>

<style lang="less" scoped>
.search {
  .search-modal {
    :global(&) {
      width: 500px;
      // border-radius: 6px;
    }
    :global(& .el-dialog__header) {
      padding: 0;
    }
    :global(& .el-dialog__body) {
      padding: 12px 16px !important;
    }
    .search-modal-body {
      .input {
        height: 40px;
        margin-bottom: 10px;
      }
      .result {
        min-height: 100px;
        max-height: 220px;
        overflow-y: scroll;
        li {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 50px;
          padding: 0 20px;
          font-size: 16px;
          box-shadow: 0px 1px 3px rgba(164, 176, 190, 0.5);
          border-radius: 5px;
          &:nth-of-type(n + 2) {
            margin-top: 5px;
          }
        }
      }
    }
    .search-modal-footer {
      .commands {
        display: flex;
        align-items: center;
        color: #969faf;
        li {
          display: flex;
          align-items: center;
          margin-right: 14px;
          i {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 20px;
            height: 18px;
            margin-right: 0.4em;
            padding-bottom: 2px;
            background: linear-gradient(-225deg, #fff, #fff);
            color: #4a4d4f;
            border-radius: 2px;
            box-shadow: inset 0 -2px #cdcde6, inset 0 0 1px 1px #fff,
              0 1px 2px 1px #1e235a66;
          }
        }
      }
    }
  }
}
.isActive {
  color: white;
  background-color: #0187fb;
}
</style>
