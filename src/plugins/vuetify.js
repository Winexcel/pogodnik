import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import ru from "@/i18n/ru";
import en from "@/i18n/en";

Vue.use(Vuetify);

export default new Vuetify({
    lang: {
        locales: { ru, en },
        current: 'ru',
    },
});
