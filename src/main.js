import { createApp } from 'vue'
import App from './App.vue'
import router from './router' //will look for index.js in that folder
import store from './store'

const app = createApp(App)

app.use(router)
app.use(store)

app.mount('#app')
