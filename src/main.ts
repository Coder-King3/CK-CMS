import { createApp } from 'vue'
import 'normalize.css'
import './assets/style/index.less'

import App from './App.vue'
import router from './router'
import store from './store'
import globalRegister from './global'
import 'virtual:svg-icons-register'

const app = createApp(App)
// app.use(mock)
app.use(store)
app.use(router)
app.use(globalRegister)
app.mount('#app')
