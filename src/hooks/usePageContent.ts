import { ref, computed } from 'vue'
import type PageContent from '@/components/page-content'

function usePageContent() {
  const contentRef = ref<InstanceType<typeof PageContent>>()

  const handleSearchClick = () => {
    contentRef.value?.fetchPageListData()
  }
  const handleResetClick = () => {
    contentRef.value?.fetchPageListData()
  }
  const queryData: any = computed(() => contentRef.value?.queryData ?? {})

  return { contentRef, handleSearchClick, handleResetClick, queryData }
}

export default usePageContent
