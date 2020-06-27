import Vue from 'vue'

export const userKey = '__knowledge_user'
export const baseApiUrl = 'https://knowledge-base-br.herokuapp.com'

export function showError(err) {
  // console.log(err.response)
  if(err && err.response && err.response.data && err.response.data.statusText) {    
    // console.log("A1")
    Vue.toasted.global.defaultError({msg : err.response.data.statusText})
  } else if(err && err.response && err.response.data) {    
    // console.log("A2")
    Vue.toasted.global.defaultError({msg : err.response.data})
  } else if ( typeof err === 'string') {
    // console.log("A3")
    Vue.toasted.global.defaultError({msg : err})
  } else {
    // console.log("A4")
    Vue.toasted.global.defaultError()
  }
}

export default {
  baseApiUrl,
  showError,
  userKey
}