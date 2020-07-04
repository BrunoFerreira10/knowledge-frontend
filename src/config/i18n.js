import Vue from 'vue'
import VueI18n from 'vue-i18n'
import store from './store'

import usMessages from './messages/us'
import brMessages from './messages/br'
import deMessages from './messages/de'

 Vue.use(VueI18n)

const messages = 
{
  us: {
    ...usMessages
  },
  br: {
    ...brMessages
  },
  de: {
    ...deMessages
  }
}

const i18n = new VueI18n({
  // locale: localStorage.getItem('__user_lang') || 'us', 
  locale: store.state.locale,
  fallbackLocale: 'us',
  messages,   
})

export default i18n