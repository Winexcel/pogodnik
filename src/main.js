import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import './styles.scss';
import {InlineSvgPlugin} from 'vue-inline-svg';

Vue.use(InlineSvgPlugin);

Vue.config.productionTip = false;

new Vue({
    vuetify,
    render: h => h(App)
}).$mount('#app')
