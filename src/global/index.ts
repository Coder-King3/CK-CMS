import type { App } from 'vue'
import registerBaseui from './register-baseui'

// 全局按需注册
function globalRegister(app: App) {
  app.use(registerBaseui)
}

export default globalRegister
