import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { userKey, baseApiUrl, setUserFromLocalStorage } from '../global'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isMenuToggleButtonVisible: true,
    isDropdownMenuVisible: true,
    isMenuVisible: true,    
    isValidatingToken: false,    
    user: null,
    lang: 'us'
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
    async validateToken(context, router) {            

      context.commit('setValidatingToken', true)

      const json = localStorage.getItem(userKey)
      const userData = JSON.parse(json)
            
      context.commit('setUser', null)
      
      if (!userData) {
        context.commit('setValidatingToken', false)            
        if(!router.history.current.name.startsWith('auth'))
          router.push({ name: 'auth' })
        return 
      }
      
      const res = await axios.post(`${baseApiUrl}/validateToken`, userData)      
      if (res.data) {
        context.commit('setUser', userData)        
      } else {
        localStorage.removeItem(userKey)
        router.push({ name: 'auth' })
      }

      context.commit('setValidatingToken', false)
    }
  }
})