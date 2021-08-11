import { createApp } from 'vue'
import App from './App.vue'
import store from './store'

import './main.sass';

createApp(App)
    .use(store)

    .mount('#app')
