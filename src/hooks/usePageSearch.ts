import { ref, computed } from 'vue'
import type PageSearch from '@/components/page-search'

function usePageQuery() {
  const searchRef = ref<InstanceType<typeof PageSearch>>()

  const queryInfo: any = computed(() => searchRef.value?.queryInfo ?? {})
  return { searchRef, queryInfo }
}
export default usePageQuery
