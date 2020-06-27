import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isMenuVisible: false,
    user: null
  },
  mutations: {
    toggleMenu(state, isVisible) {

      if(!state.user){
        state.isMenuVisible = false
        return
      }

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
    }  
  }
})