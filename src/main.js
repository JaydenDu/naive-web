import { createApp } from 'vue'
import App from './App.vue'
import { setupRouter } from './router'
import { setupStore } from './store'
import { setupNaiveDiscreteApi } from './utils'

import '@/styles/reset.css'
import '@/styles/global.scss'
import 'uno.css'

const app = createApp(App)
setupStore(app)
await setupRouter(app)
app.mount('#app')
setupNaiveDiscreteApi()
