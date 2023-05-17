import type { App } from 'vue'

// 通过 import.meta.glob 拿到 base-ui 下导出的组件
const components: any[] = []
const files: Record<string, any> = import.meta.glob('@/base-ui/**/index.ts', {
  eager: true
})
for (const key in files) {
  const module = files[key]
  components.push(module.default)
}
// console.log('components', components)

// 注册组件
export default function (app: App): void {
  for (const component of components) {
    app.component(component.name, component)
  }
}
