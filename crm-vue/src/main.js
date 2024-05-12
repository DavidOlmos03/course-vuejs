import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { plugin, defaultConfig} from '@formkit/vue'
import config  from '../formkit.config.js'
import './assets/main.css'




const app = createApp(App)

// Esto es para decir que queremos utilizar en el proyecto
app.use(router)
app.use(plugin, defaultConfig(config))  


app.mount('#app')
