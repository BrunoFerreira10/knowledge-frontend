import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { userKey, baseApiUrl } from '../global'
import i18n from 'vue-i18n'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    isMenuToggleButtonVisible: true,
    isDropdownMenuVisible: true,
    isMenuVisible: true,    
    isValidatingToken: false,    
    user: null,
    locale: localStorage.getItem('__user_lang') || 'us'
  },
  mutations: {
    toggleMenu(state, isVisible) {      
      if(isVisible === undefined) {
        state.isMenuVisible = !state.isMenuVisible
      } else {
        state.isMenuVisible = isVisible
      }
    },
    setUser(state, user) {
      state.user = user
      if(user){
        axios.defaults.headers.common['Authorization'] = `bearer ${user.token}`
        
        if (this.$mq === 'lg' || this.$mq === 'xg')
          state.isMenuVisible = true
        else  
          state.isMenuVisible = false
      } else {
        delete axios.defaults.headers.common['Authorization']
        state.isMenuVisible = false
      }
    },
    setLocale(state, locale) {
      state.locale = locale
    },
    setValidatingToken(state, isValidating){
      state.isValidatingToken = isValidating
    },
    setMenuToggleButtonVisible(state, isVisible){
      state.isMenuToggleButtonVisible = isVisible
    },
    setDropdownMenuVisible(state, isVisible){
      state.isDropdownMenuVisible = isVisible
    } 
  },
  actions: {
    async validateToken({commit}, router) {            

      commit('setValidatingToken', true)

      const json = localStorage.getItem(userKey)
      const userData = JSON.parse(json)
            
      commit('setUser', null)
      
      if (!userData) {
        commit('setValidatingToken', false)            
        if(router && !router.history.current.name.startsWith('auth'))
          router.push({ name: 'auth' })
        return 
      }
      
      const res = await axios.post(`${baseApiUrl}/validateToken`, userData)      
      if (res.data) {
        commit('setUser', userData)        
      } else {
        localStorage.removeItem(userKey)
        router.push({ name: 'auth' })
      }

      commit('setValidatingToken', false)
    },
    setLocale({commit}, locale) {
      localStorage.setItem('__user_lang', locale)  
      commit('setLocale', locale)
      location.reload()
    }
  }
})