import Vue from 'vue'
import VueI18n from 'vue-i18n'
import store from './store'

import usMessages from './messages/us'
import brMessages from './messages/br'
import esMessages from './messages/es'
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
  es: {
    ...esMessages
  },
  de: {
    ...deMessages
  }
}

const i18n = new VueI18n({  
  locale: store.state.locale,
  fallbackLocale: 'us',
  messages,   
})

export default i18n