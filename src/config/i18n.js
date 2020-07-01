import Vue from 'vue'
import VueI18n from 'vue-i18n'

 Vue.use(VueI18n)

const messages = {
  us: {
    message: {
      appTitle: 'Knowledge base',
      registerOrLogin: 'Register or Login',
      enter: 'Enter'
    }
  },
  br: {
    message: {
      appTitle: 'Base de conhecimento',
      registerOrLogin: 'Registrar ou logar',
      enter: 'Entrar'
    }
  }
}

const i18n = new VueI18n({
  locale: localStorage.getItem('__user_lang') || 'us', 
  messages, 
})

export default i18n